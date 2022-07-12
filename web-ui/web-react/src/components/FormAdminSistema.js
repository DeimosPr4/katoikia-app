import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const FormAdminSistema = () => {

    function registrarAdmin() {
        var data = {
            dni: "12687",
            name: "hola",
            last_name: "buuu",
            email: "tmora4c@ucenfotec.ac.cr",
            phone: 84664515,
            password: "1203",
            user_type: "1",
            status: "2"
        };
        console.log(data);
         fetch('http://localhost:4000/user/createAdminSystem/', {
            cache: 'no-cache',
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(
            function (response) {
                if (response.status != 200)
                    console.log('Ocurrió un error con el servicio: ' + response.status);
                else
                    return response.json();
            }
        )
        .then(
            function (response) {
                console.log(response);
            }
        )
        .catch(
            err => console.log('Ocurrió un error con el fetch', err)
        );
    }

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Registro de un administrador del sistema</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="nombre">Nombre</label>
                            <InputText id="nombre" type="text" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="apellidos">Apellidos</label>
                            <InputText id="apellidos" type="text" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="correo_electronico">Correo electrónico</label>
                            <InputText id="correo_electronico" type="text" />
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="identificacion">Identificación</label>
                            <InputText id="identificacion" type="text" />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="telefono">Teléfono</label>
                            <InputText id="telefono" type="text" rows="4" />
                        </div>
                        <Button label="Registrar" onClick={registrarAdmin}></Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default React.memo(FormAdminSistema);
