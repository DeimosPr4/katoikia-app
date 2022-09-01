import React, { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

const AdministradoresSistema = () => {


  let emptySysAdmin = {
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
  };


  const [administrators, setAdministrators] = useState([]);
  const [urlFetch, setUrlFetch] = useState(
    'http://localhost:4000/user/findAdminSistema/',
  );
  const [sysadmin, setSysAdmin] = useState(emptySysAdmin);
  const [selectedAdministrators, setSelectedAdministrators] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteAdminSystemDialog, setDeleteAdminSystemDialog] = useState(false);
  const [deleteAdminsSystemDialog, setDeleteAdminsSystemDialog] =
    useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  const [changeStatusAdminSystemDialog, setChangeStatusAdminSystemDialog] = useState(false);
  const [changeStatusAdminsSystemDialog, setChangeStatusAdminsSystemDialog] =
    useState(false);
  const [adminDialog, setAdminDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formAdminDialog, setFormAdminDialog] = useState(false);
  const [saveButtonTitle, setSaveButtonTitle] = useState("Registrar")


  async function fetchP() {
    let nombres = await fetch(urlFetch, { method: 'GET' });
    let adminRes = await nombres.json();
    let data = await adminRes.message.filter(
      (val) => val.status != -1,
    )
    await data.map((item) => {
      if (item.status == '1') {
        item.status_text = 'Activo';
      } else if (item.status == '0') {
        item.status_text = 'Inactivo';
      }
    })
    setAdministrators(await data);
  }

  useEffect(() => {
    fetchP();
  }, [])

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < administrators.length; i++) {
      if (administrators[i]._id === id) {
        index = i;
        break;
      }
    }
    return index;

  }

  const findRepeated = (name, value) => {
    let _administrators = [...administrators];
    let value_filtered = _administrators.filter(item => item[`${name}`] === value);
    return value_filtered.length
  }


  function guardarAdmin() {
    let _administrators = [...administrators];
    let _admin = { ...sysadmin };

    if (_admin.name && _admin.dni && _admin.last_name && _admin.email &&
      _admin.phone) {



      if (findRepeated('email', _admin.email) || findRepeated('dni', _admin.dni)) {
        setSubmitted(true);

      } else {
        if (_admin._id) {

          fetch('http://localhost:4000/user/updateAdminSystem/', {
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
            .then(
              function (response) {
                const index = findIndexById(sysadmin._id);

                _administrators[index] = _admin;
                toast.current.show({
                  severity: 'success',
                  summary: 'Exito',
                  detail: 'Administrador Actualizado',
                  life: 3000,
                });
                setAdministrators(_administrators)
                setFormAdminDialog(false);
                setSysAdmin(emptySysAdmin);
              }
            )
            .catch(
              err => console.log('Ocurrió un error con el fetch', err)
            );
        } else {
          fetch('http://localhost:4000/user/createAdminSystem/', {
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
            .then(
              function (response) {
                _administrators.push(_admin);
                setAdministrators(_administrators)
                setFormAdminDialog(false)

              }
            )
            .catch(
              err => console.log('Ocurrió un error con el fetch', err)
            );
        }
      }
    } else {
      setSubmitted(true);
    }
  }

  const cambiarStatusUser = () => {
    if (sysadmin.status == '1') {
      sysadmin.status = '0';
      sysadmin.status_text = 'Inactivo';

    } else if (sysadmin.status == '0') {
      sysadmin.status = '1';
      sysadmin.status_text = 'Activo';
    }
    var data = {
      id: sysadmin._id,
      status: sysadmin.status,
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
          setChangeStatusAdminSystemDialog(false);
          toast.current.show({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Administrador del Sistema Actualizado',
            life: 3000,
          });
        }
      )
      .catch(
        err => console.log('Ocurrió un error con el fetch', err)
      );
  }

  const confirmDeleteAdminSystem = (sysAdmin) => {
    setSysAdmin(sysAdmin);
    setDeleteAdminSystemDialog(true);
  };

  const confirmDeleteSelected = () => {
    setDeleteAdminsSystemDialog(true);
  };

  const hideDeleteAdminSystemDialog = () => {
    setDeleteAdminSystemDialog(false);
  };

  const hideDeleteAdminsSystemDialog = () => {
    setDeleteAdminsSystemDialog(false);
  };

  const hideChangeStatusAdminDialog = () => {
    setChangeStatusAdminSystemDialog(false);
  };

  const confirmChangeStatusAdminSystem = (sysAdmin) => {
    setSysAdmin(sysAdmin);
    setChangeStatusAdminSystemDialog(true);
  };

  const hideAdminDialog = () => {
    setSubmitted(false);
    setAdminDialog(false);
    setSysAdmin(emptySysAdmin);
  };

  const infoAdmin = (sysadmin) => {
    setSysAdmin({ ...sysadmin });
    setAdminDialog(true);
  };

  const cancelEdit = () => {
    setSaveButtonTitle('Registrar');
    setSubmitted(false);
    setSysAdmin(emptySysAdmin);
  }

  const editAdmin = (sysadmin) => {
    setSysAdmin({ ...sysadmin });
    setSaveButtonTitle('Actualizar');
    setFormAdminDialog(true)

  };
  const openNewAdmin = () => {
    setSysAdmin(emptySysAdmin);
    setFormAdminDialog(true)
    setSubmitted(false);
  };

  const hideFormAdminDialog = () => {
    setSubmitted(false);
    setFormAdminDialog(false)
    setSysAdmin(emptySysAdmin);
    setSaveButtonTitle('Registrar');

  };


  const deleteSysAdmin = () => {
    fetch('http://localhost:4000/user/deleteAdminSystem/' + sysadmin._id, {
      cache: 'no-cache',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(function (response) {
        if (response.status != 201)
          console.log('Ocurrió un error con el servicio: ' + response.status);
        else return response.json();
      })
      .then(function (response) {
        let _sysadmin = administrators.filter(
          (val) => (val._id !== sysadmin._id || val.status != -1),
        );

        setAdministrators(_sysadmin);
        setDeleteAdminSystemDialog(false);
        setSysAdmin(emptySysAdmin);
        toast.current.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Administrador del Sistema Eliminado',
          life: 3000,
        });
      })
      .catch((err) => {
        console.log('Ocurrió un error con el fetch', err);
        toast.current.show({
          severity: 'danger',
          summary: 'Error',
          detail: 'Administrador del Sistema no se pudo Eliminar',
          life: 3000,
        });
      });
  };

  const deleteSelectedAdminsSystem = () => {
    let _administrators = administrators.filter(
      (val) => (!selectedAdministrators.includes(val)),
    );
    selectedAdministrators.map((item) => {
      fetch('http://localhost:4000/user/deleteAdminSystem/' + item._id, {
        cache: 'no-cache',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    });
    _administrators = _administrators.filter(
      (val) => val.status != -1,
    )
    setAdministrators(_administrators);
    setDeleteAdminsSystemDialog(false);
    setSelectedAdministrators(null);
    toast.current.show({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Administradores del Sistema Eliminados',
      life: 3000,
    });
  };



  const actionsAdmin = (rowData) => {
    let icono = '';
    let text = '';
    if (rowData.status == '0') {
      icono = "pi pi-eye";
      text = "Activar Administrador"
    } else if (rowData.status == '1') {
      icono = "pi pi-eye-slash";
      text = "Inactivar Administrador"

    }

    return (
      <div className="actions">
        <Button
          icon="pi pi-exclamation-circle"
          className="p-button-rounded p-button-info mt-2 mx-2"
          onClick={() => infoAdmin(rowData)}
          title="Ver información del Administrador"

        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mt-2 mx-2"
          onClick={() => editAdmin(rowData)}
          title="Editar Administrador"

        />

        <Button
          icon={`${icono}`}
          className="p-button-rounded p-button-warning mt-2 mx-2"
          onClick={() => confirmChangeStatusAdminSystem(rowData)}
          title={`${text}`}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger mt-2 mx-2"
          onClick={() => confirmDeleteAdminSystem(rowData)}
          title="Eliminar Administrador"
        />
      </div>
    );
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
        <Button
            label="Agregar Administrador"
            icon="pi pi-plus"
            className="p-button-primary mr-2"
            onClick={openNewAdmin}
          />
          <Button
            label="Eliminar"
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={confirmDeleteSelected}
            disabled={!selectedAdministrators || !selectedAdministrators.length}
          />
        </div>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Exportar"
          icon="pi pi-upload"
          className="p-button-help"
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">
        Administradores del sistema <i className="fal fa-user"></i>
      </h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </span>
    </div>
  );

  const deleteAdminSystemDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteAdminSystemDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSysAdmin}
      />
    </>
  );

  const deleteAdminsSystemDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteAdminsSystemDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedAdminsSystem}
      />
    </>
  );

  const changeStatusAdminSystemDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideChangeStatusAdminDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={cambiarStatusUser}
      />
    </>
  );


  const formAdminDialogFooter = (
    <>
      <Button
        label={`${saveButtonTitle}`}
        icon="pi pi-check"
        className="p-button-primary"
        onClick={guardarAdmin}
      />
      <Button
        label="Cerrar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideFormAdminDialog}
      />
    </>
  );

  const adminDialogFooter = (
    <>
      <Button
        label="Cerrar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideAdminDialog}
      />

    </>
  );

  const headerName = (
    <>
      <p>
        {' '}
        <FontAwesomeIcon icon={faUserAlt} style={{ color: '#C08135' }} /> Nombre
      </p>
    </>
  );

  const headerLastName = (
    <>
      <p>
        {' '}
        <FontAwesomeIcon icon={faUserAlt} style={{ color: '#D7A86E' }} />{' '}
        Apellidos
      </p>
    </>
  );

  const headerDNI = (
    <>
      <p>
        {' '}
        <FontAwesomeIcon icon={faIdCardAlt} style={{ color: '#C08135' }} />{' '}
        Identificación
      </p>
    </>
  );

  const headerEmail = (
    <>
      <p>
        {' '}
        <FontAwesomeIcon icon={faAt} style={{ color: '#D7A86E' }} /> Correo
        Electrónico
      </p>
    </>
  );

  const headerPhone = (
    <>
      <p>
        {' '}
        <FontAwesomeIcon icon={faPhoneAlt} style={{ color: '#C08135' }} />{' '}
        Teléfono
      </p>
    </>
  );

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
    const val = (e.target && e.target.value) || '';
    let _admin = { ...sysadmin };
    _admin[`${name}`] = val;

    setSysAdmin(_admin);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _admin = { ...sysadmin };
    _admin[`${name}`] = val;

    setSysAdmin(_admin);
  };

  return (
    <div className="grid">
      <div className="col-12">
        <Toast ref={toast} />
        <div className="card">
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>
          <DataTable
            ref={dt}
            value={administrators}
            dataKey="_id"
            paginator
            rows={5}
            selection={selectedAdministrators}
            onSelectionChange={(e) => setSelectedAdministrators(e.value)}
            scrollable
            scrollHeight="400px"
            scrollDirection="both"
            header={header}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive mt-3"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} administradores del sistema"
            globalFilter={globalFilter}
            emptyMessage="No hay administradores del sistema registrados."
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: '3rem' }}
            ></Column>
            <Column
              field="name"
              sortable
              header={headerName}
              style={{
                flexGrow: 1,
                flexBasis: '160px',
                minWidth: '160px',
                wordBreak: 'break-word',
              }}
            ></Column>
            <Column
              field="last_name"
              sortable
              header={headerLastName}
              style={{
                flexGrow: 1,
                flexBasis: '160px',
                minWidth: '160px',
                wordBreak: 'break-word',
              }}
              alignFrozen="left"
            ></Column>
            <Column
              field="dni"
              sortable
              header={headerDNI}
              style={{
                flexGrow: 1,
                flexBasis: '160px',
                minWidth: '160px',
                wordBreak: 'break-word',
              }}
            ></Column>
            <Column
              field="email"
              sortable
              header={headerEmail}
              style={{
                flexGrow: 1,
                flexBasis: '160px',
                minWidth: '160px',
                wordBreak: 'break-word',
              }}
            ></Column>
            <Column
              field="phone"
              header={headerPhone}
              style={{
                flexGrow: 1,
                flexBasis: '160px',
                minWidth: '160px',
                wordBreak: 'break-word',
              }}
            ></Column>
            <Column
              field="status"
              sortable
              header={headerStatus}
              body={statusBodyTemplate}
              style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}>
            </Column>
            <Column

              style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px' }}
              body={actionsAdmin}
            ></Column>
          </DataTable>
          <Dialog
            visible={adminDialog}
            style={{ width: '650px' }}
            header="Información del Admin del Sistema"
            modal
            className="p-fluid"
            footer={adminDialogFooter}
            onHide={hideAdminDialog}
          >
            {sysadmin && (
              <div className='container text-center'>
                <div className='row my-4'>
                  <div className=" col-12 md:col-12">
                    <h3>Información Básica</h3>
                  </div>
                  <div className=" col-6 md:col-6">
                    <i className="pi pi-user icon-khaki"></i>
                    <p><strong>Nombre</strong></p>
                    <div className="p-0 col-12  md:col-12" style={{ margin: '0 auto' }}>
                      <div className="p-inputgroup align-items-center justify-content-evenly">
                        <p>{sysadmin.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className=" col-6 md:col-6">
                    <i className="pi pi-user icon-khaki"></i>
                    <p><strong>Apellido(s)</strong></p>
                    <div className="p-0 col-12  md:col-12" style={{ margin: '0 auto' }}>

                      <div className="p-inputgroup align-items-center justify-content-evenly">

                        <p>{sysadmin.last_name}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row my-5'>
                  <div className=" col-12 md:col-12">
                    <i className="pi pi-id-card icon-khaki"></i>
                    <p><strong>Identificación</strong></p>
                    <div className="p-0 col-12  md:col-12" style={{ margin: '0 auto' }}>
                      <div className="p-inputgroup align-items-center justify-content-evenly">
                        <p>{sysadmin.dni}</p>
                      </div>

                    </div>
                  </div>
                </div>

                <div className='row my-5'>
                  <div className=" col-12 md:col-12">
                    <h3>Contacto</h3>
                  </div>
                  <div className=" col-6 col-md-6 md:col-6">
                    <i className="pi pi-at icon-khaki"></i>
                    <p><strong>Correo electrónico</strong></p>
                    <div className="p-0 col-12 md:col-12">
                      <div className="p-inputgroup align-items-center justify-content-evenly">
                        <p>{sysadmin.email}</p>
                      </div>

                    </div>
                  </div>
                  <div className=" col-6 md:col-6">
                    <i className="pi pi-phone icon-khaki"></i>
                    <p><strong>Teléfono</strong></p>
                    <div className="p-0 col-12 md:col-12">
                      <div className="p-inputgroup align-items-center justify-content-evenly">
                        <p>{sysadmin.phone}</p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            )}
          </Dialog>

          <Dialog
            visible={deleteAdminSystemDialog}
            style={{ width: '450px' }}
            header="Confirmar"
            modal
            footer={deleteAdminSystemDialogFooter}
            onHide={hideDeleteAdminSystemDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: '2rem' }}
              />
              {sysadmin && (
                <span>
                  ¿Estás seguro que desea eliminar a <b>{sysadmin.name}</b>?
                </span>
              )}
            </div>
          </Dialog>
          <Dialog
            visible={deleteAdminsSystemDialog}
            style={{ width: '450px' }}
            header="Confirmar"
            modal
            footer={deleteAdminsSystemDialogFooter}
            onHide={hideDeleteAdminsSystemDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: '2rem' }}
              />
              {selectedAdministrators && (
                <span>
                  ¿Está seguro eliminar los adminsitradores del sistema
                  seleccionados?
                </span>
              )}
            </div>
          </Dialog>
          <Dialog
            visible={changeStatusAdminSystemDialog}
            style={{ width: '450px' }}
            header="Confirmar"
            modal
            footer={changeStatusAdminSystemDialogFooter}
            onHide={hideChangeStatusAdminDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: '2rem' }}
              />
              {sysadmin && (
                <span>
                  ¿Estás seguro que desea cambiar estado a <b>{sysadmin.name}</b>?
                </span>
              )}
            </div>
          </Dialog>
          <Dialog
            visible={formAdminDialog}
            style={{ width: '650px' }}
            header="Mantenimiento Administrador del Sistema"
            modal
            className="p-fluid"
            footer={formAdminDialogFooter}
            onHide={hideFormAdminDialog}>
           <div className="p-fluid formgrid grid">
            <div className="field col-6 md:col-6">
              <label htmlFor="name">Nombre</label>

              <div className="p-0 col-12 md:col-12">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText id="name" value={sysadmin.name}
                    onChange={(e) => onInputChange(e, 'name')}
                    required
                    autoFocus
                    className={classNames({
                      'p-invalid': submitted && sysadmin.name === '',
                    })}
                  />
                </div>
                {submitted && sysadmin.name === '' &&
                  <small className="p-invalid">Nombre es requirido.</small>}
              </div>
            </div>
            <div className="field col-6 md:col-6">
              <label htmlFor="last_name">Apellido(s)</label>
              <div className="p-0 col-12 md:col-12">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText id="last_name" value={sysadmin.last_name}
                    onChange={(e) => onInputChange(e, 'last_name')}
                    required
                    autoFocus
                    className={classNames({
                      'p-invalid': submitted && sysadmin.last_name === '',
                    })}
                  />
                </div>
                {submitted && sysadmin.last_name === '' && (
                  <small className="p-invalid">Apellido(s) es requerido.</small>
                )}
              </div>
            </div>
            <div className="field col-6 md:col-6">
              <label htmlFor="correo_electronico">Correo electrónico</label>
              <div className="p-0 col-12 md:col-12">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                    <i className="pi pi-at"></i>
                  </span>
                  <InputText type="email" id="correo_electronico" value={sysadmin.email}
                    onChange={(e) => onInputChange(e, 'email')}
                    required
                    autoFocus
                    className={classNames({
                      'p-invalid': submitted && (sysadmin.email === '' || findRepeated('email', sysadmin.email) > 0),
                    })}
                  />
                </div>
                {submitted && sysadmin.email === '' && (
                  <small className="p-invalid">Correo electrónico es requerido.</small>
                )}
                {submitted && findRepeated('email', sysadmin.email) > 0 &&
                  <small className="p-invalid">Correo electrónico se encuentra repetido.</small>
                }
              </div>
            </div>
            <div className="field col-6 md:col-6">
              <label htmlFor="dni">Identificación</label>
              <div className="p-0 col-12 md:col-12">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                    <i className="pi pi-id-card"></i>
                  </span>
                  <InputText type="text" id="dni" value={sysadmin.dni}
                    onChange={(e) => onInputChange(e, 'dni')}
                    required
                    autoFocus
                    className={classNames({
                      'p-invalid': submitted && (sysadmin.dni === '' || findRepeated('dni', sysadmin.dni) > 0),
                    })}
                  />
                </div>
                {submitted && sysadmin.dni === '' && (
                  <small className="p-invalid">Identificación es requerida.</small>
                )}
                {submitted && findRepeated('dni', sysadmin.dni) > 0 &&
                  <small className="p-invalid">Identificación se encuentra repetida.</small>
                }
              </div>
            </div>
            <div className="field col-12">
              <label htmlFor="phone">Teléfono</label>
              <div className="p-0 col-12 md:col-12">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                    <i className="pi pi-phone"></i>
                  </span>
                  <InputText type="tel" id="phone" pattern="[0-9]{8}"
                    value={sysadmin.phone}
                    onChange={(e) => onInputChange(e, 'phone')}
                    required
                    autoFocus
                    className={classNames({
                      'p-invalid': submitted && sysadmin.phone === '',
                    })}
                  />
                </div>
                {submitted && sysadmin.phone === '' && (
                  <small className="p-invalid">Teléfono es requerido.</small>
                )}
              </div>
            </div>
          </div>

          </Dialog>
        </div>
      </div>
      
    </div>
  );
};

const comparisonFn = function (prevProps, nextProps) {
  return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(AdministradoresSistema, comparisonFn);
