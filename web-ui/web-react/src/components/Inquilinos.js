import { React } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const Inquilinos = () => {
  function registrarInquilino() {
    let data = {
      email: document.getElementById('correo_electronico').value,
      user_type: '1', //1 es admin
      status: '1',
    }
  }
}
