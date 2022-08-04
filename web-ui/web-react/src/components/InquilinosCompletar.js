import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import React, { useState, useRef } from 'react'
import { Dropdown } from 'primereact/dropdown'

import { useCookies } from 'react-cookie'

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
    status: '1',
    status_text: '',
  }

  const [tenant, setTenant] = useState(emptyTenant)
  const [selectedTentants, setSelectedTenants] = useState(null)
  const [globalFilter, setGlobalFilter] = useState(null)
  const [deleteTenantDialog, setDeleteTenantDialog] = useState(false)
  const [deleteTenantsDialog, setDeleteTenantsDialog] = useState(false)
  const [communitiesList, setCommunitiesList] = useState([])
  const [communityId, setCommunityId] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [cookies, setCookie] = useCookies()
  const [changeStatusTenantDialog, setChangeStatusTenantDialog] =
    useState(false)

  function finalizarRegistro() {
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
    }

    fetch('http://localhost:3000/api/createUser', {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.ok) {
        alert('Inquilino registrado correctamente')
      } else {
        alert('Error al registrar inquilino')
      }
    })
  }

  return (
    <div className='grid'>
      <div className='col-12'>
        <div className='card'>
          <h5 className='card-header'>Finalizar Registro</h5>
          <div className='p-fluid formgrid grid'>
            <div className='field col-12 md:col-6'>
              <label htmlFor='nombre'>Nombre</label>
              <InputText type='text' className='form-control' id='nombre' />
            </div>
            <div className='field col-12 md:col-6'>
              <label htmlFor='apellidos'>Apellido(s)</label>
              <InputText type='text' className='form-control' id='apellidos' />
            </div>
            <div className='field col-12 md:col-6'>
              <label htmlFor='identificacion'>Identificación</label>
              <InputText
                type='text'
                className='form-control'
                id='identificacion'
              />
            </div>
            <div className='field col-12 md:col-6'>
              <label htmlFor='correo_electronico'>Correo electrónico</label>
              <InputText
                type='email'
                className='form-control'
                id='correo_electronico'
              />
            </div>
            <div className='field col-12 md:col-6'>
              <label htmlFor='password'>Password</label>
              <InputText
                type='password'
                className='form-control'
                id='password'
              />
            </div>
            <Button label='Registrar' onClick={finalizarRegistro} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Inquilinos)
