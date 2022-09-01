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
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from "react-cookie";
import classNames from 'classnames';

const GuardasSeguridad = () => {

  let emptyGuarda = {
    _id: null,
    dni: '',
    name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    user_type: '1',
    status: '1',
    status_text: '',
    date_entry: Date.now(),
    community_id: '',
  };

  const [listaGuardas, setListaGuardas] = useState([]);
  const [urlFetch, setUrlFetch] = useState('http://localhost:4000/user/findGuards/');
  const [guarda, setGuarda] = useState(emptyGuarda);
  const [selectedGuardas, setSelectedGuardas] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteGuardaDialog, setDeleteGuardaDialog] = useState(false);
  const [deleteGuardasDialog, setDeleteGuardasDialog] = useState(false);
  const [saveButtonTitle, setSaveButtonTitle] = useState("Registrar");
  const toast = useRef(null);
  const dt = useRef(null);
  const [cookies, setCookie] = useCookies();
  const [changeStatusGuardDialog, setChangeStatusGuardDialog] = useState(false);
  const [guardDialog, setGuardDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formGuardDialog, setFormGuardDialog] = useState(false);


  async function listaGuardasF() {
    let nombres = await fetch((urlFetch + cookies.community_id), { method: 'GET' });
    let listaGuardasRes = await nombres.json();
    let data = await listaGuardasRes.message.filter(
      (val) => val.status != -1,
    )
    await data.map((item) => {
      if (item.status == '1') {
        item.status_text = 'Activo';
      } else if (item.status == '0') {
        item.status_text = 'Inactivo';
      }
    })
    setListaGuardas(await data);
  }

  useEffect(() => {
    listaGuardasF();
  }, [])

  function registrarGuarda() {
    var data = {
      dni: document.getElementById('dni').value,
      name: document.getElementById('name').value,
      last_name: document.getElementById('last_name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      password: document.getElementById('email').value,
      user_type: "4", //4 es guarda
      status: "1",
      date_entry: Date.now(),
      community_id: cookies.community_id
    };
    if (guarda._id === null) {
      console.log('ssss');
      fetch('http://localhost:4000/user/createGuard', {
        cache: 'no-cache',
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.status != 201)
          console.log(`Ocurrió un error con el servicio: ${response.status}`);
        else
          return response.json();
      }).then(() => {
        listaGuardasF();
        setFormGuardDialog(false)
        setGuarda(emptyGuarda)
      }).catch(
        err => console.log('Ocurrió un error con el fetch', err)
      );
    } else {
      data._id = guarda._id;
      console.log(`Actualizando guarda: ${data}`);
      fetch(`http://localhost:4000/user/updateGuard/${guarda._id}`, {
        cache: 'no-cache',
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.status !== 200)
          console.log(`Ocurrió un error con el servicio: ${response.status}`);
        else return response.json();
      }).then(() => {
        toast.current.show({
          severity: 'success',
          summary: 'Guarda actualizada',
          detail: 'Guarda actualizado correctamente'
        });
        setGuarda(emptyGuarda);
        setFormGuardDialog(false)

        listaGuardasF();
      })
    }
    setSaveButtonTitle("Registrar");
  }

  const cambiarStatusUser = () => {
    if (guarda.status == '1') {
      guarda.status = '0';
      guarda.status_text = 'Inactivo';

    } else if (guarda.status == '0') {
      guarda.status = '1';
      guarda.status_text = 'Activo';
    }
    var data = {
      id: guarda._id,
      status: guarda.status,
    };
    fetch('http://localhost:4000/user/changeStatus', {
      cache: 'no-cache',
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status != 201)
        console.log(`Ocurrió un error con el servicio: ${response.status}`);
      else
        return response.json();
    }).then(() => {
      setChangeStatusGuardDialog(false);
      toast.current.show({
        severity: 'success',
        summary: 'Éxito',
        detail: 'Guarda de Seguridad Actualizado',
        life: 3000,
      });
    }).catch(
      err => console.log('Ocurrió un error con el fetch', err)
    );
  }


  const deleteGuarda = () => {
    fetch(`http://localhost:4000/user/deleteAdminSystem/${guarda._id}`, {
      cache: 'no-cache',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status != 201)
        console.log(`Ocurrió un error con el servicio: ${response.status}`);
      else
        return response.json();
    }).then(function () {
      let _guarda = listaGuardas.filter(val => val._id !== guarda._id);
      setListaGuardas(_guarda);
      setDeleteGuardaDialog(false);
      setGuarda(emptyGuarda);
      toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Administrador del Sistema Eliminado', life: 3000 });
    }).catch(err => {
      console.log('Ocurrió un error con el fetch', err)
      toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Administrador del Sistema no se pudo Eliminar', life: 3000 });
    });
  }

  const deleteSelectedGuardas = () => {
    let _guardas = listaGuardas.filter(val => !selectedGuardas.includes(val));
    selectedGuardas.map((item) => {
      fetch('http://localhost:4000/user/deleteAdminSystem/' + item._id, {
        cache: 'no-cache',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })
    setListaGuardas(_guardas);
    setDeleteGuardasDialog(false);
    setSelectedGuardas(null);
    toast.current.show({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Administradores del Sistema Eliminados',
      life: 3000
    });
  }

  const hideDeleteGuardaDialog = () => {
    setDeleteGuardaDialog(false);
  }

  const hideDeleteGuardasDialog = () => {
    setDeleteGuardasDialog(false);
  }

  const confirmDeleteGuarda = (guarda) => {
    setGuarda(guarda);
    setDeleteGuardaDialog(true);
  }

  const confirmDeleteSelected = () => {
    setDeleteGuardasDialog(true);
  }

  const hideChangeStatusGuardDialog = () => {
    setChangeStatusGuardDialog(false);
  };

  const confirmChangeStatusGuard = (guard) => {
    setGuarda(guard);
    setChangeStatusGuardDialog(true);
  };

  const hideGuardDialog = () => {
    setSubmitted(false);
    setGuardDialog(false);
  };

  const infoGuard = (guard) => {
    setGuarda(guard);
    setGuardDialog(true);
  };

  const editGuard = (guard) => {
    setGuarda(guard);
    setFormGuardDialog(true)
    setSaveButtonTitle("Actualizar");
  }

  const cancelEdit = () => {
    setGuarda(emptyGuarda);
    setSaveButtonTitle("Registrar");
    setFormGuardDialog(false)

  }


  const openNewGuard = () => {
    setGuarda(emptyGuarda);
    setFormGuardDialog(true)
    setSubmitted(false);
  };

  const hideFormGuardDialog = () => {
    setSubmitted(false);
    setFormGuardDialog(false)
    setGuarda(emptyGuarda);
    setSaveButtonTitle('Registrar');
  }

  const actionsGuard = (rowData) => {
    let icono = '';
    let text = '';
    if (rowData.status == '0') {
      icono = "pi pi-eye";
      text = "Activar Guarda de Seguridad"
    } else if (rowData.status == '1') {
      icono = "pi pi-eye-slash";
      text = "Inactivar Guarda de Seguridad"
    }
    return (
      <div className="actions">
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mt-2 mx-2"
          onClick={() => editGuard(rowData)}
          title="Editar"
        />
        <Button
          icon="pi pi-exclamation-circle"
          className="p-button-rounded p-button-info mt-2 mx-2"
          onClick={() => infoGuard(rowData)}
        />
        <Button
          icon={`${icono}`}
          className="p-button-rounded p-button-warning mt-2 mx-2"
          onClick={() => confirmChangeStatusGuard(rowData)}
          title={`${text}`}
        />
        <Button icon="pi pi-trash"
          className="p-button-rounded p-button-danger mt-2 mx-2"
          onClick={() => confirmDeleteGuarda(rowData)} />
      </div>
    );
  }

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="Agregar Guarda"
            icon="pi pi-plus"
            className="p-button-primary mr-2"
            onClick={openNewGuard}
          />
          <Button label="Eliminar"
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={confirmDeleteSelected}
            disabled={!selectedGuardas || !selectedGuardas.length} />
        </div>
      </React.Fragment>
    )
  }

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button label="Exportar"
          icon="pi pi-upload"
          className="p-button-help" />
      </React.Fragment>
    )
  }

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Guardas de seguridad</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
      </span>
    </div>
  );

  const deleteAdminSystemDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteGuardasDialog} />
      <Button label="Sí" icon="pi pi-check" className="p-button-text" onClick={deleteGuarda} />
    </>
  );

  const deleteAdminsSystemDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteGuardasDialog} />
      <Button label="Sí" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedGuardas} />
    </>
  );

  const changeStatusGuardDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideChangeStatusGuardDialog}
      />
      <Button
        label="Sí"
        icon="pi pi-check"
        className="p-button-text"
        onClick={cambiarStatusUser}
      />
    </>
  );

  const guardDialogFooter = (
    <>
      <Button
        label="Cerrar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideGuardDialog}
      />
    </>
  );

  const formGuardDialogFooter = (
    <>
      <Button
        label={`${saveButtonTitle}`}
        icon="pi pi-check"
        className="p-button-primary"
        onClick={registrarGuarda}
      />
      <Button
        label="Cerrar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideFormGuardDialog}
      />
    </>
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
        Apellido(s)
      </p>
    </>
  )

  const headerDNI = (
    <p> {' '}
      <FontAwesomeIcon icon={faIdCardAlt} style={{ color: "#C08135" }} />{' '}
      Identificación
    </p>
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
      <p>
        {' '}
        <FontAwesomeIcon icon={faPhoneAlt} style={{ color: '#C08135' }} />{' '}
        Teléfono
      </p>
    </>
  )

  const headerStatus = (
    <>
      <p> {' '}
        <FontAwesomeIcon icon={faCircleQuestion} style={{ color: "#D7A86E" }} />{' '}
        Estado
      </p>
    </>
  )

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

  const onInputChange = (e, name) => {
    const value = (e.target && e.target.value) || ''
    let _guarda = { ...guarda }
    _guarda[`${name}`] = value
    setGuarda(_guarda)
  }

  return (
    <div className="grid">
      <div className="col-12">
        <Toast ref={toast} />
        <div className="card">
          <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
          <DataTable ref={dt} value={listaGuardas} dataKey="_id" paginator rows={5} selection={selectedGuardas} onSelectionChange={(e) => setSelectedGuardas(e.value)}
            responsiveLayout="scroll" header={header}
            rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive mt-3"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords}"
            globalFilter={globalFilter} emptyMessage="No hay guardas registrados.">
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field="name" sortable header={headerName} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
            <Column field="last_name" sortable header={headerLastName} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }} alignFrozen="left"></Column>
            <Column field="dni" sortable header={headerDNI} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}>
            </Column>
            <Column field="email" sortable header={headerEmail} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
            <Column field="phone" header={headerPhone} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
            <Column
              field="status"
              sortable
              header={headerStatus}
              body={statusBodyTemplate}
              style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}>
            </Column>
            <Column style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px' }} body={actionsGuard}></Column>
          </DataTable>
          <Dialog
            visible={guardDialog}
            style={{ width: '650px' }}
            header="Información del Guarda de Seguridad"
            modal
            className="p-fluid"
            footer={guardDialogFooter}
            onHide={hideGuardDialog}>
            <div className='container text-center'>
              <div className='row my-4'>
                <div className=" col-6 md:col-6">

                  <i className="pi pi-user icon-khaki"></i>
                  <p><strong>Nombre Completo</strong></p>
                  <div className="p-0 col-12  md:col-12" style={{ margin: '0 auto' }}>
                    <div className="p-inputgroup align-items-center justify-content-evenly">
                      <p>{guarda.name + ' ' + guarda.last_name}</p>
                    </div>
                  </div>
                </div>

                <div className=" col-6 col-md-6 md:col-6">
                  <i className="pi pi-id-card icon-khaki"></i>
                  <p><strong>Identificación</strong></p>
                  <div className="p-0 col-12 md:col-12" style={{ margin: '0 auto' }}>
                    <div className="p-inputgroup align-items-center justify-content-evenly">
                      <p>{guarda.dni}</p>
                    </div>

                  </div>
                </div>
              </div>
              <div className='row my-5 justify-content-center'>
              </div>
              <div className='row my-5 justify-content-center'>
                <div className=" col-6 md:col-6">
                  <i className="pi pi-phone icon-khaki"></i>
                  <p><strong>Teléfono</strong></p>
                  <div className="p-0 col-12 md:col-12">
                    <div className="p-inputgroup align-items-center justify-content-evenly">
                      <p>{guarda.phone}</p>
                    </div>

                  </div>
                </div>
                <div className=" col-6 md:col-6">
                  <i className="pi pi-envelope icon-khaki"></i>

                  <p><strong>Correo Electrónico</strong></p>
                  <div className="p-0 col-12  md:col-12" style={{ margin: '0 auto' }}>
                    <div className="p-inputgroup align-items-center justify-content-evenly">
                      <p>{guarda.email}</p>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </Dialog>
          <Dialog visible={deleteGuardaDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteAdminSystemDialogFooter} onHide={hideDeleteGuardaDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {guarda && <span>¿Estás seguro que desea eliminar a <b>{guarda.name}</b>?</span>}
            </div>
          </Dialog>
          <Dialog visible={deleteGuardasDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteAdminsSystemDialogFooter} onHide={hideDeleteGuardasDialog}>
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {selectedGuardas && <span>¿Está seguro eliminar los guardas de seguridad seleccionados?</span>}
            </div>
          </Dialog>
          <Dialog
            visible={changeStatusGuardDialog}
            style={{ width: '450px' }}
            header="Confirmar"
            modal
            footer={changeStatusGuardDialogFooter}
            onHide={hideChangeStatusGuardDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: '2rem' }}
              />
              {guarda && (
                <span>
                  ¿Estás seguro que desea cambiar estado a <b>{guarda.name}</b>?
                </span>
              )}
            </div>
          </Dialog>
          <Dialog
            visible={formGuardDialog}
            style={{ width: '750px' }}
            header='Mantenimiento de Guarda de Seguridad'
            modal
            footer={formGuardDialogFooter}
            onHide={hideFormGuardDialog}
          >
            <div className="p-fluid formgrid grid">
              <div className="field col-12 md:col-6">
                <label htmlFor="name">Nombre</label>
                <div className="p-0 col-12 md:col-12">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                      <i className="pi pi-home"></i>
                    </span>
                    <InputText type="text" id="name" value={guarda.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && guarda.name === '' })} />
                  </div>
                  {submitted && guarda.name === '' && <small className="p-invalid">Nombre es requerido.</small>}
                </div>
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="name">Apellido(s)</label>
                <div className="p-0 col-12 md:col-12">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                      <i className="pi pi-home"></i>
                    </span>
                    <InputText type="text" id="last_name" value={guarda.last_name} onChange={(e) => onInputChange(e, 'last_name')} required autoFocus className={classNames({ 'p-invalid': submitted && guarda.last_name === '' })} />
                  </div>
                  {submitted && guarda.last_name === '' && <small className="p-invalid">Apellidos son requeridos.</small>}
                </div>
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="name">Correo Electrónico</label>
                <div className="p-0 col-12 md:col-12">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                      <i className="pi pi-home"></i>
                    </span>
                    <InputText type='email' id="email" value={guarda.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && guarda.email === '' })} />
                  </div>
                  {submitted && guarda.email === '' && <small className="p-invalid">Correo electrónico es requerido.</small>}
                </div>
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="dni">Identificación</label>
                <div className="p-0 col-12 md:col-12">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                      <i className="pi pi-home"></i>
                    </span>
                    <InputText id="dni" value={guarda.dni} onChange={(e) => onInputChange(e, 'dni')} required autoFocus className={classNames({ 'p-invalid': submitted && guarda.dni === '' })} />
                  </div>
                  {submitted && guarda.email === '' && <small className="p-invalid">Identificación es requerida.</small>}
                </div>
              </div>
              <div className="field col-12 md:col-6">
                <label htmlFor="phone">Número de teléfono</label>
                <div className="p-0 col-12 md:col-12">
                  <div className="p-inputgroup">
                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                      <i className="pi pi-phone"></i>
                    </span>
                    <InputText id="phone" value={guarda.phone} onChange={(e) => onInputChange(e, 'phone')} type='tel' required autoFocus className={classNames({ 'p-invalid': submitted && guarda.phone === '' })} />
                  </div>
                  {submitted
                    && guarda.phone === ''
                    && <small className="p-invalid">Número de teléfono es requerido.</small>}
                </div>
              </div>

            </div>
          </Dialog>
        </div>
      </div>

    </div>
  );
};

export default React.memo(GuardasSeguridad);
