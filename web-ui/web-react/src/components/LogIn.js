import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';

const LogIn = () => {

    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 


    const iniciarSesion = () =>{

    }

    

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Iniciar Sesión</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12">
                            <label htmlFor="correo">Correo electrónico</label>
                            <InputText id="correo" type="text" placeholder='Correo electrónico'/>
                        </div>
                        <div className="field col-12 ">
                            <label htmlFor="contrasenna">Contraseña</label>
                            <InputText id="contrasenna" type="text" placeholder='Contraseña'/>
                        </div>

                        {/* <Button label="Registrar" onClick={registrarAdmin}></Button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LogIn