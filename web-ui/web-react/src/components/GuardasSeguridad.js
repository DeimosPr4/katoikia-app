import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const GuardasSeguridad = () => {

    const [pokemones,setPokemones]=useState([]);
    const [urlFetch,setUrlFetch]=useState('http://localhost:4000/user/findGuards/62be68215692582bbfd77134');
    async function fetchP(){
    let nombres=await fetch(urlFetch, {method:'GET'});
    let pokemonesRes= await nombres.json();
    setPokemones(pokemonesRes.message);
    console.log(pokemones);
   }
    useEffect(()=>{
      fetchP();
    },[])

    function registrarGuarda() {
        var data = {
            dni: document.getElementById('identificacion').value,
            name: document.getElementById('nombre').value,
            last_name: document.getElementById('apellidos').value,
            email: document.getElementById('correo_electronico').value,
            phone: document.getElementById('telefono').value,
            password: document.getElementById('correo_electronico').value,
            user_type: "4", //4 es guarda
            status: "1",
            community_id:"62be68215692582bbfd77134"
        };
        var data2={
            dni: "98765",
            name: "Danielito",
            last_name: "Rodriguez",
            email: "danirodriguez@gmail.com",
            phone: 84664515,
            password: "1203",
            user_type: "2",
            status: "4",
            community_id:"62be68215692582bbfd77134"
        }
        console.log(data2);

         fetch('http://localhost:4000/user/createGuard', {
            cache: 'no-cache',
            method: 'POST',
            mode:'cors',
            body: JSON.stringify(data2),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(
            function (response) {
                if (response.status != 201)
                    console.log('Ocurrió un error con el servicio: ' + response.status);
                else
                    return response.json();
            }
        )
        .then(
            function (response) {
                fetchP();
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
                    <h5>Guardas de seguridad</h5>
                    <DataTable value={pokemones}  scrollable scrollHeight="400px" scrollDirection="both" className="mt-3">
                        <Column field="name" header="Nombre" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                        <Column field="last_name" header="Apellidos" style={{ flexGrow: 1, flexBasis: '160px' }} alignFrozen="left"></Column>
                        <Column field="dni" header="Identificación" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                        <Column field="email" header="Correo electrónico" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                        <Column field="phone" header="Telefóno" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                    </DataTable>
                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>Registro de un guarda de seguridad</h5>
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
                            <InputText id="telefono" type="number" rows="4" />
                        </div>
                        <Button label="Registrar" onClick={registrarGuarda}></Button>
                    </div>
                </div>
            </div>
        </div>

        
    )
}

export default React.memo(GuardasSeguridad);