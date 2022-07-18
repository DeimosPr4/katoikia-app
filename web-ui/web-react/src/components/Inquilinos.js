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

  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>Inquilinos</h5>
          <DataTable value={listaInquilinos} scrollable scrollHeight="400px" scrollDirection="both" className="mt-3">
            <Column field="name" header="Nombre" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
            <Column field="last_name" header="Apellidos" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
            <Column field="dni" header="Identificación" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
            <Column field="email" header="Correo electrónico" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
            <Column field="phone" header="Telefóno" style={{ flexGrow: 1, flexBasis: '180px' }}></Column>
            <Column field="community_id" header="Comunidad" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
          </DataTable>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Inquilinos)