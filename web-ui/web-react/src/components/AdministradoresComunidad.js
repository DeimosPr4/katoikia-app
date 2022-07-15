import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const AdministradoresComunidad = () => {

    const [pokemones,setPokemones]=useState([]);
    const [urlFetch,setUrlFetch]=useState('http://localhost:4000/user/findAdminSistema/');
    async function fetchP(){
    let nombres=await fetch(urlFetch, {method:'GET'});
    let pokemonesRes= await nombres.json();
    setPokemones(pokemonesRes.message);
    console.log(pokemones);
   }
    useEffect(()=>{
      fetchP();
    },[])

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Administradores de comunidad</h5>
                    <DataTable value={pokemones}  scrollable scrollHeight="400px" scrollDirection="both" className="mt-3">
                        <Column field="name" header="Nombre" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                        <Column field="last_name" header="Apellidos" style={{ flexGrow: 1, flexBasis: '160px' }} alignFrozen="left"></Column>
                        <Column field="dni" header="Identificación" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                        <Column field="email" header="Correo electrónico" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                        <Column field="phone" header="Telefóno" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                    </DataTable>
                </div>
            </div>
        </div>

        
    )
}

export default React.memo(AdministradoresComunidad);