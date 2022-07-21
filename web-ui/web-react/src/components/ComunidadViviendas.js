import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { LocationService } from '../service/LocationService';


const Communities = () => {
    const [communitiesList, setCommunitiesList] = useState([]);
    const [housesList, setHousesList] = useState([]);
    const [provincesList, setProvincesList] = useState([]);
    const [provinciaId, setProvinciaId] = useState();
    const [cantonsList, setCantonsList] = useState([]);
    const [cantonId, setCantonId] = useState(null);
    const [districtsList, setDistrictsList] = useState([]);
    const [districtId, setDistrictId] = useState(null);

    const p = provincesList.map((item) => ({
        label: item.name,
        value: item.code
    }))


    const c = cantonsList.map((item) => ({
        label: item.name,
        value: item.code,
        parent: item.parentCode
    }))

    const d = districtsList.map((item) => ({
        label: item.name,
        value: item.code,
        parent: item.parentCode
    }))


    async function getCommunites() {
        let response = await fetch('http://localhost:4000/community/allCommunities', { method: 'GET' });
        let list = await response.json();
        setCommunitiesList(list.message);
    }


    useEffect(() => {
        getCommunites();

    }, [])

    useEffect(() => {
        getProvinces();

    }, [])

    useEffect(() => {
        getCantons();
    }, [provinciaId])

    useEffect(() => {
        getDistricts();
    }, [cantonId])


    async function getProvinces() {
        const response = await fetch('assets/demo/data/provincias.json', { method: 'GET' });
        const getP = await response.json();
        setProvincesList(await getP)
    }

    const handleProvinces = (event) => {
        const getprovinciaId = event.target.value;
        setProvinciaId(getprovinciaId);
    }


    async function getCantons() {
        const response = await fetch('assets/demo/data/cantones.json', { method: 'GET' });
        const resJson = await response.json();
        const cantones = await resJson.filter(function (i, n) {
            return i.parentCode === provinciaId;
        });
        setCantonsList(await cantones);
    }

    const handleCanton = (event) => {
        const getCantonId = event.target.value;
        setCantonId(getCantonId);
    }

    async function getDistricts() {
        const response = await fetch('assets/demo/data/distritos.json', { method: 'GET' });
        const resJson = await response.json();
        const distrits = await resJson.filter(function (i, n) {
            return i.parentCode === cantonId;
        });
        setDistrictsList(await distrits);
    }


    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Comunidades de Viviendas</h5>
                    <DataTable value={communitiesList} scrollable scrollHeight="400px" scrollDirection="both" className="mt-3">
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
            <div className="col-12">
                <div className="card">
                    <h5>Registro de comunidad de viviendas</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="name">Nombre</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-khaki-dropdown">
                                        <i className="pi pi-home"></i>
                                    </span>
                                    <InputText id="name" type="text" />
                                </div>
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="districts">Provincia</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-khaki-dropdown">
                                        <i className="pi pi-map-marker"></i>
                                    </span>
                                    <Dropdown placeholder="--Seleccione Provincia--" value={provinciaId} options={p} onChange={handleProvinces} />
                                </div>
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="cantons">Cantón</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-khaki-dropdown">
                                        <i className="pi pi-map-marker"></i>
                                    </span>
                                    <Dropdown placeholder="--Seleccione Cantón--" value={cantonId} options={c} onChange={handleCanton} />
                                </div>
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="districts">Distrito</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-khaki-dropdown">
                                        <i className="pi pi-map-marker"></i>
                                    </span>
                                    <Dropdown placeholder="--Seleccione Distrito--" value={districtId} options={d} />
                                </div>
                            </div>

                        </div>

                        <div className="field col-12 md:col-6">
                            <label htmlFor="telefono">Teléfono</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-khaki-dropdown">
                                        <i className="pi pi-phone"></i>
                                    </span>
                                    <InputText id="telefono" type="text" rows="4" />

                                </div>
                            </div>
                        </div>

                        <div className="field col-12 md:col-6">
                            <label htmlFor="numHouse">Numero de Viviendas</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-khaki-dropdown">
                                        <i className="pi pi-hashtag"></i>
                                    </span>
                                    <InputText id="num" type="number" rows="4" />

                                </div>
                            </div>
                        </div>
                        <div className="col-12 md:col-12 py-2">
                            <Button label="Registrar" icon="pi pi-check"></Button>

                        </div>
                    </div>
                </div>
            </div>
        </div >


    )
}

export default React.memo(Communities);