import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'

const Inquilinos = () => {
  const [communitiesList, setCommunitiesList] = useState([]);
  const communityIdList = communitiesList.map(community => community.id);
  async function getCommunites() {
    let response = await fetch('http://localhost:4000/community/allCommunities', { method: 'GET' });
    let list = await response.json();
    setCommunitiesList(list.message);
  }

  useEffect(() => {
    getCommunites();
  }, [])
  function registrarInquilino() {
    let data = {
      email: document.getElementById('correo_electronico').value,
      community_id: document.getElementById('numero_vivienda').value,
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
          <h5 className="card-header">Registrar Inquilino</h5>
          <div className="p-fluid formgrid grid">
            <div className="p-field col-12 md:col-6">
              <label htmlFor="correo_electronico">Correo electrónico</label>
              <InputText type="email" className="form-control" id="correo_electronico" />
            </div>
            <div className="p-field col-12 md:col-6">
              <label htmlFor="numero_vivienda">Número de Vivienda</label>
              <Dropdown id="numero_vivienda" value={communityIdList[0]} options={communitiesList} />
            </div>
          </div>
          <button type="button" className="btn btn-primary" onClick={registrarInquilino}>
            Registrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Inquilinos);