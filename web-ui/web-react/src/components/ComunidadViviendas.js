import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


const Communities = () => {
    const [communitiesList, setCommunitiesList] = useState([]);
    const [housesList, setHousesList] = useState([]);


    async function getCommunites() {
        let response = await fetch('http://localhost:4000/community/allCommunities', { method: 'GET' });
        let list = await response.json();
        setCommunitiesList(list.message);
    }
    
    useEffect(() => {
        getCommunites();
    }, [])


    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Comunidades de Viviendas</h5>
                    <DataTable value={communitiesList}  scrollable scrollHeight="400px" scrollDirection="both" className="mt-3">
                        <Column field="name" header="Nombre" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                        <Column field="province" header="Provincia" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                        <Column field="canton" header="Cantón" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                        <Column field="district" header="Distrito" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                        <Column field="phone" header="Telefóno" style={{ flexGrow: 1, flexBasis: '180px' }}></Column>
                        <Column field="num_houses" header="Número de viviendas" style={{ flexGrow: 1, flexBasis: '180px' }}></Column>
                        <Column field="quote" header="Cuota mensual" style={{ flexGrow: 1, flexBasis: '180px' }}></Column>
                        <Column field="name_admin" header="Administrador" style={{ flexGrow: 1, flexBasis: '180px' }}></Column>
                    </DataTable>
                </div>
            </div>
        </div>

        
)
}

export default React.memo(Communities);