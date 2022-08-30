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
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

const RegistroComunicado = () => {

  let emptyComunicado = {
    _id: null,
    post: '',
    user_id: '',
    community_id: ''
  };

  useEffect(() => {
    listaComunis();
  }, [])

  const [comunicado, setComunicado] = useState(emptyComunicado);
  const [comunicados, setComunicados] = useState([]);
  const [saveButtonLabel, setSaveButtonLabel] = useState('Registrar');
  const [comunicadoId, setComunicadoId] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);
  const [cookies, setCookie] = useCookies();
  const [globalFilter, setGlobalFilter] = useState(null);

  async function listaComunis() {
    let comunicadosResponse = await fetch('http://localhost:4000/post/allPosts', { method: 'GET' });
    const comunicadosJson = await comunicadosResponse.json();
    const comunicadosCommunity = comunicadosJson.message.filter((comunicado) => {
      return comunicado.community_id === cookies.community_id;
    })
    setComunicados(comunicadosCommunity);
    console.log(comunicadosCommunity);
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
    }).then((response) => {
      if (response.status != 201)
        console.log('Ocurrió un error con el servicio: ' + response.status);
      else
        return response.json();
    }).then((_response) => {

    }).catch(
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

  const actions = (rowData) => {
    return (
      <div className="actions">
        <Button
          icon='pi pi-trash'
          className='p-button-rounded p-button-danger mt-2 mx-2'
          onClick={() => confirmDelete(rowData)}
          title='Eliminar Inquilino'
        />
      </div>
    )
  }

  const confirmDelete = (post) => {
    setComunicado(post);
    setShowDeleteDialog(true);
  }

  const deleteDialogFooter = (
    <>
      <Button label="Cancelar" icon="pi pi-times" className="p-button-secondary" onClick={() => setShowDeleteDialog(false)} />
      <Button label="Eliminar" icon="pi pi-check" className="p-button-danger" onClick={() => deleteComunicado()} />
    </>
  );

  const deleteComunicado = () => {
    fetch(`http://localhost:4000/post/deletePost/${comunicado._id}`, {
      cache: 'no-cache',
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    }).then((response) => {
      if (response.status != 200)
        console.log('Ocurrió un error con el servicio: ' + response.status);
      else
        return response.json();
    }).then((_response) => {
      setShowDeleteDialog(false);
      listaComunis();
      setComunicado(emptyComunicado);
    }).catch(err => console.log('Ocurrió un error con el fetch', err));
  }

  return (
    <div className="grid">
      <div className="col-12">
        <Toast ref={toast} />
        <div className="card">
          <Dialog
            header="Eliminar comunicado"
            visible={showDeleteDialog}
            style={{ width: '450px' }}
            modal={true} onHide={() => setShowDeleteDialog(false)}
            footer={deleteDialogFooter}
          >
            <div className="flex align-items-center justify-content-center">
              <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
              {comunicado && <span>¿Está seguro que desea eliminar el aviso "<b>{comunicado.post}</b>"?</span>}
            </div>
          </Dialog>
          <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
          <DataTable ref={dt} value={comunicados} dataKey="_id" paginator rows={5}
            scrollable scrollHeight="400px" scrollDirection="both" header={header}
            rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive mt-3"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} administradores de comunidades de viviendas"
            globalFilter={globalFilter} emptyMessage="No hay administradores de comunidades registrados.">
            <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
            <Column field="post" sortable header={headerPost} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
            <Column
              style={{
                flexGrow: 1,
                flexBasis: '80px',
                minWidth: '80px'
              }}
              body={actions} />
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
                  <InputTextarea id="txt_comunicado" rows="4" />
                </div>
              </div>
            </div>
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              width: "100%"
            }}>
              <Button
                label={`${saveButtonLabel}`}
                onClick={() => saveComunicado()}
              />
              {saveButtonLabel === 'Actualizar' && (
                <Button
                  label="Cancelar"
                  onClick={cancelEdit}
                  className="p-button-danger" />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(RegistroComunicado);
