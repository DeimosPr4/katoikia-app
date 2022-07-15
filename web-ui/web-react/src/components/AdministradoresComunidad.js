import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const AdministradoresComunidad = () => {

    const [listaAdmins,setListaAdmins]=useState([]);
    const [listaAdminComunidad,setListaAdminComunidad]=useState([]);

    async function listaAdmin(){
    let nombres=await fetch('http://localhost:4000/user/findAdminComunidad/', {method:'GET'});
    let nombresRes= await nombres.json();
    setListaAdmins(nombresRes.message);
   }

    async function listaComunidades(nombre){
    let nombres=await fetch('http://localhost:4000/community/findCommunityName/'+nombre, {method:'GET'});
    let nombresRes= await nombres.json();
    setListaAdminComunidad(nombresRes.message);
   }
   listaAdmins.map(function(administrador){
        listaComunidades(administrador.community_id);
        administrador.community_id=listaAdminComunidad.name;
   })
    useEffect(()=>{
        listaAdmin();
    },[])

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Administradores de comunidad</h5>
                    <DataTable value={listaAdmins}  scrollable scrollHeight="400px" scrollDirection="both" className="mt-3">
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

export default React.memo(AdministradoresComunidad);