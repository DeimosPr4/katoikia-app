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
                    <h5>Administradores de comunidad</h5>
                    <DataTable value={communitiesList}  scrollable scrollHeight="400px" scrollDirection="both" className="mt-3">
                        <Column field="name" header="Nombre" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                        <Column field="last_name" header="Provincia" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                        <Column field="dni" header="Cantón" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                        <Column field="email" header="Distrito" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                        <Column field="phone" header="Telefóno" style={{ flexGrow: 1, flexBasis: '180px' }}></Column>
                    </DataTable>
                </div>
            </div>
        </div>

        
)
}

export default React.memo(Communities);