import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState, useRef } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
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



const Inquilinos = () => {
  const [communitiesList, setCommunitiesList] = useState([]);
  const communityIdList = communitiesList.map((community) => community.id);
  async function getCommunites() {
    let response = await fetch(
      'http://localhost:4000/community/allCommunities',
      { method: 'GET' },
    );
    let list = await response.json();
    setCommunitiesList(await list);
  }

  useEffect(() => {
    getCommunites();
  }, [])


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

  const cList = communitiesList.map((item) => ({
    label: item.name,
    value: item.id,
}))


const actionsAdmin = (rowData) => {
  return (
      <div className="actions">
          <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2" onClick={() => confirmDeleteAdminSystem(rowData)} />
      </div>
  );
}

const leftToolbarTemplate = () => {
  return (
      <React.Fragment>
          <div className="my-2">
              <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedAdministrators || !selectedAdministrators.length} />
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
      <h5 className="m-0">Administradores del sistema</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
      </span>
  </div>
);

const deleteAdminSystemDialogFooter = (
  <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteAdminSystemDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSysAdmin} />
  </>
);

const deleteAdminsSystemDialogFooter = (
  <>
      <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteAdminsSystemsDialog} />
      <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedAdminsSystem} />
  </>
);

const headerName = (
  <>
      <p> <FontAwesomeIcon icon={faUserAlt} style={{color: "#C08135"}} />  Nombre</p>
  </>
)

const headerLastName = (
  <>
      <p> <FontAwesomeIcon icon={faUserAlt} style={{color: "#D7A86E"}} />    Apellidos</p>
  </>
)

const headerDNI = (
  <>
      <p> <FontAwesomeIcon icon={faIdCardAlt} style={{color: "#C08135"}} />    Identificación</p>
  </>
)

const headerEmail = (
  <>
      <p> <FontAwesomeIcon icon={faAt} style={{color: "#D7A86E"}} />    Correo Electrónico</p>
  </>
)

const headerPhone = (
  <>
      <p> <FontAwesomeIcon icon={faPhoneAlt} style={{color: "#C08135"}} />   Teléfono</p>
  </>
)

const headerCommuntiy = (
  <>
      <p> <FontAwesomeIcon icon={faHome} style={{ color: "#D7A86E" }} />   Comunidad</p>
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
