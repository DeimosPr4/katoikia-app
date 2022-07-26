import React, { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';


const AdministradoresSistema = () => {

    const [administrators, setAdministrators] = useState([]);
    const [urlFetch, setUrlFetch] = useState('http://localhost:4000/user/findAdminSistema/');
    const [sysadmin, setSysAdmin] = useState(emptySysAdmin);
    const [selectedAdministrators, setSelectedAdministrators] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [deleteAdminSystemDialog, setDeleteAdminSystemDialog] = useState(false);
    const [deleteAdminsSystemDialog, setDeleteAdminsSystemDialog] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);

    let emptySysAdmin = {
        _id: null,
        dni: '',
        name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        user_type: '1',
        status: '1'
    };

    async function fetchP() {
        let nombres = await fetch(urlFetch, { method: 'GET' });
        let adminRes = await nombres.json();
        setAdministrators(adminRes.message);
        console.log(administrators);
    }
    useEffect(() => {
        fetchP();
    }, [])

    function registrarAdmin() {
        var data = {
            dni: document.getElementById('identificacion').value,
            name: document.getElementById('nombre').value,
            last_name: document.getElementById('apellidos').value,
            email: document.getElementById('correo_electronico').value,
            phone: document.getElementById('telefono').value,
            password: document.getElementById('correo_electronico').value,
            user_type: "1", //1 es admin
            status: "1"
        };
        setSysAdmin(data)
        // console.log(data);

        fetch('http://localhost:4000/user/createAdminSystem/', {
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
                    let _administrators = [...administrators];
                    let _admin = { ...sysadmin };
                    _administrators.push(_admin);
                    setAdministrators(_administrators)
                }
            )
            .catch(
                err => console.log('Ocurrió un error con el fetch', err)
            );
    }


    const hideDeleteAdminSystemDialog = () => {
        setDeleteAdminSystemDialog(false);
    }

    const hideDeleteAdminsSystemsDialog = () => {
        setDeleteAdminsSystemDialog(false);
    }

    const confirmDeleteAdminSystem = (sysAdmin) => {
        setSysAdmin(sysAdmin);
        setDeleteAdminSystemDialog(true);
    }

    const confirmDeleteSelected = () => {
        setDeleteAdminsSystemDialog(true);
    }

    const deleteSysAdmin = () => {

        fetch('http://localhost:4000/user/deleteAdminSystem/' + sysadmin._id, {
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
                    let _sysadmin = administrators.filter(val => val._id !== sysadmin._id);
                    setAdministrators(_sysadmin);
                    setDeleteAdminSystemDialog(false);
                    setSysAdmin(emptySysAdmin);
                    toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Administrador del Sistema Eliminado', life: 3000 });
                }
            )
            .catch(
                err => {
                    console.log('Ocurrió un error con el fetch', err)
                    toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Administrador del Sistema no se pudo Eliminar', life: 3000 });
                }
            );
    }

    const deleteSelectedAdminsSystem = () => {
        let _administrators = administrators.filter(val => !selectedAdministrators.includes(val));
        selectedAdministrators.map((item) => {
            fetch('http://localhost:4000/user/deleteAdminSystem/' + item._id, {
                cache: 'no-cache',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })
        setAdministrators(_administrators);
        setDeleteAdminsSystemDialog(false);
        setSelectedAdministrators(null);
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Administradores del Sistema Eliminados', life: 3000 });
    }

    const actionsAdmin = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2" onClick={() => confirmDeleteAdminSystem(rowData)} />
            </div>
        );
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedAdministrators || !selectedAdministrators.length} />
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
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Administradores del sistema <i class="fal fa-user"></i></h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const deleteAdminSystemDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteAdminSystemDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSysAdmin} />
        </>
    );

    const deleteAdminsSystemDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteAdminsSystemsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedAdminsSystem} />
        </>
    );

    const headerName = (
        <>
            <p> <FontAwesomeIcon icon={faUserAlt} style={{color: "#C08135"}} />  Nombre</p>
        </>
    )

    const headerLastName = (
        <>
            <p> <FontAwesomeIcon icon={faUserAlt} style={{color: "#D7A86E"}} />    Apellidos</p>
        </>
    )

    const headerDNI = (
        <>
            <p> <FontAwesomeIcon icon={faIdCardAlt} style={{color: "#C08135"}} />    Identificación</p>
        </>
    )

    const headerEmail = (
        <>
            <p> <FontAwesomeIcon icon={faAt} style={{color: "#D7A86E"}} />    Correo Electrónico</p>
        </>
    )

    const headerPhone = (
        <>
            <p> <FontAwesomeIcon icon={faPhoneAlt} style={{color: "#C08135"}} />   Teléfono</p>
        </>
    )

    const headerOptions = (
        <>
            <p>Opciones <FontAwesomeIcon icon={faEllipsis} style={{color: "#D7A86E"}} /></p>
        </>
    )

    return (
        <div className="grid">
            <div className="col-12">
                <Toast ref={toast} />
                <div className="card">
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <DataTable ref={dt} value={administrators} dataKey="_id" paginator rows={5} selection={selectedAdministrators} onSelectionChange={(e) => setSelectedAdministrators(e.value)}
                        scrollable scrollHeight="400px" scrollDirection="both" header={header}
                        rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive mt-3"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} administradores del sistema"
                        globalFilter={globalFilter} emptyMessage="No hay administradores del sistema registrados.">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="name" sortable header={headerName} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column field="last_name" sortable header={headerLastName} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }} alignFrozen="left"></Column>
                        <Column field="dni" sortable header={headerDNI} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}>
                        </Column>
                        <Column field="email" sortable header={headerEmail} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column field="phone" sortable header={headerPhone} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column header={headerOptions} style={{ flexGrow: 1, flexBasis: '130px', minWidth: '130px' }} body={actionsAdmin}></Column>
                    </DataTable>
                    <Dialog visible={deleteAdminSystemDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteAdminSystemDialogFooter} onHide={hideDeleteAdminSystemDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {sysadmin && <span>¿Estás seguro que desea eliminar a <b>{sysadmin.name}</b>?</span>}
                        </div>
                    </Dialog>
                    <Dialog visible={deleteAdminsSystemDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteAdminsSystemDialogFooter} onHide={hideDeleteAdminsSystemsDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {selectedAdministrators && <span>¿Está seguro eliminar los adminsitradores del sistema seleccionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>Registro de un administrador del sistema</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="nombre">Nombre</label>
                            <InputText id="nombre" type="text" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="apellidos">Apellidos</label>
                            <InputText id="apellidos" type="text" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="correo_electronico">Correo electrónico</label>
                            <InputText id="correo_electronico" type="text" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="identificacion">Identificación</label>
                            <InputText id="identificacion" type="text" />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="telefono">Teléfono</label>
                            <InputText type="tel" id="telefono" pattern="[0-9]{8}" />
                        </div>
                        <Button label="Registrar" onClick={registrarAdmin}></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(AdministradoresSistema, comparisonFn);
