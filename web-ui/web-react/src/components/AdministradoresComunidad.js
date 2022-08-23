import React, { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faHomeAlt } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'primereact/dropdown';
import classNames from 'classnames';

const AdministradoresComunidad = () => {

    let emptyAdminCommunity = {
        _id: null,
        dni: '',
        name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        community_id: '',
        community_name: '',
        user_type: '2',
        date_entry: new Date(),
        status: '1',
        status_text: '',
    };

    const [listaAdmins, setListaAdmins] = useState([]);
    const [listaAdminComunidad, setListaAdminComunidad] = useState([]);
    const [adminCommunity, setAdminCommunity] = useState(emptyAdminCommunity);
    const [selectedAdminsCommunities, setSelectedAdminsCommunities] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [deleteAdminCommunityDialog, setDeleteAdminCommunityDialog] = useState(false);
    const [deleteAdminsCommunitiesDialog, setDeleteAdminsCommunitiesDialog] = useState(false);
    const [communitiesList, setCommunitiesList] = useState([]);
    const [communityId, setCommunityId] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);

    const [changeStatusAdminCommunityDialog, setChangeStatusAdminCommunityDialog] = useState(false);
    const [saveButtonTitle, setSaveButtonTitle] = useState("Registrar");


    async function listaAdmin() {
        await fetch('http://localhost:4000/user/findAdminComunidad/', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => {
                return Promise.all(data.message.map(item => {


                    if (item.status == '1') {
                        item.status_text = 'Activo';
                    } else if (item.status == '0') {
                        item.status_text = 'Inactivo';
                    } else {
                        item.status_text = 'Eliminado';
                    }
                    //item.full_name returns the repositorie name
                    return fetch(`http://localhost:4000/community/findCommunityName/${item.community_id}`, { method: 'GET' })
                        .then((response2) => response2.json())
                        .then(data => data.message)
                        .then(data => {
                            item.community_name = data['name']
                            return item
                        })
                }));
            })
            .then(data => {
                data = data.filter(
                    (val) => val.status != -1,
                );
                console.log(data)
                setListaAdmins(data);
            });

    }





    async function getCommunites() {
        let response = await fetch('http://localhost:4000/community/allCommunities', { method: 'GET' })
            .then((response) => response.json())
            .then(data => data.message)
            .then(data => {
                data = data.filter(
                    (val) => val.status != -1,
                )
                setCommunitiesList(data);

            })
    }

    useEffect(() => {
        listaAdmin();
    }, [])

    useEffect(() => {
        getCommunites();
    }, [])

    const cList = communitiesList.map((item) => ({
        label: item.name,
        value: item._id,
    }))


    const deleteAdminCommunity = () => {
        fetch('http://localhost:4000/user/deleteAdminCommunity/' + adminCommunity._id, {
            cache: 'no-cache',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(
                function (response) {
                    if (response.status != 201)
                        console.log('Ocurrió un error con el servicio: ' + response.status);
                    else
                        return response.json();
                }
            )
            .then(
                function (response) {

                    let _administrators = listaAdmins.filter(
                        (val) => val._id !== adminCommunity._id,
                    );
                    setListaAdmins(_administrators);
                    setDeleteAdminCommunityDialog(false);
                    setAdminCommunity(emptyAdminCommunity);
                    toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Administrador Comunidad Eliminada', life: 3000 });
                }
            )
            .catch(
                err => {
                    console.log('Ocurrió un error con el fetch', err)
                    toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Administrador Comunidad no se pudo eliminar', life: 3000 });
                }
            );


    };

    const deleteSelectedAdminsCommunity = () => {
        let _admins = listaAdmins.filter(
            (val) => !selectedAdminsCommunities.includes(val),
        );
        selectedAdminsCommunities.map((item) => {
            fetch('http://localhost:4000/user/deleteAdminCommunity/' + item._id, {
                cache: 'no-cache',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })
        setListaAdmins(_admins);
        setDeleteAdminsCommunitiesDialog(false);
        setSelectedAdminsCommunities(null);
        toast.current.show({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Administradores de Comunidad de Viviendas Eliminados',
            life: 3000,
        });
    };


    const cambiarStatusAdminCommuniy = () => {
        if (adminCommunity.status == '1') {
            adminCommunity.status = '0';
            adminCommunity.status_text = 'Inactivo';

        } else if (adminCommunity.status == '0') {
            adminCommunity.status = '1';
            adminCommunity.status_text = 'Activo';
        }
        var data = {
            id: adminCommunity._id,
            status: adminCommunity.status,
        };
        fetch('http://localhost:4000/user/changeStatus', {
            cache: 'no-cache',
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(
                function (response) {
                    if (response.status != 201)
                        console.log('Ocurrió un error con el servicio: ' + response.status);
                    else
                        return response.json();
                }
            )
            .then(
                function (response) {
                    setChangeStatusAdminCommunityDialog(false);
                    toast.current.show({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Administrador de Comunidad Actualizado',
                        life: 3000,
                    });
                }
            )
            .catch(
                err => console.log('Ocurrió un error con el fetch', err)
            );
    }

    const saveAdminCommunity = () => {
        let _administrators = [...listaAdmins];
        let _admin = { ...adminCommunity };
        _admin.community_id = communityId;

        if (adminCommunity._id === null) {
            if (adminCommunity.name && adminCommunity.dni &&
                adminCommunity.last_name && adminCommunity.email &&
                adminCommunity.phone) {


                fetch('http://localhost:4000/user/createAdminCommunity', {
                    cache: 'no-cache',
                    method: 'POST',
                    body: JSON.stringify(_admin),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(
                        function (response) {
                            if (response.status != 201)
                                console.log('Ocurrió un error con el servicio: ' + response.status);
                            else
                                return response.json();
                        }
                    )
                    .then(() => {

                        // _adminCommunity.community_id = communitiesList.find(c => c._id === _adminCommunity.community_id).name

                        _administrators.push(_admin);
                        toast.current.show({ severity: 'success', summary: 'Registro exitoso', detail: 'Administrador de Comunidad de vivienda Creada', life: 3000 });

                        setListaAdmins(_administrators);

                        setAdminCommunity(emptyAdminCommunity);

                    })
                    .catch(
                        err => console.log('Ocurrió un error con el fetch', err)
                    );


            } else {
                setSubmitted(true);
            }
        } else {
            console.log(`Actualizando admnistrador de comunidad: ${_admin}`)
            _admin.community_id = communityId;
            console.log(`Actualizando admnistrador de comunidad: ${_admin}`)

            fetch(`http://localhost:4000/user/updateAdminCommunity/${_admin._id}`, {
                cache: 'no-cache',
                method: 'PUT',
                body: JSON.stringify(_admin),
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((response) => {
                if (response.status !== 200)
                    console.log(`Hubo un error en el servicio: ${response.status}`)
                else return response.json()
            }).then(() => {
                toast.current.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Administrador de comunidad actualizado',
                    life: 3000,
                })
                _administrators.push(_admin);
                toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Administrador de Comunidad de vivienda Actualizada', life: 3000 });

                setListaAdmins(_administrators);

                setAdminCommunity(emptyAdminCommunity);
            })
        }

    }

    const hideDeleteAdminCommunityDialog = () => {
        setDeleteAdminCommunityDialog(false);
    }

    const hideDeleteAdminsCommunitysDialog = () => {
        setDeleteAdminsCommunitiesDialog(false);
    }

    const confirmDeleteAdminCommunity = (adminCommunity) => {
        setAdminCommunity(adminCommunity);
        setDeleteAdminCommunityDialog(true);
    }

    const confirmDeleteSelected = () => {
        setDeleteAdminsCommunitiesDialog(true);
    };

    const hideChangeStatusAdmimCommunityDialog = () => {
        setChangeStatusAdminCommunityDialog(false);
    };

    const confirmChangeStatuAdminCommunity = (adminCommunity) => {
        setAdminCommunity(adminCommunity);
        setChangeStatusAdminCommunityDialog(true);
    };

    const editAdmin = (admin) => {
        setAdminCommunity(admin);
        console.log(admin);
        setSaveButtonTitle('Actualizar');
        setCommunityId(admin.community_id)
    }


    const cancelEdit = () => {
        setAdminCommunity(emptyAdminCommunity);
        setSaveButtonTitle('Registrar');
    }

    const actionsAdminCommunity = (rowData) => {
        let icono = '';
        let text = '';
        if (rowData.status == '0') {
            icono = "pi pi-eye";
            text = "Activar Administrador de Comunidad"
        } else if (rowData.status == '1') {
            icono = "pi pi-eye-slash";
            text = "Inactivar Administrador de Comunidad"
        }
        return (
            <div className="actions">
                <Button
                    icon="pi pi-pencil"
                    className="p-button-rounded p-button-success mt-2 mx-2"
                    onClick={() => editAdmin(rowData)}
                    title="Editar"
                />
                <Button
                    icon={`${icono}`}
                    className="p-button-rounded p-button-warning mt-2 mx-2"
                    onClick={() => confirmChangeStatuAdminCommunity(rowData)}
                    title={`${text}`}
                />

                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger mt-2 mx-2"
                    onClick={() => confirmDeleteAdminCommunity(rowData)}
                />
            </div>
        );
    };


    const deleteAdminCommunityDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteAdminCommunityDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteAdminCommunity} />
        </>
    );

    const deleteAdminsCommunityDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteAdminsCommunitysDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedAdminsCommunity} />
        </>
    );

    const changeStatusAdminCommunityDialogFooter = (
        <>
            <Button
                label="No"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideChangeStatusAdmimCommunityDialog}
            />
            <Button
                label="Yes"
                icon="pi pi-check"
                className="p-button-text"
                onClick={cambiarStatusAdminCommuniy}
            />
        </>
    );

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedAdminsCommunities || !selectedAdminsCommunities.length} />
                </div>
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Exportar" icon="pi pi-upload" className="p-button-help" />
            </React.Fragment>
        )
    }


    const header = (
        <React.Fragment>

            <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                <h5 className="m-0">Administradores de Comunidades</h5>
                <span className="block mt-2 md:mt-0 p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
                </span>
            </div>
        </React.Fragment>
    );

    const headerName = (
        <>
            <p>{' '}
                <FontAwesomeIcon icon={faUserAlt} style={{ color: "#C08135" }} /> {' '}
                Nombre
            </p>
        </>
    )

    const headerLastName = (
        <>
            <p>
                {' '}
                <FontAwesomeIcon icon={faUserAlt} style={{ color: "#D7A86E" }} />{' '}
                Apellidos
            </p>
        </>
    )

    const headerDNI = (
        <>
            <p> {' '}
                <FontAwesomeIcon icon={faIdCardAlt} style={{ color: "#C08135" }} />{' '}
                Identificación
            </p>
        </>
    )

    const headerEmail = (
        <>
            <p> {' '}
                <FontAwesomeIcon icon={faAt} style={{ color: "#D7A86E" }} />{' '}
                Correo Electrónico
            </p>
        </>
    )

    const headerPhone = (
        <>
            <p> <FontAwesomeIcon icon={faPhoneAlt} style={{ color: "#C08135" }} />{' '}
                Teléfono
            </p>
        </>
    )

    const headerCommuntiy = (
        <>
            <p>
                {' '}
                <FontAwesomeIcon icon={faHomeAlt} style={{ color: "#D7A86E" }} />{' '}
                Comunidad</p>
        </>
    )

    const headerStatus = (
        <>
            <p> {' '}
                <FontAwesomeIcon icon={faCircleQuestion} style={{ color: "#C08135" }} />{' '}
                Estado
            </p>
        </>
    )



    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _adminCommunity = { ...adminCommunity };
        _adminCommunity[`${name}`] = val;

        setAdminCommunity(_adminCommunity);
    }

    const handleCommunities = (event) => {
        const getCommunityValue = event.target.value;
        setCommunityId(getCommunityValue);
        console.log(getCommunityValue)
    }

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span
                    className={`status status-${rowData.status}`}
                >
                    {rowData.status_text}
                </span>
            </>
        );
    };

    return (


        <div className="grid">
            <div className="col-12">
                <Toast ref={toast} />
                <div className="card">
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <DataTable ref={dt} value={listaAdmins} dataKey="_id" paginator rows={5} selection={selectedAdminsCommunities} onSelectionChange={(e) => setSelectedAdminsCommunities(e.value)}
                        scrollable scrollHeight="400px" scrollDirection="both" header={header}
                        rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive mt-3"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} administradores de comunidades de viviendas"
                        globalFilter={globalFilter} emptyMessage="No hay administradores de comunidades registrados.">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="name" sortable header={headerName} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column field="last_name" sortable header={headerLastName} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }} alignFrozen="left"></Column>
                        <Column field="dni" sortable header={headerDNI} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}>
                        </Column>
                        <Column field="email" sortable header={headerEmail} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column field="phone" header={headerPhone} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column field="community_name" sortable header={headerCommuntiy} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column field="status" sortable header={headerStatus} body={statusBodyTemplate} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column style={{ flexGrow: 1, flexBasis: '80px', minWidth: '80px' }} body={actionsAdminCommunity}></Column>
                    </DataTable>
                    <Dialog visible={deleteAdminCommunityDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteAdminCommunityDialogFooter} onHide={hideDeleteAdminCommunityDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {adminCommunity && <span>¿Estás seguro que desea eliminar a <b>{adminCommunity.name}</b>?</span>}
                        </div>
                    </Dialog>
                    <Dialog visible={deleteAdminsCommunitiesDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteAdminsCommunityDialogFooter} onHide={hideDeleteAdminsCommunitysDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {selectedAdminsCommunities && <span>¿Está seguro eliminar los administradores de las comunidades de viviendas seleccionados?</span>}
                        </div>
                    </Dialog>
                    <Dialog
                        visible={changeStatusAdminCommunityDialog}
                        style={{ width: '450px' }}
                        header="Confirmar"
                        modal
                        footer={changeStatusAdminCommunityDialogFooter}
                        onHide={hideChangeStatusAdmimCommunityDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i
                                className="pi pi-exclamation-triangle mr-3"
                                style={{ fontSize: '2rem' }}
                            />
                            {adminCommunity && (
                                <span>
                                    ¿Estás seguro que desea cambiar estado a <b>{adminCommunity.name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>Registro de un administrador de una comunidad de viviendas</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="name">Nombre</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-home"></i>
                                    </span>
                                    <InputText id="name" value={adminCommunity.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && adminCommunity.name === '' })} />
                                </div>
                                {submitted && adminCommunity.name === '' && <small className="p-invalid">Nombre es requirido.</small>}
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="name">Apellido(s)</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-home"></i>
                                    </span>
                                    <InputText id="last_name" value={adminCommunity.last_name} onChange={(e) => onInputChange(e, 'last_name')} required autoFocus className={classNames({ 'p-invalid': submitted && adminCommunity.last_name === '' })} />
                                </div>
                                {submitted && adminCommunity.last_name === '' && <small className="p-invalid">Apellidos es requirido.</small>}
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="name">Correo Electrónico</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-home"></i>
                                    </span>
                                    <InputText id="email" value={adminCommunity.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && adminCommunity.email === '' })} />
                                </div>
                                {submitted && adminCommunity.email === '' && <small className="p-invalid">Correo electrónico
                                    es requirido.</small>}
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="name">Identificación</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-home"></i>
                                    </span>
                                    <InputText id="dni" value={adminCommunity.dni} onChange={(e) => onInputChange(e, 'dni')} required autoFocus className={classNames({ 'p-invalid': submitted && adminCommunity.dni === '' })} />
                                </div>
                                {submitted && adminCommunity.email === '' && <small className="p-invalid">Identificación es requirida.</small>}
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="name">Número de teléfono</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-phone"></i>
                                    </span>
                                    <InputText id="phone" value={adminCommunity.phone} onChange={(e) => onInputChange(e, 'phone')} required autoFocus className={classNames({ 'p-invalid': submitted && adminCommunity.phone === '' })} />
                                </div>
                                {submitted && adminCommunity.phone === '' && <small className="p-invalid">Número de teléfono es requirida.</small>}
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="administrator">Comunidad a asignar: </label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-home"></i>
                                    </span>
                                    <Dropdown placeholder="--Seleccione la Comunidad a Asignar--" id="administrator" value={communityId} options={cList}
                                        onChange={handleCommunities} required autoFocus className={classNames({ 'p-invalid': submitted && !communityId })} />
                                </div>
                                {submitted && !communityId && <small className="p-invalid">Comunidad es requirida.</small>}
                            </div>
                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "10px",
                            width: "100%"
                        }}>
                            <Button
                                label={`${saveButtonTitle}`}
                                onClick={saveAdminCommunity}
                            />
                            {saveButtonTitle === 'Actualizar' && (
                                <Button
                                    label="Cancelar"
                                    onClick={cancelEdit}
                                    className="p-button-danger" />)}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(AdministradoresComunidad);
