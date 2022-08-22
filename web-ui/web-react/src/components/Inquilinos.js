import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useRef, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { Toast } from 'primereact/toast'
import { Dialog } from 'primereact/dialog'
import { Toolbar } from 'primereact/toolbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'
import { faAt } from '@fortawesome/free-solid-svg-icons'
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie'
import InfoDialog from './generic/InfoDialog'
import classNames from 'classnames';

const Inquilinos = () => {
  const emptyTenant = {
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
    status: '1',
    status_text: '',
  }

  const [tenants, setTenants] = useState([])
  const [tenant, setTenant] = useState(emptyTenant)
  const [selectedTentants, setSelectedTenants] = useState(null)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [deleteTenantDialog, setDeleteTenantDialog] = useState(false)
  const [deleteTenantsDialog, setDeleteTenantsDialog] = useState(false)
  const [community, setCommunity] = useState([])
  const [houseNumber, setHouseNumber] = useState([])
  const [housesList, setHousesList] = useState([])
  const [submitted, setSubmitted] = useState(false)
  const [showInfoDialog, setShowInfoDialog] = useState(false)
  const toast = useRef(null)
  const dt = useRef(null)
  const [cookies] = useCookies()
  const [changeStatusTenantDialog, setChangeStatusTenantDialog] = useState(false)

  async function tenantsList() {
    await fetch(
      `http://localhost:4000/user/findTenants/${cookies.community_id}`,
      { method: 'GET' },
    )
      .then((response) => response.json())
      .then((data) => data.message)
      .then((data) => {
        data = data.filter((val) => val.status !== -1)
        data.map((item) => {
          if (item.status === '1') {
            item.status_text = 'Activo'
          } else if (item.status === '0') {
            item.status_text = 'Inactivo'
          }

          if (item.number_house === '') {
            item.number_house = 'Sin vivienda asignada'
          }
        })
        setTenants(data)
      })
  }

  async function getCommunity() {
    let response = await fetch(
      `http://localhost:4000/community/findCommunityName/${cookies.community_id}`,
      { method: 'GET' },
    )
    const responseJson = await response.json()
    const result = await responseJson.message
    setCommunity(await result)
    const houses = await result.houses.filter((house) =>
      house.state === "desocupada"
    )
    setHousesList(houses.map((house) => ({
      label: house.number_house, value: house.number_house
    }))
    )
  }

  useEffect(() => {
    tenantsList()
  }, [tenantsList])

  useEffect(() => {
    getCommunity()
  }, [])

  const saveTenant = () => {
    if (tenant.email && tenant.number_house && tenant.dni
      && tenant.name && tenant.last_name && tenant.phone) {
      let _tenants = [...tenants]
      let _tenant = { ...tenant }
      _tenant.community_id = cookies.community_id;
      _tenant.number_house = houseNumber;
      _tenant.password = _tenant.email;

      fetch(`http://localhost:4000/user/createUser`, {
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify(_tenant),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.status !== 201)
            console.log(`Hubo un error en el servicio: ${response.status}`)
          else return response.json()
        })
        .then(() => {
          _tenants.push(_tenant)
          toast.current.show({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Inquilino creado',
            life: 3000,
          })
          setTenants(_tenants)
          setTenant(emptyTenant)
        })
        .catch((error) => console.log(`Ocurrió un error: ${error}`))
    } else setSubmitted(true)
  }

  const deleteTenant = () => {
    let _tenants = tenants.filter((val) => val._id !== tenant._id)
    setTenants(_tenants)
    setDeleteTenantDialog(false)
    setTenant(emptyTenant)
    toast.current.show({
      severity: 'success',
      summary: 'Inquilino Eliminado',
      life: 3000,
    })
  }

  function openDialog() {
    openInfoDialog = true
  }

  const deleteSelectedTenants = () => {
    let _tenants = tenants.filter((val) => !selectedTentants.includes(val))
    setTenants(_tenants)
    setDeleteTenantsDialog(false)
    setSelectedTenants(null)
    toast.current.show({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Inquilinos Eliminados',
      life: 3000,
    })
  }

  const cambiarStatusUser = () => {
    if (tenant.status === '1') {
      tenant.status = '0'
      tenant.status_text = 'Inactivo'
    } else if (tenant.status === '0') {
      tenant.status = '1'
      tenant.status_text = 'Activo'
    }
    var data = {
      id: tenant._id,
      status: tenant.status,
    }
    fetch('http://localhost:4000/user/changeStatus', {
      cache: 'no-cache',
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status !== 201) {
          console.log('Ocurrió un error con el servicio: ' + response.status)
        } else {
          return response.json()
        }
      })
      .then(() => {
        setChangeStatusTenantDialog(false)
        toast.current.show({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Inquilino Actualizado',
          life: 3000,
        })
      })
      .catch((err) => console.log('Ocurrió un error con el fetch', err))
  }

  const hideDeleteTenantDialog = () => {
    setDeleteTenantDialog(false)
  }

  const hideDeleteTenantsDialog = () => {
    setDeleteTenantsDialog(false)
  }

  const confirmDeleteTenant = (tenant) => {
    setTenant(tenant)
    setDeleteTenantDialog(true)
  }

  const confirmDeleteSelected = () => {
    setDeleteTenantsDialog(true)
  }

  const hideChangeStatusTenantDialog = () => {
    setChangeStatusTenantDialog(false)
  }

  const confirmChangeStatusTenant = (tenant) => {
    setTenant(tenant)
    setChangeStatusTenantDialog(true)
  }

  const actionsTenant = (rowData) => {
    let icono = ''
    let text = ''
    if (rowData.status === '0') {
      icono = 'pi pi-eye'
      text = 'Activar Inquilino'
    } else if (rowData.status === '1') {
      icono = 'pi pi-eye-slash'
      text = 'Inactivar Inquilino'
    }
    return (
      <div className='actions'>
        <Button
          icon={`${icono}`}
          className='p-button-rounded p-button-warning mt-2 mx-2'
          onClick={() => confirmChangeStatusTenant(rowData)}
          title={`${text}`}
        />
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-danger mt-2 mx-2'
          onClick={() => confirmDeleteTenant(rowData)}
        />
      </div>
    )
  }

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className='my-2'>
          <Button
            label='Eliminar'
            icon='pi pi-trash'
            className='p-button-danger'
            onClick={confirmDeleteSelected}
            disabled={!selectedTentants || !selectedTentants.length}
          />
        </div>
      </React.Fragment>
    )
  }

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label='Exportar'
          icon='pi pi-upload'
          className='p-button-help'
        />
      </React.Fragment>
    )
  }

  const header = (
    <div className='flex flex-column md:flex-row md:justify-content-between md:align-items-center'>
      <h5 className='m-0'>Inquilinos</h5>
      <span className='block mt-2 md:mt-0 p-input-icon-left'>
        <i className='pi pi-search' />
        <InputText
          type='search'
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder='Buscar...'
        />
      </span>
    </div>
  )

  const deleteTenantDialogFooter = (
    <>
      <Button
        label='No'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideDeleteTenantDialog}
      />
      <Button
        label='Sí'
        icon='pi pi-check'
        className='p-button-text'
        onClick={deleteTenant}
      />
    </>
  )

  const deleteTenantsDialogFooter = (
    <>
      <Button
        label='No'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideDeleteTenantsDialog}
      />
      <Button
        label='Sí'
        icon='pi pi-check'
        className='p-button-text'
        onClick={deleteSelectedTenants}
      />
    </>
  )

  const changeStatusTenantDialogFooter = (
    <>
      <Button
        label='No'
        icon='pi pi-times'
        className='p-button-text'
        onClick={hideChangeStatusTenantDialog}
      />
      <Button
        label='Sí'
        icon='pi pi-check'
        className='p-button-text'
        onClick={cambiarStatusUser}
      />
    </>
  )

  const headerName = (
    <>
      <p>
        <FontAwesomeIcon icon={faUserAlt} style={{ color: '#C08135' }} /> Nombre
      </p>
    </>
  )

  const headerLastName = (
    <>
      <p>
        <FontAwesomeIcon icon={faUserAlt} style={{ color: '#D7A86E' }} />{' '}
        Apellidos
      </p>
    </>
  )

  const headerDNI = (
    <>
      <p>
        <FontAwesomeIcon icon={faIdCardAlt} style={{ color: '#C08135' }} />{' '}
        Identificación
      </p>
    </>
  )

  const headerEmail = (
    <>
      <p>
        <FontAwesomeIcon icon={faAt} style={{ color: '#D7A86E' }} /> Correo
        Electrónico
      </p>
    </>
  )

  const headerPhone = (
    <>
      <p>
        <FontAwesomeIcon icon={faPhoneAlt} style={{ color: '#C08135' }} />{' '}
        Teléfono
      </p>
    </>
  )

  const headerNumberHouse = (
    <>
      <p>
        <FontAwesomeIcon icon={faHashtag} style={{ color: '#C08135' }} /> Número
        de vivienda
      </p>
    </>
  )

  const headerStatus = (
    <>
      <p>
        {' '}
        <FontAwesomeIcon
          icon={faCircleQuestion}
          style={{ color: '#D7A86E' }}
        />{' '}
        Estado
      </p>
    </>
  )

  const statusBodyTemplate = (rowData) => {
    return (
      <>
        <span className={`status status-${rowData.status}`}>
          {rowData.status_text}
        </span>
      </>
    )
  }

  const onInputChange = (e, name) => {
    const value = (e.target && e.target.value) || ''
    let _tenant = { ...tenant }
    _tenant[`${name}`] = value
    setTenant(_tenant)
  }

  const handleHouses = (e) => {
    const getHouseNumber = e.target.value;
    setHouseNumber(getHouseNumber);
  }

  return (
    <div className='grid'>
      <div className='col-12'>
        <Toast ref={toast} />
        <div className='card'>
          <Toolbar
            className='mb-4'
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>
          <DataTable
            ref={dt}
            value={tenants}
            dataKey='_id'
            paginator
            rows={5}
            selection={selectedTentants}
            onSelectionChange={(e) => setSelectedTenants(e.value)}
            scrollable
            scrollHeight='400px'
            scrollDirection='both'
            header={header}
            rowsPerPageOptions={[5, 10, 25]}
            className='datatable-responsive mt-3'
            paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
            currentPageReportTemplate='Mostrando {first} a {last} de {totalRecords} inquilinos'
            globalFilter={globalFilter}
            emptyMessage='No hay inquilinos en esta comunidad registrados.'
          >
            <Column
              selectionMode='multiple'
              headerStyle={{ width: '3rem' }}
            ></Column>
            <Column
              field='name'
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
              field='last_name'
              sortable
              header={headerLastName}
              style={{
                flexGrow: 1,
                flexBasis: '160px',
                minWidth: '160px',
                wordBreak: 'break-word',
              }}
              alignFrozen='left'
            ></Column>
            <Column
              field='dni'
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
              field='email'
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
              field='phone'
              header={headerPhone}
              style={{
                flexGrow: 1,
                flexBasis: '80px',
                minWidth: '80px',
                wordBreak: 'break-word',
              }}
            ></Column>
            <Column
              field='number_house'
              sortable
              header={headerNumberHouse}
              style={{
                flexGrow: 1,
                flexBasis: '160px',
                minWidth: '160px',
                wordBreak: 'break-word',
                justifyContent: 'center',
              }}
            ></Column>
            <Column
              field='status'
              sortable
              header={headerStatus}
              body={statusBodyTemplate}
              style={{
                flexGrow: 1,
                flexBasis: '160px',
                minWidth: '160px',
                wordBreak: 'break-word',
              }}
            ></Column>
            <Column
              style={{ flexGrow: 1, flexBasis: '80px', minWidth: '80px' }}
              body={actionsTenant}
            ></Column>
          </DataTable>
          <Dialog
            visible={deleteTenantDialog}
            style={{ width: '450px' }}
            header='Confirmar'
            modal
            footer={deleteTenantDialogFooter}
            onHide={hideDeleteTenantDialog}
          >
            <div className='flex align-items-center justify-content-center'>
              <i
                className='pi pi-exclamation-triangle mr-3'
                style={{ fontSize: '2rem' }}
              />
              {tenant && (
                <span>
                  ¿Estás seguro que desea eliminar a <b>{tenant.name}</b>?
                </span>
              )}
            </div>
          </Dialog>
          <Dialog
            visible={deleteTenantsDialog}
            style={{ width: '450px' }}
            header='Confirmar'
            modal
            footer={deleteTenantsDialogFooter}
            onHide={hideDeleteTenantsDialog}
          >
            <div className='flex align-items-center justify-content-center'>
              <i
                className='pi pi-exclamation-triangle mr-3'
                style={{ fontSize: '2rem' }}
              />
              {selectedTentants && (
                <span>¿Está seguro eliminar los inquilinos seleccionados?</span>
              )}
            </div>
          </Dialog>
          <Dialog
            visible={changeStatusTenantDialog}
            style={{ width: '450px' }}
            header='Confirmar'
            modal
            footer={changeStatusTenantDialogFooter}
            onHide={hideChangeStatusTenantDialog}
          >
            <div className='flex align-items-center justify-content-center'>
              <i
                className='pi pi-exclamation-triangle mr-3'
                style={{ fontSize: '2rem' }}
              />
              {tenant && (
                <span>
                  ¿Estás seguro que desea cambiar estado a <b>{tenant.name}</b>?
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
                  <InputText type="text" id="name" value={tenant.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && tenant.name === '' })} />
                </div>
                {submitted && tenant.name === '' && <small className="p-invalid">Nombre es requerido.</small>}
              </div>
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="name">Apellido(s)</label>
              <div className="p-0 col-12 md:col-12">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                    <i className="pi pi-home"></i>
                  </span>
                  <InputText type="text" id="last_name" value={tenant.last_name} onChange={(e) => onInputChange(e, 'last_name')} required autoFocus className={classNames({ 'p-invalid': submitted && tenant.last_name === '' })} />
                </div>
                {submitted && tenant.last_name === '' && <small className="p-invalid">Apellidos son requeridos.</small>}
              </div>
            </div>
            <Button label='Registrar' onClick={registrarInquilino} />
            <Button label='testDialog' onClick={openDialog} />
            <div className="field col-12 md:col-6">
              <label htmlFor="name">Correo Electrónico</label>
              <div className="p-0 col-12 md:col-12">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                    <i className="pi pi-home"></i>
                  </span>
                  <InputText type='email' id="email" value={tenant.email} onChange={(e) => onInputChange(e, 'email')} required autoFocus className={classNames({ 'p-invalid': submitted && tenant.email === '' })} />
                </div>
                {submitted && tenant.email === '' && <small className="p-invalid">Correo electrónico es requerido.</small>}
              </div>
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="dni">Identificación</label>
              <div className="p-0 col-12 md:col-12">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                    <i className="pi pi-home"></i>
                  </span>
                  <InputText id="dni" value={tenant.dni} onChange={(e) => onInputChange(e, 'dni')} required autoFocus className={classNames({ 'p-invalid': submitted && tenant.dni === '' })} />
                </div>
                {submitted && tenant.email === '' && <small className="p-invalid">Identificación es requerida.</small>}
              </div>
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="phone">Número de teléfono</label>
              <div className="p-0 col-12 md:col-12">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                    <i className="pi pi-phone"></i>
                  </span>
                  <InputText id="phone" value={tenant.phone} onChange={(e) => onInputChange(e, 'phone')} type='tel' required autoFocus className={classNames({ 'p-invalid': submitted && tenant.phone === '' })} />
                </div>
                {submitted
                  && tenant.phone === ''
                  && <small className="p-invalid">Número de teléfono es requerido.</small>}
              </div>
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="number_house">Casa a asignar: </label>
              <div className="p-0 col-12 md:col-12">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                    <i className="pi pi-home"></i>
                  </span>
                  <Dropdown
                    placeholder="--Seleccione la Casa a Asignar--"
                    id="number_house"
                    value={houseNumber}
                    options={housesList}
                    onChange={handleHouses}
                    required autoFocus
                    className={
                      classNames({ 'p-invalid': submitted && !houseNumber })}
                  />
                </div>
                {submitted
                  && !houseNumber
                  && <small className="p-invalid">Casa es requerida.</small>}
              </div>
            </div>
            <Button label="Registrar" onClick={saveTenant} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Inquilinos)
