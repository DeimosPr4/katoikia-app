import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';

import { useCookies } from "react-cookie";


const Inquilinos = () => {

  let emptyTenant = {
    _id: null,
    dni: '',
    name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    community_id: '',
    community_name: '',
    number_house: 'Sin número de vivienda',
    user_type: '4',
    date_entry: new Date(),
    status: '1'
  };

  const [tenants, setTenants] = useState([]);
  const [tenant, setTenant] = useState(emptyTenant);
  const [selectedTentants, setSelectedTenants] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteTenantDialog, setDeleteTenantDialog] = useState(false);
  const [deleteTenantsDialog, setDeleteTenantsDialog,] = useState(false);
  const [communitiesList, setCommunitiesList] = useState([]);
  const [communityId, setCommunityId] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  const [cookies, setCookie] = useCookies();


  async function tenantsList() {
    await fetch(`http://localhost:4000/user/findTenants/${cookies.community_id}`, { method: 'GET' })
      .then((response) => response.json())
      .then(data => data.message)
      .then(data => {

        data.map((item) => {
          if(item.number_house ==""){
            item.number_house = "Sin vivienda asignada";
          }
        })
        setTenants(data)
      });
  }


  async function getCommunites() {
    let response = await fetch('http://localhost:4000/community/allCommunities', { method: 'GET' });
    let resList = await response.json();
    let list = await resList.message;

    setCommunitiesList(await list);
  }

  useEffect(() => {
    tenantsList();
  }, [])


  useEffect(() => {
    getCommunites();
  }, [])

  const cList = communitiesList.map((item) => ({
    label: item.name,
    value: item._id,
  }))

  function registrarInquilino() {
    let data = {
      dni: document.getElementById('identificacion').value,
      name: document.getElementById('nombre').value,
      last_name: document.getElementById('apellidos').value,
      phone: document.getElementById('telefono').value,
      email: document.getElementById('correo_electronico').value,
      community_id: document.getElementById('numero_vivienda').value,
      password: document.getElementById('password').value,
      user_type: '3',
      status: '1',
    };

    fetch('http://localhost:3000/api/createUser', {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        alert('Inquilino registrado correctamente');
      } else {
        alert('Error al registrar inquilino');
      }
    });
  }

  const deleteTenant = () => {
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
    let _tenants = tenants.filter(
      (val) => val._id !== tenant._id,
    );
    setTenants(_tenants);
    setDeleteTenantDialog(false);
    setTenant(emptyTenant);
    toast.current.show({
      severity: 'success',
      summary: 'Inquilino Eliminado',
      life: 3000,
    });
  };

  const deleteSelectedTenants = () => {
    let _tenants = tenants.filter(
      (val) => !selectedTentants.includes(val),
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
    setTenants(_tenants);
    setDeleteTenantsDialog(false);
    setSelectedTenants(null);
    toast.current.show({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Inquilinos Eliminados',
      life: 3000,
    });
  };


  const hideDeleteTenantDialog = () => {
    setDeleteTenantDialog(false);
  }

  const hideDeleteTenantsDialog = () => {
    setDeleteTenantsDialog(false);
  }

  const confirmDeleteTenant = (tenant) => {
    setTenant(tenant);
    setDeleteTenantDialog(true);
  }

  const confirmDeleteSelected = () => {
    setDeleteTenantsDialog(true);
  };


  const actionsTenant = (rowData) => {
    return (
      <div className="actions">
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2" onClick={() => confirmDeleteTenant(rowData)} />
      </div>
    );
  }

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedTentants || !selectedTentants.length} />
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
      <h5 className="m-0">Inquilinos</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
      </span>
    </div>
  );

  const deleteTenantDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteTenantDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteTenant} />
    </>
  );

  const deleteTenantsDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteTenantsDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedTenants} />
    </>
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



  const headerNumberHouse = (
    <>
      <p> <FontAwesomeIcon icon={faHashtag} style={{ color: "#C08135" }} />   Número de vivienda</p>
    </>
  )

  const headerOptions = (
    <>
      <p>Opciones <FontAwesomeIcon icon={faEllipsis} style={{ color: "#D7A86E" }} /></p>
    </>
  )
  return (
    <div className="grid">
      <div className="col-12">
        <Toast ref={toast} />
        <div className="card">
          <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
          <DataTable ref={dt} value={tenants} dataKey="_id" paginator rows={5} selection={selectedTentants} onSelectionChange={(e) => setSelectedTenants(e.value)}
            scrollable scrollHeight="400px" scrollDirection="both" header={header}
            rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive mt-3"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} inquilinos"
            globalFilter={globalFilter} emptyMessage="No hay inquilinos en esta comunidad registrados.">
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field="name" sortable header={headerName} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
            <Column field="last_name" sortable header={headerLastName} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }} alignFrozen="left"></Column>
            <Column field="dni" sortable header={headerDNI} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}>
            </Column>
            <Column field="email" sortable header={headerEmail} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
            <Column field="phone" header={headerPhone} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
            <Column field="number_house" header={headerNumberHouse} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
            <Column header={headerOptions} style={{ flexGrow: 1, flexBasis: '130px', minWidth: '130px' }} body={actionsTenant}></Column>
          </DataTable>
          <Dialog visible={deleteTenantDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteTenantDialogFooter} onHide={hideDeleteTenantDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {tenant && <span>¿Estás seguro que desea eliminar a <b>{tenant.name}</b>?</span>}
            </div>
          </Dialog>
          <Dialog visible={deleteTenantsDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteTenantsDialogFooter} onHide={hideDeleteTenantsDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {selectedTentants && <span>¿Está seguro eliminar los Inquilinos seleccionados?</span>}
            </div>
          </Dialog>
        </div>
      </div>
      <div className="col-12">
        <div className="card">
          <h5 className="card-header">Registrar Inquilino</h5>
          <div className="p-fluid formgrid grid">
            <div className="field col-12 md:col-6">
              <label htmlFor="nombre">Nombre</label>
              <InputText type="text" className="form-control" id="nombre" />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="apellidos">Apellidos</label>
              <InputText type="text" className="form-control" id="apellidos" />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="identificacion">Identificación</label>
              <InputText
                type="text"
                className="form-control"
                id="identificacion"
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="correo_electronico">Correo electrónico</label>
              <InputText
                type="email"
                className="form-control"
                id="correo_electronico"
              />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="numero_vivienda">Número de Vivienda</label>
              <Dropdown id="numero_vivienda" value={communityId} options={cList} />
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="identificacion">Identificación</label>
              <InputText
                type="password"
                className="form-control"
                id="identificacion"
              />
            </div>
            <Button label="Registrar" onClick={registrarInquilino} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Inquilinos);
