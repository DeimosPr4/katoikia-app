import { React, useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const Inquilinos = () => {
  function registrarInquilino() {
    let data = {
      dni: document.getElementById('identificacion').value,
      name: document.getElementById('nombre').value,
      last_name: document.getElementById('apellidos').value,
      email: document.getElementById('correo_electronico').value,
      phone: document.getElementById('telefono').value,
      password: document.getElementById('correo_electronico').value,
      user_type: '1', //1 es admin
      status: '1',
    }
  }
}
