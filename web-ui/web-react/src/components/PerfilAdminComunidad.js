import React, { useEffect, useState, useRef } from 'react';
import { useCookies } from "react-cookie";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { InputText } from 'primereact/inputtext';
import classNames from 'classnames';
import md5 from 'md5';

const PerfilAdminComunidad = () => {

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

    let emptyCommunity = {
        _id: null,
        name: '',
        province: '',
        canton: '',
        district: '',
        phone: '',
        num_houses: 0,
        status: '1',
        status_text: '',
        date_entry: new Date(),
        houses: [],
    };

    let emptyNewPassword = {
        _id: null,
        passwordOld: '',
        passwordNew: '',
        passwordConfirm: ''
    }

    const [admin, setAdmin] = useState(emptyAdminCommunity);
    const [community, setCommunity] = useState(emptyCommunity);
    const [cookies, setCookie] = useCookies();
    const [globalFilter, setGlobalFilter] = useState(null);
    //para el perfil de la comunidad
    const [tenants, setTenants] = useState([]);
    const [commonAreaList, setCommonAreaList] = useState([]);
    const [provincesList, setProvincesList] = useState([]);
    const [cantonsList, setCantonsList] = useState([]);
    const [districtsList, setDistrictsList] = useState([]);
    const [editAdminDialog, setEditAdminDialog] = useState(false);
    const [editPasswordDialog, setEditPasswordDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const [newPassword, setNewPassword] = useState(emptyNewPassword);



    async function getProvinces() {
        const response = await fetch('assets/demo/data/provincias.json', {
            method: 'GET',
        });
        return await response.json();
    }


    async function getCantons() {
        const response = await fetch('assets/demo/data/cantones.json', {
            method: 'GET',
        });
        return await response.json();
    }

    async function getDistricts() {
        const response = await fetch('assets/demo/data/distritos.json', {
            method: 'GET',
        });
        return await response.json();
    }

    async function getAdmin() {
        await fetch('http://localhost:4000/user/findUserById/' + cookies.id, { method: 'GET' })
            .then((response) => response.json())
            .then(data => {
                let item = data.message;
                setAdmin(item);
                if (item.community_id || item.community_id != '') {
                    getCommunity()
                } else {
                    item.community_name = "Sin Comunidad Asignada";
                }

            })
    }


    useEffect(() => {
        getAdmin();
    }, [])


    async function getCommunity() {
        let pList = await getProvinces();
        let cList = await getCantons();
        let dList = await getDistricts();
        await fetch(`http://localhost:4000/community/findCommunityName/${cookies.community_id}`, { method: 'GET' })
            .then((response2) => response2.json())
            .then(data => data.message)
            .then(data => {
                data.province = pList.find((p) => p.code === data.province).name;
                data.canton = cList.find((p) => p.code === data.canton).name;
                data.district = dList.find((p) => p.code === data.district).name;
                setCommunity(data)
            })
    }

    useEffect(() => {
        getCommunity();
    }, [])

    async function tenantsList(id) {
        await fetch(`http://localhost:4000/user/findTenants/${id}`, { method: 'GET' })
            .then((response) => response.json())
            .then(data => data.message)
            .then(data => {
                data = data.filter(
                    (val) => val.status != -1,
                )
                setTenants(data)
            });
    }

    useEffect(() => {
        tenantsList(cookies.community_id);
    }, [])

    const saveAdmin = () => {
        let _admin = { ...admin };
        _admin.community_id = cookies.community_id;

        if (_admin.name && _admin.dni &&
            _admin.last_name && _admin.email &&
            _admin.phone) {

            console.log(`Actualizando admnistrador de comunidad: ${_admin}`)
            _admin.community_id = cookies.community_id;
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
            }).then((response) => {

                toast.current.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Administrador de comunidad actualizado',
                    life: 3000,
                })

                setAdmin(response.message);
                setEditAdminDialog(false);

            })


        } else {
            setSubmitted(true);
        }


    }

    const savePassword = () => {
        let _admin = { ...admin };
        let _newPassword = { ...newPassword };

        if (_newPassword.passwordOld && _newPassword.passwordNew &&
            _newPassword.passwordNew === _newPassword.passwordConfirm) {

            _admin.password = md5(_newPassword.passwordNew);
            console.log(`Actualizando admnistrador de comunidad: ${_admin}`)

            fetch(`http://localhost:4000/user/changePassword/${_admin._id}`, {
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
            }).then((response) => {

                toast.current.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Administrador de comunidad actualizado',
                    life: 3000,
                })
                setAdmin(_admin);
                setEditPasswordDialog(false);
            })


        } else {
            setSubmitted(true);
        }


    }

    const findRepeated = async (name, value) => {
        let _administrators;
        await fetch('http://localhost:4000/user/findAdminComunidad/', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => data.message)
            .then(data => {
                data = data.filter(
                    (val) => val.status != -1,
                );
                _administrators = data;
            });
        let value_filtered = await _administrators.filter(item => item[`${name}`] === value);
        return value_filtered.length;
    }

    function findNameTenant(tenant_id) {
        let name = '';
        if (tenant_id == '') {
            name = 'Sin inquilino';
        } else {
            let tenant = tenants.find(t => t._id == tenant_id)
            name = tenant['name'] + ' ' + tenant['last_name'];
        }
        return name;
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _admin = { ...admin };
        _admin[`${name}`] = val;
        setAdmin(_admin);
    }


    const onInputChangePassword = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _pass = { ...newPassword };
        _pass[`${name}`] = val;
        setNewPassword(_pass);
    }


    const editAdmin = (admin) => {
        setAdmin(admin);
        setEditAdminDialog(true);
    }

    const editPassword = () => {
        setNewPassword(emptyNewPassword);
        setEditPasswordDialog(true);
    }

    const hideEditAdminDialog = () => {
        setSubmitted(false);
        setEditAdminDialog(false);
    }

    const hideEditPasswordDialog = () => {
        setSubmitted(false);
        setEditPasswordDialog(false);
    }

    const actionsAdminCommunity = (rowData) => {
        return (
            <>
                <div className='container my-2'>
                    <div className='row justify-content-end'>
                        <div className='col-3'>
                            <Button
                                icon="pi pi-pencil"
                                className="p-button-rounded p-button-primary mt-2 mx-2"
                                onClick={() => editAdmin(rowData)}
                                label="Editar Mis Datos"
                            />

                        </div>
                        <div className='col-3'>
                            <Button
                                icon="pi pi-pencil"
                                className="p-button-rounded p-button-primary mt-2 mx-2"
                                onClick={() => editPassword(rowData)}
                                label="Modificar Contraseña"
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }


    const editAdminDialogFooter = (
        <>
            <Button
                label="Guardar Cambios"
                icon="pi pi-check"
                className="p-button-primary"
                onClick={saveAdmin}
            />
            <Button
                label="Cancelar"
                icon="pi pi-check"
                className="p-button-text"
                onClick={hideEditAdminDialog}
            />
        </>
    );

    const editPasswordDialogFooter = (
        <>
            <Button
                label="Guardar Cambios"
                icon="pi pi-check"
                className="p-button-primary"
                onClick={savePassword}
            />
            <Button
                label="Cancelar"
                icon="pi pi-check"
                className="p-button-text"
                onClick={hideEditPasswordDialog}
            />
        </>
    );

    const headerNumberHouses = (
        <>
            <p>
                {' '}
                <FontAwesomeIcon icon={faHashtag} style={{ color: '#D7A86E' }} />{' '}
                Código de vivienda
            </p>
        </>
    );

    const headerTenant = (
        <>
            <p>
                {' '}
                <FontAwesomeIcon icon={faUserAlt} style={{ color: '#C08135' }} />{' '}
                Inquilino
            </p>

        </>
    );

    const tenantsBodyTemplate = (rowData) => {
        let tenants = rowData.tenants;
        let name = 'Sin inquilino';
        if (rowData.tenants) {
            name = findNameTenant(tenants.tenant_id);
        }

        return (
            <>
                {name}
            </>
        )
    }


    return (
        <>
            <div className="grid">
                <Toast ref={toast} />
                {actionsAdminCommunity(admin)}
                <Dialog
                    visible={editAdminDialog}
                    style={{ width: '650px' }}
                    header="Actualizar mi información"
                    modal
                    className="p-fluid"
                    footer={editAdminDialogFooter}
                    onHide={hideEditAdminDialog}>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="name">Nombre</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <InputText id="name" value={admin.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && admin.name === '' })} />
                                </div>
                                {submitted && admin.name === '' && <small className="p-invalid">Nombre es requirido.</small>}
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="name">Apellido(s)</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-user"></i>
                                    </span>
                                    <InputText id="last_name" value={admin.last_name} onChange={(e) => onInputChange(e, 'last_name')} required autoFocus className={classNames({ 'p-invalid': submitted && admin.last_name === '' })} />
                                </div>
                                {submitted && admin.last_name === '' && <small className="p-invalid">Apellidos es requirido.</small>}
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="name">Correo Electrónico</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-at"></i>
                                    </span>
                                    <InputText id="email" value={admin.email}
                                        onChange={(e) => onInputChange(e, 'email')} required autoFocus
                                        className={classNames({
                                            'p-invalid': submitted &&
                                                (admin.email === '' || findRepeated('email', admin.email) > 0)
                                        })} />
                                </div>
                                {submitted && admin.email === '' && <small className="p-invalid">Correo electrónico
                                    es requirido.</small>}
                                {submitted && findRepeated('email', admin.email) > 0 &&
                                    <small className="p-invalid">Correo electrónico se encuentra repetido.</small>
                                }
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="name">Identificación</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-id-card"></i>
                                    </span>
                                    <InputText id="dni" value={admin.dni}
                                        onChange={(e) => onInputChange(e, 'dni')} required autoFocus
                                        className={classNames({
                                            'p-invalid': submitted
                                                && (admin.dni === '' || findRepeated('dni', admin.dni) > 0)
                                        })} />
                                </div>
                                {submitted && admin.dni === '' && <small className="p-invalid">Identificación es requirida.</small>}
                                {submitted && findRepeated('dni', admin.dni) > 0 &&
                                    <small className="p-invalid">Identificación se encuentra repetida.</small>
                                }
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="name">Número de teléfono</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-phone"></i>
                                    </span>
                                    <InputText id="phone" value={admin.phone} onChange={(e) => onInputChange(e, 'phone')} required autoFocus className={classNames({ 'p-invalid': submitted && admin.phone === '' })} />
                                </div>
                                {submitted && admin.phone === '' && <small className="p-invalid">Número de teléfono es requirida.</small>}
                            </div>
                        </div>
                    </div>
                </Dialog>
                <Dialog
                    visible={editPasswordDialog}
                    style={{ width: '650px' }}
                    header="Actualizar contraseña"
                    modal
                    className="p-fluid"
                    footer={editPasswordDialogFooter}
                    onHide={hideEditPasswordDialog}>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-12">
                            <label htmlFor="name">Contraseña Actual</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-lock"></i>
                                    </span>
                                    <InputText id="passwordOld" value={newPassword.passwordOld}
                                        onChange={(e) => onInputChangePassword(e, 'passwordOld')}
                                        required autoFocus
                                        className={classNames({
                                            'p-invalid': submitted
                                                && newPassword.passwordOld === ''
                                                && admin.password !== md5(newPassword.passwordOld)
                                        })} />
                                </div>
                                {submitted && newPassword.passwordOld === ''
                                    && <small className="p-invalid">Contraseña Actual es requirida.</small>}

                                {submitted && admin.password != md5(newPassword.passwordOld)
                                    && <small className="p-invalid">Contraseña Actual no coincide con la actual.</small>}

                            </div>
                        </div>

                        <div className="field col-12 md:col-12">
                            <label htmlFor="name">Contraseña Nueva</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-lock"></i>
                                    </span>
                                    <InputText id="passwordNew" value={newPassword.passwordNew}
                                        onChange={(e) => onInputChangePassword(e, 'passwordNew')}
                                        required autoFocus
                                        className={classNames({
                                            'p-invalid': submitted
                                                && newPassword.passwordNew === ''
                                                && admin.password === md5(newPassword.passwordNew)
                                        })} />
                                </div>
                                {submitted && newPassword.passwordNew === ''
                                    && <small className="p-invalid">Contraseña Nueva es requirida.</small>}
                            </div>
                        </div>
                        <div className="field col-12 md:col-12">
                            <label htmlFor="name">Contraseña Nueva</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-lock"></i>
                                    </span>
                                    <InputText id="passwordConfirm"
                                        value={newPassword.passwordConfirm}
                                        onChange={(e) => onInputChangePassword(e, 'passwordConfirm')}
                                        required autoFocus
                                        className={classNames({ 'p-invalid': submitted && newPassword.passwordConfirm !== newPassword.passwordNew })} />
                                </div>
                                {submitted
                                    && newPassword.passwordConfirm !== newPassword.passwordNew
                                    && newPassword.passwordConfirm === ''
                                    && <small className="p-invalid">No coincide con la nueva contraseña.</small>}
                            </div>
                        </div>
                    </div>
                </Dialog>
            </div>
            <div className="grid justify-content-center">


                <div className="col-5" >
                    <div className="card">
                        <div className='container text-center'>
                            <div className='row my-4'>
                                <div className=" col-12 md:col-12">
                                    <h3>Información Básica</h3>
                                </div>
                                <div className=" col-6 md:col-6">
                                    <i className="pi pi-home icon-khaki"></i>
                                    <p><strong>Nombre Completo</strong></p>
                                    <div className="p-0 col-12  md:col-12" style={{ margin: '0 auto' }}>
                                        <div className="p-inputgroup justify-content-evenly">
                                            <p>{admin.name + ' ' + admin.last_name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className=" col-6 md:col-6">
                                    <i className="pi pi-id-card icon-khaki"></i>
                                    <p><strong>Identificación</strong></p>
                                    <div className="p-0 col-12  md:col-12" style={{ margin: '0 auto' }}>
                                        <div className="p-inputgroup  justify-content-evenly">
                                            <p>{admin.dni}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row my-4'>
                                <div className=" col-12 md:col-12">
                                    <h3>Contacto</h3>
                                </div>
                                <div className=" col-6 md:col-6">
                                    <i className="pi pi-at icon-khaki"></i>
                                    <p><strong>Correo Electrónico</strong></p>
                                    <div className="p-0 col-12  md:col-12" style={{ margin: '0 auto' }}>
                                        <div className="p-inputgroup  justify-content-evenly">
                                            <p>{admin.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className=" col-6 md:col-6">
                                    <i className="pi pi-phone icon-khaki"></i>
                                    <p><strong>Número de teléfono</strong></p>
                                    <div className="p-0 col-12  md:col-12" style={{ margin: '0 auto' }}>
                                        <div className="p-inputgroup  justify-content-evenly">
                                            <p>{admin.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className='col-7'>
                    {community && (
                        <div className="card">
                            <div className='container text-center'>
                                <div className='row my-4'>
                                    <div className=" col-12 md:col-12">
                                        <h3>Comunidad Asignada</h3>
                                    </div>
                                    <div className=" col-4 md:col-4">
                                        <i className="pi pi-home icon-khaki"></i>
                                        <p><strong>Nombre</strong></p>
                                        <div className="p-0 col-12  md:col-12" style={{ margin: '0 auto' }}>
                                            <div className="p-inputgroup align-items-center justify-content-evenly">
                                                <p>{community.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4 md:col-4">
                                        <i className="pi pi-phone icon-khaki"></i>
                                        <p><strong>Teléfono</strong></p>

                                        <div className="p-0 col-12  md:col-12" style={{ margin: '0 auto' }}>
                                            <div className="p-inputgroup align-items-center justify-content-evenly">
                                                <p>{community.phone}</p>
                                            </div>

                                        </div>
                                    </div>
                                    <div className=" col-4 col-md-4 md:col-4">
                                        <i className="pi pi-map-marker icon-khaki"></i>

                                        <p><strong>Ubicación</strong></p>
                                        <div>
                                            <div className="p-inputgroup justify-content-evenly">
                                                <p>{community.province}, {community.canton}, {community.district}</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className='row my-5'>
                                    <div className=" col-12 md:col-12">
                                        <h3>Viviendas de la Comunidad</h3>
                                    </div>
                                    <div className=" col-12 md:col-12">
                                        <i className="pi pi-hashtag icon-khaki"></i>

                                        <p><strong>Cantidad de Viviendas</strong></p>
                                        <div className="p-0 col-2  md:col-2" style={{ margin: '0 auto' }}>
                                            <div className="p-inputgroup justify-content-evenly">
                                                <p>{community.num_houses}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>


            </div>
            <div className='grid justify-content-center'>

                <div className='col-6'>
                    {community && (
                        <div className="card">
                            <div className='container text-center'>

                                <div className='row my-5'>
                                    <div className=" col-12 md:col-12">


                                        <h3> Viviendas</h3>
                                        <div className="p-0 col-12  md:col-12" style={{ margin: '0 auto' }}>
                                            <div className="p-inputgroup justify-content-evenly">
                                                <DataTable
                                                    value={community.houses}
                                                    paginator
                                                    rows={5}
                                                    scrollable
                                                    scrollHeight="200px"
                                                    scrollDirection="both"
                                                    rowsPerPageOptions={[5, 10, 25]}
                                                    className="datatable-responsive mt-3"
                                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} viviendas"
                                                    globalFilter={globalFilter}
                                                >
                                                    <Column
                                                        field="number_house"
                                                        header={headerNumberHouses}
                                                        style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px' }}
                                                    ></Column>
                                                    <Column
                                                        field="tenants"
                                                        header={headerTenant}
                                                        body={tenantsBodyTemplate}
                                                        style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px' }}
                                                    ></Column>
                                                </DataTable>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>


    )
}

export default React.memo(PerfilAdminComunidad)