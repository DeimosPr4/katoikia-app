import { React } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const Inquilinos = () => {
  function registrarInquilino() {
    let data = {
      email: document.getElementById('correo_electronico').value,
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
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5 className="card-header">Registrar inquilino</h5>
          <div className="card-body">
            <div className="p-fluid formgrid grid">
              <div className="p-field col-12 md:col-6">
                <label htmlFor="correo_electronico">Correo electrónico</label>
                <input type="email" className="form-control" id="correo_electronico" />
              </div>
              <div className="p-field col-12 md:col-6">
                <label htmlFor="numero_vivienda">Número de Vivienda</label>
                <input type="text" className="form-control" id="numero_vivienda" />
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={registrarInquilino()}>
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Inquilinos)