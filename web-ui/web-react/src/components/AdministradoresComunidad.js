import React, { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';

const AdministradoresComunidad = () => {

    const [listaAdmins,setListaAdmins]=useState([]);
    const [listaAdminComunidad,setListaAdminComunidad]=useState([]);
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
        status: ''
    };


    async function listaAdmin(){
    let nombres=await fetch('http://localhost:4000/user/findAdminComunidad/', {method:'GET'});
    let nombresRes= await nombres.json();
    setListaAdmins(nombresRes.message);
   }

    async function listaComunidades(nombre){
    let nombres=await fetch('http://localhost:4000/community/findCommunityName/'+nombre, {method:'GET'});
    let nombresRes= await nombres.json();
    setListaAdminComunidad(nombresRes.message);
   }
   listaAdmins.map(function(administrador){
        listaComunidades(administrador.community_id);
        administrador.community_id=listaAdminComunidad.name;
   })
    useEffect(()=>{
        listaAdmin();
    },[])

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
                    let _sysadmin = listaAdmins.filter(val => val._id !== sysadmin._id);
                    setListaAdmins(_sysadmin);

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

    const deleteSelectedAdminsSystem = () => {
        let _administrators = listaAdmins.filter(val => !selectedAdministrators.includes(val));
        selectedAdministrators.map((item) => {
            fetch('http://localhost:4000/user/deleteAdminSystem/' + item._id, {
                cache: 'no-cache',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        })
        setListaAdmins(_administrators);
        setDeleteAdminsSystemDialog(false);
        setSelectedAdministrators(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
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
                <Button label="Exportar" icon="pi pi-upload" className="p-button-help"  />
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



    return (
        <div className="grid">
            <div className="col-12">
                <Toast ref={toast} />

                <div className="card">
                <   Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable responsiveLayout="scroll" ref={dt} value={listaAdmins} dataKey="_id" paginator  rows={10}
                         filterDisplay="menu"  selection={selectedAdministrators} onSelectionChange={(e) => setSelectedAdministrators(e.value)}
                          emptyMessage="No se encuentran administradores de comunidad registrados." header={header}
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="community_id" sortable header='Comunidad' style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column field="name" sortable header='Nombre' style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column field="last_name" sortable header="Apellidos" style={{ flexGrow: 1,flexBasis: '160px',  minWidth: '160px', wordBreak: 'break-word' }} alignFrozen="left"></Column>
                        <Column field="dni" sortable header="Identificación" style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column field="email" sortable header="Correo electrónico" style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column field="phone" sortable header="Telefóno" style={{ flexGrow: 1,flexBasis: '160px',  minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column header="Acciones" style={{ flexGrow: 1,flexBasis: '60px' }} body={actionsAdmin}></Column>

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
                            {sysadmin && <span>¿Está seguro eliminar los adminsitradores del sistema seleccionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
        
    )
}

export default React.memo(AdministradoresComunidad);