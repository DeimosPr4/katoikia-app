import React, { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import classNames from 'classnames';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';

const Communities = () => {
  let emptyCommunity = {
    _id: null,
    name: '',
    province: provinciaId,
    canton: cantonId,
    district: districtId,
    phone: '',
    num_houses: 0,
    status: '1',
    date_entry: new Date(),
    houses: [],
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
  const [codeHouses, setCodeHouses] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [selectedCommunities, setSelectedCommunities] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [deleteCommunityDialog, setDeleteCommunityDialog] = useState(false);
  const [deleteCommunitiesDialog, setDeleteCommunitiesDialog] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);



  //para el perfil de la comunidad
  const [tenants, setTenants] = useState([]);

  const [communityDialog, setCommunityDialog] = useState(false);
  const [editcommunityDialog, setEditCommunityDialog] = useState(false);



  const p = provincesList.map((item) => ({
    label: item.name,
    value: item.code,
  }));

  const c = cantonsList.map((item) => ({
    label: item.name,
    value: item.code,
    parent: item.parentCode,
  }));

  const d = districtsList.map((item) => ({
    label: item.name,
    value: item.code,
    parent: item.parentCode,
  }));


  async function getProvinces() {
    const response = await fetch('assets/demo/data/provincias.json', {
      method: 'GET',
    });
    return await response.json();
  }

  async function fillProvinces() {
    const getP = await getProvinces();
    setProvincesList(await getP);
  }

  async function getCantons() {
    const response = await fetch('assets/demo/data/cantones.json', {
      method: 'GET',
    });
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
    const response = await fetch('assets/demo/data/distritos.json', {
      method: 'GET',
    });
    return await response.json();
  }

  async function fillDistricts() {
    const resJson = await getDistricts();
    const districts = await resJson.filter(function (i, n) {
      return i.parentCode === cantonId;
    });
    setDistrictsList(await districts);
  }


  useEffect(() => {
    fillProvinces();
  }, []);

  useEffect(() => {
    fillCantons();
  }, [provinciaId]);

  useEffect(() => {
    fillDistricts();
  }, [cantonId]);


  const handleProvinces = (event) => {
    const getprovinciaId = event.target.value;
    setProvinciaId(getprovinciaId);
  };

  const handleCanton = (event) => {
    const getCantonId = event.target.value;
    setCantonId(getCantonId);
  };

  const handleDistrict = (event) => {
    const getDistrictId = event.target.value;
    setDistrictId(getDistrictId);
  };

  const handleCodeHouses = (event) => {
    const getcodehouse = event.target.value;
    setCodeHouses(getcodehouse);
  };

  async function getCommunites() {
    let response = await fetch(
      'http://localhost:4000/community/allCommunities',
      { method: 'GET' },
    );
    let resJson = await response.json();
    let pList = await getProvinces();
    let cList = await getCantons();
    let dList = await getDistricts();
    await resJson.message.map((item) => {
      item.province = pList.find((p) => p.code === item.province).name;
      item.canton = cList.find((p) => p.code === item.canton).name;
      item.district = dList.find((p) => p.code === item.district).name;
      if (!item.id_admin) {
        item.name_admin = 'Sin Administrador';
      }
    });
    setCommunitiesList(await resJson.message);
  }

  useEffect(() => {
    getCommunites();
  }, []);

  async function tenantsList(id) {
    await fetch(`http://localhost:4000/user/findTenants/${id}`, { method: 'GET' })
      .then((response) => response.json())
      .then(data => data.message)
      .then(data => {
        setTenants(data)
      });
  }

  useEffect(() => {
    tenantsList(community._id);
  }, [])


  const saveCommunity = () => {
    if (
      community.name &&
      community.num_houses > 0 &&
      provinciaId &&
      cantonId &&
      districtId &&
      community.phone
    ) {
      let _communities = [...communitiesList];
      let _community = { ...community };
      _community.province = provinciaId;
      _community.canton = cantonId;
      _community.district = districtId;

      for (let i = 0; i < _community.num_houses; i++) {
        _community.houses.push({
          number_house: codeHouses + (i + 1),
        });
      }
      // console.log(houses)
      fetch('http://localhost:4000/community/createCommunity', {
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify(_community),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(function (response) {
          if (response.status != 201)
            console.log('Ocurrió un error con el servicio: ' + response.status);
          else return response.json();
        })
        .then(() => {
          _community.province = provincesList.find(
            (p) => p.code === _community.province,
          ).name;
          _community.canton = cantonsList.find(
            (p) => p.code === _community.canton,
          ).name;
          _community.district = districtsList.find(
            (p) => p.code === _community.district,
          ).name;

          _communities.push(_community);
          toast.current.show({
            severity: 'success',
            summary: 'Registro exitoso',
            detail: 'Comunidad de vivienda Creada',
            life: 3000,
          });

          setCommunitiesList(_communities);

          setProvinciaId('');
          setCantonId('');
          setDistrictId('');
          setCodeHouses('');

          setCommunity(emptyCommunity);
        })
        .catch((err) => console.log('Ocurrió un error con el fetch', err));
    } else {
      setSubmitted(true);
    }
  };



  function findNameTenant(tenant_id) {
    let name = '';
    if (tenant_id == '') {
      name = 'Sin inquilino';
    } else {
      let tenant = tenants.find(t => t._id == tenant_id )
      name = tenant['name'] + ' ' + tenant['last_name'];
    }
    console.log(name);
    return name;
  }

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || '';
    let _community = { ...community };
    _community[`${name}`] = val;

    setCommunity(_community);
  };

  const hideCommunityDialog = () => {
    setSubmitted(false);
    setCommunityDialog(false);
  };

  const hideDeleteCommunityDialog = () => {
    setDeleteCommunityDialog(false);
  };

  const hideDeleteCommunitiesDialog = () => {
    setDeleteCommunitiesDialog(false);
  };

  const confirmDeleteCommunity = (community) => {
    setCommunity(community);
    setDeleteCommunityDialog(true);
  };

  const confirmDeleteSelected = () => {
    setDeleteCommunitiesDialog(true);
  };


  const infoCommunity = async (community) => {
    await tenantsList(community._id);

    setCommunity({ ...community });
    setCommunityDialog(true);
  };

  const editCommunity = (community) => {
    setCommunity({ ...community });
    setEditCommunityDialog(true);
  };

  const deleteCommunity = () => {
    /*   fetch('http://localhost:4000/community/deleteCommunity/' + community._id, {
               cache: 'no-cache',
               method: 'DELETE',
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
                       
                       let _community = communities.filter(val => val._id !== community._id);
                       setCommunities(_community);
                       setDeleteCommunityDialog(false);
                       setCommunity(emptyCommunity);
                       toast.current.show({ severity: 'success', summary: 'Exito', detail: 'Comunidad de Viviendas Eliminada', life: 3000 });
                   }
               )
               .catch(
                   err => {
                       console.log('Ocurrió un error con el fetch', err)
                       toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Comunidad de Viviendas no se pudo eliminar', life: 3000 });
                   }
               ); 
        */
    let _community = communitiesList.filter((val) => val._id !== community._id);
    setCommunitiesList(_community);
    setDeleteCommunityDialog(false);
    setCommunity(emptyCommunity);
    toast.current.show({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Comunidad de Viviendas Eliminada',
      life: 3000,
    });
  };

  const deleteSelectedCommunities = () => {
    let _communities = communitiesList.filter(
      (val) => !selectedCommunities.includes(val),
    );
    /*  selectedCommunities.map((item) => {
             fetch('http://localhost:4000/user/deleteCommunity/' + item._id, {
                 cache: 'no-cache',
                 method: 'DELETE',
                 headers: {
                     'Content-Type': 'application/json'
                 }
             })
         })*/
    setCommunitiesList(_communities);
    setDeleteCommunitiesDialog(false);
    setSelectedCommunities(null);
    toast.current.show({
      severity: 'success',
      summary: 'Éxito',
      detail: 'Comunidades de Viviendas Eliminadas',
      life: 3000,
    });
  };

  const actionsCommunity = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon="pi pi-exclamation-circle"
          className="p-button-rounded p-button-primary mr-2"
          onClick={() => infoCommunity(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger mt-2"
          onClick={() => confirmDeleteCommunity(rowData)}
        />
      </div>
    );
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <Button
            label="Eliminar"
            icon="pi pi-trash"
            className="p-button-danger"
            onClick={confirmDeleteSelected}
            disabled={!selectedCommunities || !selectedCommunities.length}
          />
        </div>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label="Exportar"
          icon="pi pi-upload"
          className="p-button-help"
        />
      </React.Fragment>
    );
  };

  const header = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Comunidade de Viviendas</h5>
      <span className="block mt-2 md:mt-0 p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Buscar..."
        />
      </span>
    </div>
  );

  const communityDialogFooter = (
    <>
      <Button
        label="Cerrar"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideCommunityDialog}
      />

    </>
  );

  const deleteCommunityDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteCommunityDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteCommunity}
      />
    </>
  );

  const deleteCommutitiesDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteCommunitiesDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedCommunities}
      />
    </>
  );

  const headerName = (
    <>
      <p>
        {' '}
        <FontAwesomeIcon icon={faHome} style={{ color: '#C08135' }} /> Nombre
      </p>
    </>
  );

  const headerProvince = (
    <>
      <p>
        {' '}
        <FontAwesomeIcon
          icon={faMapLocationDot}
          style={{ color: '#D7A86E' }}
        />{' '}
        Provincia
      </p>
    </>
  );

  const headerCanton = (
    <>
      <p>
        {' '}
        <FontAwesomeIcon
          icon={faMapLocationDot}
          style={{ color: '#C08135' }}
        />{' '}
        Cantón
      </p>
    </>
  );

  const headerDistrict = (
    <>
      <p>
        {' '}
        <FontAwesomeIcon
          icon={faMapLocationDot}
          style={{ color: '#D7A86E' }}
        />{' '}
        Distrito
      </p>
    </>
  );

  const headerPhone = (
    <>
      <p>
        {' '}
        <FontAwesomeIcon icon={faPhoneAlt} style={{ color: '#C08135' }} />{' '}
        Teléfono
      </p>
    </>
  );

  const headerNumberHouses = (
    <>
      <p>
        {' '}
        <FontAwesomeIcon icon={faHashtag} style={{ color: '#D7A86E' }} />{' '}
        Número de viviendas
      </p>
    </>
  );

  const headerAdministrator = (
    <>
      <p>
        {' '}
        <FontAwesomeIcon icon={faPhoneAlt} style={{ color: '#C08135' }} />{' '}
        Administrador
      </p>
    </>
  );

  //ver perfil comunidad
  const headerTenant = (
    <>
      <p>
        {' '}
        <FontAwesomeIcon icon={faUserAlt} style={{ color: '#C08135' }} />{' '}
        Inquilinos
      </p>
        
    </>
  );


  const tenantsBodyTemplate = (rowData) => {
    let tenants = rowData.tenants;
    let name = findNameTenant(tenants.tenant_id);
    console.log(name);
    return (
      <>
          {name}
      </>
    )
  };

  return (
    <div className="grid">
      <div className="col-12">
        <Toast ref={toast} />
        <div className="card">
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          ></Toolbar>
          <DataTable
            ref={dt}
            value={communitiesList}
            dataKey="_id"
            paginator
            rows={5}
            selection={selectedCommunities}
            onSelectionChange={(e) => setSelectedCommunities(e.value)}
            scrollable
            scrollHeight="400px"
            scrollDirection="both"
            header={header}
            rowsPerPageOptions={[5, 10, 25]}
            className="datatable-responsive mt-3"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} comunidades de viviendas"
            globalFilter={globalFilter}
            emptyMessage="No hay comunidades de viviendas registrados."
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: '3rem' }}
            ></Column>
            <Column
              field="name"
              sortable
              header={headerName}
              style={{ flexGrow: 1, flexBasis: '160px' }}
            ></Column>
            <Column
              field="province"
              sortable
              header={headerProvince}
              style={{ flexGrow: 1, flexBasis: '160px' }}
            ></Column>
            <Column
              field="canton"
              sortable
              header={headerCanton}
              style={{ flexGrow: 1, flexBasis: '160px' }}
            ></Column>
            <Column
              field="district"
              sortable
              header={headerDistrict}
              style={{ flexGrow: 1, flexBasis: '160px' }}
            ></Column>
            <Column
              field="phone"
              header={headerPhone}
              style={{ flexGrow: 1, flexBasis: '180px' }}
            ></Column>
            <Column
              field="num_houses"
              sortable
              header={headerNumberHouses}
              style={{ flexGrow: 1, flexBasis: '180px' }}
            ></Column>
            <Column
              field="name_admin"
              sortable
              header={headerAdministrator}
              style={{ flexGrow: 1, flexBasis: '180px' }}
            ></Column>
            <Column
             body={actionsCommunity}
             style={{ flexGrow: 1, flexBasis: '180px' }}
             ></Column>
          </DataTable>


          <Dialog
            visible={communityDialog}
            style={{ width: '650px' }}
            header="Información de la Comunidad"
            modal
            className="p-fluid"
            footer={communityDialogFooter}
            onHide={hideCommunityDialog}>
            <div className='container text-center'>
              <div className='row my-4'>
                <div className=" col-12 md:col-12">
                  <p>Nombre</p>
                  <div className="p-0 col-2  md:col-2" style={{ margin: '0 auto' }}>
                    <div className="p-inputgroup align-items-center justify-content-evenly">
                      <i className="pi pi-home icon-khaki"></i>
                      <p>{community.name}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row my-5'>
                <div className=" col-6 md:col-6">
                  <p>Administrador</p>
                  <div className="p-0 col-6  md:col-6" style={{ margin: '0 auto' }}>
                    <div className="p-inputgroup align-items-center justify-content-evenly">
                      <i className="pi pi-user icon-khaki"></i>
                      <p>{community.name_admin}</p>
                    </div>

                  </div>
                </div>
                <div className=" col-6 md:col-6">
                  <p>Teléfono Administrativo</p>
                  <div className="p-0 col-6  md:col-6" style={{ margin: '0 auto' }}>
                    <div className="p-inputgroup align-items-center justify-content-evenly">
                      <i className="pi pi-phone icon-khaki"></i>
                      <p>{community.phone}</p>
                    </div>

                  </div>
                </div>
              </div>

              <div className='row my-5'>
                <div className=" col-4 col-md-4 md:col-4">
                  <p>Provincia</p>
                  <div className="p-0 col-10 md:col-10">
                    <div className="p-inputgroup align-items-center justify-content-evenly">
                      <i className="pi pi-map-marker icon-khaki"></i>
                      <p>{community.province}</p>
                    </div>

                  </div>
                </div>
                <div className=" col-4 md:col-4">
                  <p>Cantón</p>
                  <div className="p-0 col-10 md:col-10">
                    <div className="p-inputgroup align-items-center justify-content-evenly">
                      <i className="pi pi-map-marker icon-khaki"></i>
                      <p>{community.canton}</p>
                    </div>

                  </div>
                </div>
                <div className=" col-4 md:col-4">
                  <p>Distrito</p>
                  <div className="p-0 col-10 md:col-10">
                    <div className="p-inputgroup align-items-center justify-content-evenly">
                      <i className="pi pi-map-marker icon-khaki"></i>
                      <p>{community.district}</p>
                    </div>

                  </div>
                </div>
              </div>
              <div className='row my-5'>
                <div className=" col-12 md:col-12">
                  <p>Número de Viviendas</p>
                  <div className="p-0 col-2  md:col-2" style={{ margin: '0 auto' }}>
                    <div className="p-inputgroup justify-content-evenly">
                      <i className="pi pi-hashtag icon-khaki"></i>
                      <p>{community.num_houses}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row my-5'>
                <div className=" col-12 md:col-12">


                  <p> <i className="pi pi-home icon-khaki"></i>  Viviendas</p>
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

          </Dialog>

          <Dialog
            visible={deleteCommunityDialog}
            style={{ width: '450px' }}
            header="Confirmar"
            modal
            footer={deleteCommunityDialogFooter}
            onHide={hideDeleteCommunityDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: '2rem' }}
              />
              {community && (
                <span>
                  ¿Estás seguro que desea eliminar a <b>{community.name}</b>?
                </span>
              )}
            </div>
          </Dialog>
          <Dialog
            visible={deleteCommunitiesDialog}
            style={{ width: '450px' }}
            header="Confirmar"
            modal
            footer={deleteCommutitiesDialogFooter}
            onHide={hideDeleteCommunitiesDialog}
          >
            <div className="flex align-items-center justify-content-center">
              <i
                className="pi pi-exclamation-triangle mr-3"
                style={{ fontSize: '2rem' }}
              />
              {selectedCommunities && (
                <span>
                  ¿Está seguro eliminar los adminsitradores del sistema
                  seleccionados?
                </span>
              )}
            </div>
          </Dialog>
        </div>
      </div>
      <div className="col-12">
        <div className="card">
          <h5>Registro de comunidad de viviendas</h5>
          <div className="p-fluid formgrid grid">
            <div className="field col-12 md:col-12">
              <label htmlFor="name">Nombre</label>
              <div className="p-0 col-12 md:col-12">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                    <i className="pi pi-home"></i>
                  </span>
                  <InputText
                    id="name"
                    value={community.name}
                    onChange={(e) => onInputChange(e, 'name')}
                    required
                    autoFocus
                    className={classNames({
                      'p-invalid': submitted && community.name === '',
                    })}
                  />
                </div>
                {submitted && community.name === '' && (
                  <small className="p-invalid">Nombre es requirido.</small>
                )}
              </div>
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="provinces">Provincia</label>
              <div className="p-0 col-12 md:col-12">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                    <i className="pi pi-map-marker"></i>
                  </span>
                  <Dropdown
                    placeholder="--Seleccione Provincia--"
                    value={provinciaId}
                    options={p}
                    onChange={handleProvinces}
                    required
                    autoFocus
                    className={classNames({
                      'p-invalid': submitted && !provinciaId,
                    })}
                  />
                </div>
                {submitted && !provinciaId && (
                  <small className="p-invalid">Provincia es requirido.</small>
                )}
              </div>
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="cantons">Cantón</label>
              <div className="p-0 col-12 md:col-12">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                    <i className="pi pi-map-marker"></i>
                  </span>
                  <Dropdown
                    placeholder="--Seleccione Cantón--"
                    value={cantonId}
                    options={c}
                    onChange={handleCanton}
                    required
                    autoFocus
                    className={classNames({
                      'p-invalid': submitted && !cantonId,
                    })}
                  />
                </div>
                {submitted && !cantonId && (
                  <small className="p-invalid">Cantón es requirido.</small>
                )}
              </div>
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="districts">Distrito</label>
              <div className="p-0 col-12 md:col-12">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                    <i className="pi pi-map-marker"></i>
                  </span>
                  <Dropdown
                    placeholder="--Seleccione Distrito--"
                    value={districtId}
                    options={d}
                    onChange={handleDistrict}
                    required
                    autoFocus
                    className={classNames({
                      'p-invalid': submitted && !districtId,
                    })}
                  />
                </div>
                {submitted && !districtId && (
                  <small className="p-invalid">Distrito es requirido.</small>
                )}
              </div>
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="telefono">Número de Teléfono</label>
              <div className="p-0 col-12 md:col-12">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                    <i className="pi pi-phone"></i>
                  </span>
                  <InputText
                    id="phone"
                    value={community.phone}
                    onChange={(e) => onInputChange(e, 'phone')}
                    required
                    autoFocus
                    className={classNames({
                      'p-invalid': submitted && community.phone === '',
                    })}
                  />
                </div>
                {submitted && community.phone === '' && (
                  <small className="p-invalid">
                    Número de teléfono es requirido.
                  </small>
                )}
              </div>
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="numHouse">Numero de Viviendas</label>
              <div className="p-0 col-12 md:col-12">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                    <i className="pi pi-hashtag"></i>
                  </span>
                  <InputText
                    id="num_houses"
                    value={community.num_houses}
                    onChange={(e) => onInputChange(e, 'num_houses')}
                    required
                    autoFocus
                    className={classNames({
                      'p-invalid': submitted && community.num_houses < 1,
                    })}
                  />
                </div>
                {submitted && community.num_houses < 1 && (
                  <small className="p-invalid">
                    Número de viviendas es requirido y debe ser mayor que 0.
                  </small>
                )}
              </div>
            </div>
            <div className="field col-12 md:col-6">
              <label htmlFor="numHouse">
                Ingrese el prefijo para el código de las viviendas
              </label>
              <div className="p-0 col-12 md:col-12">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                    <i className="pi pi-hashtag"></i>
                  </span>
                  <InputText
                    id="code_houses"
                    value={codeHouses}
                    onChange={handleCodeHouses}
                    autoFocus
                    className={classNames({
                      'p-invalid': submitted && codeHouses === '',
                    })}
                  />
                </div>
                {submitted && codeHouses === '' && (
                  <small className="p-invalid">
                    El código para las viviendas es requirido.
                  </small>
                )}
              </div>
            </div>
            <div className="col-12 md:col-12 py-2">
              <Button
                label="Registrar"
                icon="pi pi-check"
                onClick={saveCommunity}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Communities);
