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
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
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
        status: '1'
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


    async function listaAdmin() {
        let nombres = await fetch('http://localhost:4000/user/findAdminComunidad/', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => {
                return Promise.all(data.message.map(item => {
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
            .then(data => setListaAdmins(data));

    }





    async function getCommunites() {
        let response = await fetch('http://localhost:4000/community/allCommunities', { method: 'GET' });
        let resList = await response.json();
        let list = await resList.message;

        setCommunitiesList(await list);
    }

    useEffect(() => {
        listaAdmin();
    }, [])

    useEffect(() => {
        getCommunites();
    },[])

    const cList = communitiesList.map((item) => ({
        label: item.name,
        value: item._id,
    }))


    const deleteAdminCommunity = () => {
        /*   fetch('http://localhost:4000/community/deleteCommunity/' + community._id, {
               cache: 'no-cache',
               method: 'DELETE',
               headers: {
                   'Content-Type': 'application/json'
               }
           })
               .then(
                   function (response) {
                       if (response.status != 201)
                           console.log('Ocurri?? un error con el servicio: ' + response.status);
                       else
                           return response.json();
                   }
               )
               .then(
                   function (response) {
                       
                       let _community = communities.filter(val => val._id !== community._id);
                       setCommunities(_community);
                       setDeleteCommunityDialog(false);
                       setCommunity(emptyCommunity);
                       toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Comunidad de Viviendas Eliminada', life: 3000 });
                   }
               )
               .catch(
                   err => {
                       console.log('Ocurri?? un error con el fetch', err)
                       toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Comunidad de Viviendas no se pudo eliminar', life: 3000 });
                   }
               ); 
        */
        let _administrators = listaAdmins.filter(
            (val) => val._id !== adminCommunity._id,
        );
        setListaAdmins(_administrators);
        setDeleteAdminCommunityDialog(false);
        setAdminCommunity(emptyAdminCommunity);
        toast.current.show({
            severity: 'success',
            summary: 'Administrador de Comunidad Eliminada',
            life: 3000,
        });
    };

    const deleteSelectedAdminsCommunity = () => {
        let _admins = listaAdmins.filter(
            (val) => !selectedAdminsCommunities.includes(val),
        );
        /*  selectedCommunities.map((item) => {
                 fetch('http://localhost:4000/user/deleteCommunity/' + item._id, {
                     cache: 'no-cache',
                     method: 'DELETE',
                     headers: {
                         'Content-Type': 'application/json'
                     }
                 })
             })*/
        setListaAdmins(_admins);
        setDeleteAdminsCommunitiesDialog(false);
        setSelectedAdminsCommunities(null);
        toast.current.show({
            severity: 'success',
            summary: '??xito',
            detail: 'Administradores de Comunidad de Viviendas Eliminados',
            life: 3000,
        });
    };

    const saveAdminCommunity = () => {
        if (adminCommunity.name && adminCommunity.dni && adminCommunity.last_name && adminCommunity.email && adminCommunity.phone) {

            let _administrators = [...listaAdmins];
            let _adminCommunity = { ...adminCommunity };
            _adminCommunity.community_id = communityId;
            console.log(_adminCommunity)
            console.log(communityId)

            fetch('http://localhost:4000/user/createAdminCommunity', {
                cache: 'no-cache',
                method: 'POST',
                body: JSON.stringify(_adminCommunity),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(
                    function (response) {
                        if (response.status != 201)
                            console.log('Ocurri?? un error con el servicio: ' + response.status);
                        else
                            return response.json();
                    }
                )
                .then(() => {

                    // _adminCommunity.community_id = communitiesList.find(c => c._id === _adminCommunity.community_id).name

                    _administrators.push(_adminCommunity);
                    toast.current.show({ severity: 'success', summary: 'Registro exitoso', detail: 'Administrador de Comunidad de vivienda Creada', life: 3000 });

                    setListaAdmins(_administrators);

                    setAdminCommunity(emptyAdminCommunity);

                })
                .catch(
                    err => console.log('Ocurri?? un error con el fetch', err)
                );


        } else {
            setSubmitted(true);

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



    const actionsAdminCommunity = (rowData) => {
        return (
            <div className="actions">
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger mt-2"
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
                Identificaci??n
            </p>
        </>
    )

    const headerEmail = (
        <>
            <p> {' '}
                <FontAwesomeIcon icon={faAt} style={{ color: "#D7A86E" }} />{' '}
                Correo Electr??nico
            </p>
        </>
    )

    const headerPhone = (
        <>
            <p> <FontAwesomeIcon icon={faPhoneAlt} style={{ color: "#C08135" }} />{' '}
                Tel??fono
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
                        <Column field="phone"  header={headerPhone} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column field="community_name" sortable header={headerCommuntiy} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column  style={{ flexGrow: 1, flexBasis: '130px', minWidth: '130px' }} body={actionsAdminCommunity}></Column>
                    </DataTable>
                    <Dialog visible={deleteAdminCommunityDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteAdminCommunityDialogFooter} onHide={hideDeleteAdminCommunityDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {adminCommunity && <span>??Est??s seguro que desea eliminar a <b>{adminCommunity.name}</b>?</span>}
                        </div>
                    </Dialog>
                    <Dialog visible={deleteAdminsCommunitiesDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteAdminsCommunityDialogFooter} onHide={hideDeleteAdminsCommunitysDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {selectedAdminsCommunities && <span>??Est?? seguro eliminar los administradores de las comunidades de viviendas seleccionados?</span>}
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
                            <label htmlFor="name">Correo Electr??nico</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-home"></i>
                                    </span>
                                    <InputText id="email" value={adminCommunity.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && adminCommunity.email === '' })} />
                                </div>
                                {submitted && adminCommunity.email === '' && <small className="p-invalid">Correo electr??nico
                                    es requirido.</small>}
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="name">Identificaci??n</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-home"></i>
                                    </span>
                                    <InputText id="dni" value={adminCommunity.dni} onChange={(e) => onInputChange(e, 'dni')} required autoFocus className={classNames({ 'p-invalid': submitted && adminCommunity.dni === '' })} />
                                </div>
                                {submitted && adminCommunity.email === '' && <small className="p-invalid">Identificaci??n es requirida.</small>}
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="name">N??mero de tel??fono</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-phone"></i>
                                    </span>
                                    <InputText id="phone" value={adminCommunity.phone} onChange={(e) => onInputChange(e, 'phone')} required autoFocus className={classNames({ 'p-invalid': submitted && adminCommunity.phone === '' })} />
                                </div>
                                {submitted && adminCommunity.phone === '' && <small className="p-invalid">N??mero de tel??fono es requirida.</small>}
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
                        <Button label="Registrar" onClick={saveAdminCommunity} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(AdministradoresComunidad);
