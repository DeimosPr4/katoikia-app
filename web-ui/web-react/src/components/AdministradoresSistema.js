import React, { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';

const AdministradoresSistema = () => {

    const [administrators, setAdministrators] = useState([]);
    const [urlFetch, setUrlFetch] = useState('http://localhost:4000/user/findAdminSistema/');
    const [sysadmin, setSysAdmin] = useState(emptySysAdmin);

    const [deleteAdminSystemDialog, setDeleteAdminSystemDialog] = useState(false);
    const [deleteAdminsSystemDialog, setDeleteAdminsSystemDialog] = useState(false);
    const toast = useRef(null);


    let emptySysAdmin = {
        _id: null,
        dni: '',
        name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        user_type: '1',
        status: ''
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
                    let _admin = { ...response.message };;
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

    const deleteSysAdmin = () => {

        var data = {
            id: sysadmin._id
        }
        fetch('http://localhost:4000/user/deleteAdminSystem/' + sysadmin._id, {
            cache: 'no-cache',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(
                function (response) {
                    if (response.status != 201 )
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
        
                     toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Administrador del Sistema Eliminado', life: 3000 });
                }
            )
            .catch(
                err => {
                    console.log('Ocurrió un error con el fetch', err)
                    toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Administrador del Sistema no se pudo eliminar', life: 3000 });
                }
            );

        
       
    }

    const actionsAdmin = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mt-2" onClick={() => confirmDeleteAdminSystem(rowData)} />
            </div>
        );
    }

    const deleteAdminSystemDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteAdminSystemDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSysAdmin} />
        </>
    );

    return (
        <div className="grid">
            <div className="col-12">
                <Toast ref={toast} />

                <div className="card">
                    <h5>Administradores del sistema</h5>
                    <DataTable value={administrators} scrollable scrollHeight="400px" scrollDirection="both" className="mt-3">
                        <Column field="name" header="Nombre" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                        <Column field="last_name" header="Apellidos" style={{ flexGrow: 1, flexBasis: '160px' }} alignFrozen="left"></Column>
                        <Column field="dni" header="Identificación" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                        <Column field="email" header="Correo electrónico" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                        <Column field="phone" header="Telefóno" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                        <Column body={actionsAdmin}></Column>

                    </DataTable>

                    <Dialog visible={deleteAdminSystemDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteAdminSystemDialogFooter} onHide={hideDeleteAdminSystemDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {sysadmin && <span>Are you sure you want to delete <b>{sysadmin.name}</b>?</span>}
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
                            <InputText id="telefono" type="number" rows="4" />
                        </div>
                        <Button label="Registrar" onClick={registrarAdmin}></Button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default React.memo(AdministradoresSistema);