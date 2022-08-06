import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import PropTypes from 'prop-types';


async function loginUser(credentials) {
  return fetch('http://localhost:4000/user/loginUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
  .then(data => data.message);
}


export default function LogIn({ setToken }) {

  let emptyLogin = {
    _id: null,
    name: '',
    email: '',
    password: '',
    status: '1',
    status_text: '',
  }


  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [login, setLogin] = useState(emptyLogin);


  

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    setToken(await token);
  }

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const errors = {
    email: "correo requerido",
    password: "contraseña requerida"
  };

  return (
    <div className="login-wrapper">

      <div className="grid form justify-content-center my-5">
        <div className="col-5">
          <div className="card" >
            <h5>Iniciar Sesión</h5>
            <form className="p-fluid formgrid grid" onSubmit={handleSubmit}>
              <div className="field col-12">
                <label htmlFor="email">Correo electrónico</label>
                <InputText id="email"
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                  placeholder='Correo electrónico' />
                {renderErrorMessage("email")}
              </div>
              <div className="field col-12 ">
                <label htmlFor="password">Contraseña</label>
                <InputText id="password"
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                  placeholder='Contraseña'
                />
                {renderErrorMessage("password")}
              </div>

              <Button label="Iniciar sesión" type="submit"></Button>
            </form>
          </div>
        </div>


        {/* <Button label="Registrar" onClick={registrarAdmin}></Button> */}
      </div>
    </div>
  );
};

LogIn.propTypes = {
  setToken: PropTypes.func.isRequired
}
