import React, { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHomeAlt } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'primereact/dropdown';


const AdministradoresComunidad = () => {

    const [listaAdmins, setListaAdmins] = useState([]);
    const [listaAdminComunidad, setListaAdminComunidad] = useState([]);
    const [adminCommunity, setAdminCommunity] = useState(emptyAdminCommunity);
    const [selectedAdminsCommunities, setSelectedAdminsCommunities] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [deleteAdminCommunityDialog, setDeleteAdminCommunityDialog] = useState(false);
    const [deleteAdminsCommunitiesDialog, setDeleteAdminsCommunitiesDialog] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    const [communitiesList, setCommunitiesList] = useState([]);
    const [communityId, setCommunityId] = useState([]);


    let emptyAdminCommunity = {
        _id: null,
        dni: '',
        name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        community_id: '',
        community_name: '',
        user_type: '2',
        status: '1'
    };

    async function getCommunites() {
        let response = await fetch('http://localhost:4000/community/allCommunities', { method: 'GET' });
        let resList = await response.json();
        let list = await resList.message;
        console.log(list);

        setCommunitiesList(await list);
    }

    useEffect(() => {
        getCommunites();
    }, [])


    async function listaAdmin() {
        let nombres = await fetch('http://localhost:4000/user/findAdminComunidad/', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => {
                return Promise.all(data.message.map(item => {
                    //item.full_name returns the repositorie name
                    return fetch(`http://localhost:4000/community/findCommunityName/${item.community_id}`, { method: 'GET' })
                        .then((response2) => response2.json())
                        .then(data => {
                            console.log(data.message.name);
                            item.community_name = data.message.name
                            return item
                        })
                }));
            }).then(data => setListaAdmins(data)
            );

    }

    useEffect(() => {
        listaAdmin();

    }, [])

    const cList = communitiesList.map((item) => ({
        label: item.name,
        value: item.id,
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
                           console.log('Ocurrió un error con el servicio: ' + response.status);
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
                       console.log('Ocurrió un error con el fetch', err)
                       toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Comunidad de Viviendas no se pudo eliminar', life: 3000 });
                   }
               ); 
        */
        let _administrators = listaAdmins.filter(val => val._id !== adminCommunity._id);
        setListaAdmins(_administrators);
        setDeleteAdminCommunityDialog(false);
        setAdminCommunity(emptyAdminCommunity);
        toast.current.show({ severity: 'success', summary: 'Administrador de Comunidad Eliminada', life: 3000 });
    }

    const deleteSelectedAdminsCommunity = () => {
        let _admins = listaAdmins.filter(val => !selectedAdminsCommunities.includes(val));
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
        toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Administradores de Comunidad de Viviendas Eliminado', life: 3000 });
    }


    const saveCommunityAdmin = () => {

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
    }


    const actionsAdminCommunity = (rowData) => {
        return (
            <div className="actions">
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2" onClick={() => confirmDeleteAdminCommunity(rowData)} />
            </div>
        );
    }

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
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Administradores de Comunidades</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );

    const headerName = (
        <>
            <p> <FontAwesomeIcon icon={faUserAlt} style={{ color: "#C08135" }} />  Nombre</p>
        </>
    )

    const headerLastName = (
        <>
            <p> <FontAwesomeIcon icon={faUserAlt} style={{ color: "#D7A86E" }} />    Apellidos</p>
        </>
    )

    const headerDNI = (
        <>
            <p> <FontAwesomeIcon icon={faIdCardAlt} style={{ color: "#C08135" }} />    Identificación</p>
        </>
    )

    const headerEmail = (
        <>
            <p> <FontAwesomeIcon icon={faAt} style={{ color: "#D7A86E" }} />    Correo Electrónico</p>
        </>
    )

    const headerPhone = (
        <>
            <p> <FontAwesomeIcon icon={faPhoneAlt} style={{ color: "#C08135" }} />   Teléfono</p>
        </>
    )

    const headerCommuntiy = (
        <>
            <p> <FontAwesomeIcon icon={faHomeAlt} style={{ color: "#D7A86E" }} />   Comunidad</p>
        </>
    )

    const headerOptions = (
        <>
            <p><FontAwesomeIcon icon={faEllipsis} size="2x" style={{ color: "#C08135" }} /></p>
        </>
    )


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
                        <Column field="phone" sortable header={headerPhone} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column field="community_name" header={headerCommuntiy} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column header={headerOptions} style={{ flexGrow: 1, flexBasis: '130px', minWidth: '130px' }} body={actionsAdminCommunity}></Column>
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
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>Registro de un administrador de una comunidad de viviendas</h5>
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
                        <div className="p-field col-12 md:col-6">
                            <label htmlFor="administrator">Comunidad a asignar: </label>
                            <Dropdown id="administrator" value={communityId} options={cList} />
                        </div>
                        <Button label="Registrar" onClick={saveCommunityAdmin} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(AdministradoresComunidad);
