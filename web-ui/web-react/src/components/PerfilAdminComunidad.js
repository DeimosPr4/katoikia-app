import React, { useEffect, useState, useRef } from 'react';
import { useCookies } from "react-cookie";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

const PerfilAdminComunidad = () => {

    let emptyAdminCommunity = {
        _id: null,
        dni: '',
        name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        community_id: '',
        community_name: '',
        user_type: '2',
        date_entry: new Date(),
        status: '1',
        status_text: '',
    };

    let emptyCommunity = {
        _id: null,
        name: '',
        province: '',
        canton: '',
        district: '',
        phone: '',
        num_houses: 0,
        status: '1',
        status_text: '',
        date_entry: new Date(),
        houses: [],
    };

    const [admin, setAdmin] = useState(emptyAdminCommunity);
    const [community, setCommunity] = useState(emptyCommunity);
    const [cookies, setCookie] = useCookies();
    const [globalFilter, setGlobalFilter] = useState(null);
    //para el perfil de la comunidad
    const [tenants, setTenants] = useState([]);
    const [commonAreaList, setCommonAreaList] = useState([]);
    const [provincesList, setProvincesList] = useState([]);
    const [cantonsList, setCantonsList] = useState([]);
    const [districtsList, setDistrictsList] = useState([]);

    async function getProvinces() {
        const response = await fetch('assets/demo/data/provincias.json', {
          method: 'GET',
        });
        return await response.json();
      }
    
    
      async function getCantons() {
        const response = await fetch('assets/demo/data/cantones.json', {
          method: 'GET',
        });
        return await response.json();
      }
    
    
      async function getDistricts() {
        const response = await fetch('assets/demo/data/distritos.json', {
          method: 'GET',
        });
        return await response.json();
      }
    
    
     

      
    async function getAdmin() {
        await fetch('http://localhost:4000/user/findUserById/' + cookies.id, { method: 'GET' })
            .then((response) => response.json())
            .then(data => {
                let item = data.message;
                setAdmin(item);
                if (item.community_id || item.community_id != '') {
                    getCommunity()
                } else {
                    item.community_name = "Sin Comunidad Asignada";
                }

            })
    }


    useEffect(() => {
        getAdmin();
    }, [])

    async function getCommunity() {
        let pList = await getProvinces();
        let cList = await getCantons();
        let dList = await getDistricts();
        await fetch(`http://localhost:4000/community/findCommunityName/${cookies.community_id}`, { method: 'GET' })
            .then((response2) => response2.json())
            .then(data => data.message)
            .then(data => {
                data.province = pList.find((p) => p.code === data.province).name;
                data.canton = cList.find((p) => p.code === data.canton).name;
                data.district = dList.find((p) => p.code === data.district).name;
                setCommunity(data)
            })
    }

    useEffect(() => {
        getCommunity();
    }, [])

    async function tenantsList(id) {
        await fetch(`http://localhost:4000/user/findTenants/${id}`, { method: 'GET' })
            .then((response) => response.json())
            .then(data => data.message)
            .then(data => {
                data = data.filter(
                    (val) => val.status != -1,
                )
                setTenants(data)
            });
    }

    useEffect(() => {
        tenantsList(community._id);
    }, [])


   
    function findNameTenant(tenant_id) {
        let name = '';
        if (tenant_id == '') {
            name = 'Sin inquilino';
        } else {
            let tenant = tenants.find(t => t._id == tenant_id)
            name = tenant['name'] + ' ' + tenant['last_name'];
        }
        return name;
    }

    const headerNumberHouses = (
        <>
            <p>
                {' '}
                <FontAwesomeIcon icon={faHashtag} style={{ color: '#D7A86E' }} />{' '}
                Código de vivienda
            </p>
        </>
    );

    const headerTenant = (
        <>
            <p>
                {' '}
                <FontAwesomeIcon icon={faUserAlt} style={{ color: '#C08135' }} />{' '}
                Inquilino
            </p>

        </>
    );

    const tenantsBodyTemplate = (rowData) => {
        let tenants = rowData.tenants;
        let name = 'Sin inquilino';
        if (rowData.tenants) {
            name = findNameTenant(tenants.tenant_id);
        }

        return (
            <>
                {name}
            </>
        )
    }

    return (
        <>
            <div className="grid justify-content-center">

                <div className="col-6" >
                    <div className="card">
                        <div className='container text-center'>
                            <div className='row my-4'>
                                <div className=" col-12 md:col-12">
                                    <h3>Información Básica</h3>
                                </div>
                                <div className=" col-6 md:col-6">
                                    <i className="pi pi-home icon-khaki"></i>
                                    <p><strong>Nombre Completo</strong></p>
                                    <div className="p-0 col-12  md:col-12" style={{ margin: '0 auto' }}>
                                        <div className="p-inputgroup justify-content-evenly">
                                            <p>{admin.name + ' ' + admin.last_name}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className=" col-6 md:col-6">
                                    <i className="pi pi-id-card icon-khaki"></i>
                                    <p><strong>Identificación</strong></p>
                                    <div className="p-0 col-12  md:col-12" style={{ margin: '0 auto' }}>
                                        <div className="p-inputgroup  justify-content-evenly">
                                            <p>{admin.dni}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row my-4'>
                                <div className=" col-12 md:col-12">
                                    <h3>Contacto</h3>
                                </div>
                                <div className=" col-6 md:col-6">
                                    <i className="pi pi-at icon-khaki"></i>
                                    <p><strong>Correo Electrónico</strong></p>
                                    <div className="p-0 col-12  md:col-12" style={{ margin: '0 auto' }}>
                                        <div className="p-inputgroup  justify-content-evenly">
                                            <p>{admin.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className=" col-6 md:col-6">
                                    <i className="pi pi-phone icon-khaki"></i>
                                    <p><strong>Número de teléfono</strong></p>
                                    <div className="p-0 col-12  md:col-12" style={{ margin: '0 auto' }}>
                                        <div className="p-inputgroup  justify-content-evenly">
                                            <p>{admin.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='col-6'>
                    {community && (
                        <div className="card">
                            <div className='container text-center'>
                                <div className='row my-4'>
                                    <div className=" col-12 md:col-12">
                                        <h3>Comunidad Asignada</h3>
                                    </div>
                                    <div className=" col-4 md:col-4">
                                        <i className="pi pi-home icon-khaki"></i>
                                        <p><strong>Nombre</strong></p>
                                        <div className="p-0 col-12  md:col-12" style={{ margin: '0 auto' }}>
                                            <div className="p-inputgroup align-items-center justify-content-evenly">
                                                <p>{community.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-4 md:col-4">
                                        <i className="pi pi-phone icon-khaki"></i>
                                        <p><strong>Teléfono Administrativo</strong></p>

                                        <div className="p-0 col-12  md:col-12" style={{ margin: '0 auto' }}>
                                            <div className="p-inputgroup align-items-center justify-content-evenly">
                                                <p>{community.phone}</p>
                                            </div>

                                        </div>
                                    </div>
                                     <div className=" col-4 col-md-4 md:col-4">
                                        <i className="pi pi-map-marker icon-khaki"></i>

                                        <p><strong>Ubicación</strong></p>
                                        <div className="p-0 col-10 md:col-10">
                                            <div className="p-inputgroup align-items-center justify-content-evenly">
                                                <p>{community.province}, {community.canton}, {community.district}</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                
                                <div className='row my-5'>
                                    <div className=" col-12 md:col-12">
                                        <h3>Viviendas de la Comunidad</h3>
                                    </div>
                                    <div className=" col-12 md:col-12">
                                        <i className="pi pi-hashtag icon-khaki"></i>

                                        <p><strong>Cantidad de Viviendas</strong></p>
                                        <div className="p-0 col-2  md:col-2" style={{ margin: '0 auto' }}>
                                            <div className="p-inputgroup justify-content-evenly">
                                                <p>{community.num_houses}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>


            </div>
            <div className='grid justify-content-center'>
               
                <div className='col-6'>
                    {community && (
                        <div className="card">
                            <div className='container text-center'>
                               
                                <div className='row my-5'>
                                    <div className=" col-12 md:col-12">


                                        <h3> Viviendas</h3>
                                        <div className="p-0 col-12  md:col-12" style={{ margin: '0 auto' }}>
                                            <div className="p-inputgroup justify-content-evenly">
                                                <DataTable
                                                    value={community.houses}
                                                    paginator
                                                    rows={5}
                                                    scrollable
                                                    scrollHeight="200px"
                                                    scrollDirection="both"
                                                    rowsPerPageOptions={[5, 10, 25]}
                                                    className="datatable-responsive mt-3"
                                                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                                                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} viviendas"
                                                    globalFilter={globalFilter}
                                                >
                                                    <Column
                                                        field="number_house"
                                                        header={headerNumberHouses}
                                                        style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px' }}
                                                    ></Column>
                                                    <Column
                                                        field="tenants"
                                                        header={headerTenant}
                                                        body={tenantsBodyTemplate}
                                                        style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px' }}
                                                    ></Column>
                                                </DataTable>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>


    )
}

export default React.memo(PerfilAdminComunidad)