import React from 'react';
import { InputText } from 'primereact/inputtext';

const LogIn = () => {
  return (
    <div className="grid">
      <div className="col-12">
        <div className="card">
          <h5>Iniciar Sesión</h5>
          <div className="p-fluid formgrid grid">
            <div className="field col-12">
              <label htmlFor="nombre">Correo electrónico</label>
              <InputText id="nombre" type="text" />
            </div>
            <div className="field col-12 ">
              <label htmlFor="apellidos">Contraseña</label>
              <InputText id="apellidos" type="text" />
            </div>

            {/* <Button label="Registrar" onClick={registrarAdmin}></Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

/* image 1 */
