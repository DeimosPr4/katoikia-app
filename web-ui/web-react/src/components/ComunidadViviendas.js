import React, { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import classNames from 'classnames';


const Communities = () => {

    let emptyCommunity = {
        name: '',
        province: provinciaId,
        canton: cantonId,
        district: districtId,
        phone: '',
        num_houses: 0,
        status: 'activo',
        date_entry: new Date(),
        houses: [],
        quote: 0
    };


    const [communitiesList, setCommunitiesList] = useState([]);
    const [community, setCommunity] = useState(emptyCommunity);

    const [housesList, setHousesList] = useState([]);
    const [provincesList, setProvincesList] = useState([]);
    const [provinciaId, setProvinciaId] = useState(null);
    const [cantonsList, setCantonsList] = useState([]);
    const [cantonId, setCantonId] = useState(null);
    const [districtsList, setDistrictsList] = useState([]);
    const [districtId, setDistrictId] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);



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


  


    useEffect(() => {
        fillProvinces();

    }, [])

    useEffect(() => {
        fillCantons();
    }, [provinciaId])

    useEffect(() => {
        fillDistricts();
    }, [cantonId])

    async function getProvinces() {
        const response = await fetch('assets/demo/data/provincias.json', { method: 'GET' });
        return await response.json();
    }

    async function fillProvinces() {
        const getP = await getProvinces();
        setProvincesList(await getP);
    }

    async function getCantons() {
        const response = await fetch('assets/demo/data/cantones.json', { method: 'GET' });
        return await response.json();
    }

    async function fillCantons() {
        const resJson = await getCantons();
        const cantones = await resJson.filter(function (i, n) {
            return i.parentCode === provinciaId;
        });
        setCantonsList(await cantones);
    }

    async function getDistricts() {
        const response = await fetch('assets/demo/data/distritos.json', { method: 'GET' });
        return await response.json();
    }

    async function fillDistricts() {
        const resJson = await getDistricts();
        const cantones = await resJson.filter(function (i, n) {
            return i.parentCode === provinciaId;
        });
        setCantonsList(await cantones);
    }

    const handleProvinces = (event) => {
        const getprovinciaId = event.target.value;
        setProvinciaId(getprovinciaId);
    }

    const handleCanton = (event) => {
        const getCantonId = event.target.value;
        setCantonId(getCantonId);
    }

    const handleDistrict = (event) => {
        const getDistrictId = event.target.value;
        setDistrictId(getDistrictId);
    }

    async function getCommunites() {
        let response = await fetch('http://localhost:4000/community/allCommunities', { method: 'GET' });
        let resJson = await response.json();
        let pList = await getProvinces();
        let cList = await getCantons();
        let dList = await getDistricts();
         await resJson.message.map((item) => {
            item.province = pList.find(p => p.code === item.province).name
            item.canton = cList.find(p => p.code === item.canton).name
            item.district = dList.find(p => p.code === item.district).name
        })
        setCommunitiesList(await resJson.message);
    }

    useEffect(() => {
        getCommunites();

    }, [])


    const saveCommunity = () => {
        setSubmitted(true);

        if (community.name.trim()) {
            let _communities = [...communitiesList];
            let _community = { ...community };
            _community.province = provinciaId;
            _community.canton = cantonId;
            _community.district = districtId;



            for (let i = 0; i < _community.num_houses; i++){
                _community.houses.push({
                    number_house: i+1,
                    description: "es esta descripcion",
                })
            }


            _communities.push(_community);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Community Created', life: 3000 });

            setCommunitiesList(_communities);

            setProvinciaId('');
            setCantonId('');
            setDistrictId('');
            setCommunity(emptyCommunity);



           // console.log(houses)
            fetch('http://localhost:4000/community/createCommunity', {
                cache: 'no-cache',
                method: 'POST',
                body: JSON.stringify(_community),
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
            .catch(
                err => console.log('Ocurrió un error con el fetch', err)
            );
        }
        
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _community = { ...community };
        _community[`${name}`] = val;

        setCommunity(_community);
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
                <Toast ref={toast} />

                    <h5>Registro de comunidad de viviendas</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                        <label htmlFor="name">Nombre</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-home"></i>
                                    </span>
                                    <InputText id="name"  value={community.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !community.name } )} />
                                </div>
                                {submitted && community.name==='' && <small className="p-invalid">Nombre es requirido.</small>}
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="provinces">Provincia</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-map-marker"></i>
                                    </span>
                                    <Dropdown placeholder="--Seleccione Provincia--" value={provinciaId} options={p} onChange={handleProvinces} required autoFocus className={classNames({ 'p-invalid': submitted && !community.province } )} />
                                </div>
                                {submitted && !community.province && <small className="p-invalid">Provincia es requirido.</small>}
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="cantons">Cantón</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-map-marker"></i>
                                    </span>
                                    <Dropdown placeholder="--Seleccione Cantón--" value={cantonId} options={c} onChange={handleCanton} required  autoFocus className={classNames({ 'p-invalid': submitted && !community.canton } )}/>
                                </div>
                                {submitted && !community.canton && <small className="p-invalid">Cantón es requirido.</small>}
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="districts">Distrito</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-map-marker"></i>
                                    </span>
                                    <Dropdown placeholder="--Seleccione Distrito--" value={districtId} options={d} onChange={handleDistrict} required  autoFocus className={classNames({ 'p-invalid': submitted && !community.district } )}/>
                                </div>
                                {submitted && !community.district && <small className="p-invalid">Distrito es requirido.</small>}
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="telefono">Número de Teléfono</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-phone"></i>
                                    </span>
                                    <InputText id="phone"  value={community.phone} onChange={(e) => onInputChange(e, 'phone')} required autoFocus className={classNames({ 'p-invalid': submitted && !community.phone } )} />
                                </div>
                                {submitted && community.phone==='' && <small className="p-invalid">Número de teléfono es requirido.</small>}
                            </div>
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="numHouse">Numero de Viviendas</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-hashtag"></i>
                                    </span>
                                    <InputText id="num_houses"  value={community.num_houses} onChange={(e) => onInputChange(e, 'num_houses')} required autoFocus className={classNames({ 'p-invalid': submitted && community.num_houses < 1 } )} />
                                </div>
                                {submitted && community.num_houses < 1 && <small className="p-invalid">Número de viviendas es requirido y debe ser mayor que 0.</small>}
                            </div>
                        </div>
                        <div className="col-12 md:col-12 py-2">
                            <Button label="Registrar" icon="pi pi-check" onClick={saveCommunity}></Button>

                        </div>
                    </div>
                </div>
            </div>
        </div >


    )
}

export default React.memo(Communities);