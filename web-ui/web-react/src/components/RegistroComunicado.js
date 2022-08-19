import React, { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { useCookies } from "react-cookie";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHomeAlt } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from 'primereact/dropdown';
import classNames from 'classnames';
const RegistroComunicado = () => {

    let emptyComunicado = {
        _id: null,
        post: '',
        user_id: '',
        community_id: ''
    };

    useEffect(()=>{
      listaComunis();
    },[])


    const [comunicado, setComunicado] = useState(emptyComunicado);
    const [comunicados,setComuicados]=useState([]);
    const [comunicadoId, setComunicadoId] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    const [cookies, setCookie] = useCookies();
    const [globalFilter, setGlobalFilter] = useState(null);

    async function listaComunis() {
      let comunicadosA=await fetch('http://localhost:4000/post/allPosts', {method:'GET'});
      let comunicadosRes= await comunicadosA.json();
      setComuicados(comunicadosRes.message);
      console.log(comunicadosRes.message);
     }

  
    const saveComunicado = () => {
        var data = {
            post: document.getElementById('txt_comunicado').value,
            user_id: cookies.id,
            community_id: cookies.community_id
          };
      
          fetch('http://localhost:4000/post/createPost', {
            cache: 'no-cache',
            method: 'POST',
            body: JSON.stringify(data),
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
                
              }
            )
            .catch(
              err => console.log('Ocurrió un error con el fetch', err)
            );
    }

    const header = (
      <React.Fragment>

          <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
              <h5 className="m-0">Comunicados de la comunidad</h5>
              <span className="block mt-2 md:mt-0 p-input-icon-left">
                  <i className="pi pi-search" />
                  <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
              </span>
          </div>
      </React.Fragment>
  );
  const headerPost = (
    <>
        <p>
            {' '}
            <FontAwesomeIcon icon={faCommentAlt} style={{ color: "#D7A86E" }} />{' '}
            Descripción comunicado</p>
    </>
  )

  const leftToolbarTemplate = () => {
    return (
        <React.Fragment>
            <div className="my-2">
                <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" />
            </div>
        </React.Fragment>
    )
}

const rightToolbarTemplate = () => {
    return (
        <React.Fragment>
            <Button label="Exportar" icon="pi pi-upload" className="p-button-help" />
        </React.Fragment>
    )
}

    return (
        <div className="grid">
            <div className="col-12">
                  <Toast ref={toast} />
                  <div className="card">
                      <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                      <DataTable ref={dt} value={comunicados} dataKey="_id" paginator rows={5}
                          scrollable scrollHeight="400px" scrollDirection="both" header={header}
                          rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive mt-3"
                          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                          currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} administradores de comunidades de viviendas"
                          globalFilter={globalFilter} emptyMessage="No hay administradores de comunidades registrados.">
                          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                          <Column field="post" sortable header={headerPost} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
        
                      </DataTable>
                  </div>
              </div>
            <div className="col-12">
                <div className="card">
                    <h5>Registro de un comunicado para la comunidad</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-12">
                            <label htmlFor="name">Contenido del comunicado</label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-pencil"></i>
                                    </span>
                                    <InputTextarea id="txt_comunicado" rows="4"/>
                                </div>
                            </div>
                        </div>
                        <Button label="Registrar" onClick={saveComunicado} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(RegistroComunicado);