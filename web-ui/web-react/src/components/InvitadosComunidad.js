import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { Toast } from 'primereact/toast'
import { Toolbar } from 'primereact/toolbar'
import { useCookies } from 'react-cookie';

const InvitadosComunidad = () => {
  const [cookies] = useCookies();
  const [globalFilter, setGlobalFilter] = useState(null);
  const [invitados, setInvitados] = useState([]);
  const [selectedInvitados, setSelectedInvitados] = useState([]);
  const tableRef = useRef(null);
  const toastRef = useRef(null);

  const getInvitados = async () => {
    console.log(`${process.env.REACT_APP_API_URL}`);
    await fetch(`${process.env.REACT_APP_API_URL}/guest/allGuests`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => data.message)
      .then(data => {
        data = data.filter(invitado =>
          invitado.community === cookies.community_id);
        setInvitados(data);
      })
  }
  
  useEffect(() => {
  getInvitados();
  }, [invitados]);

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className='my-2'>
          <p>Boton Eliminar aqui</p>
        </div>
      </React.Fragment>
    )
  }

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <Button
          label='Exportar'
          icon='pi pi-upload'
          className='p-button-help'
        />
      </React.Fragment>
    )
  }

  const headerTemplate = (
    <div className='flex flex-column md:flex-row md:justify-content-between md:align-items-center'>
      <h5 className='m-0'>Invitados</h5>
      <span className='block mt-2 md:mt-0 p-input-icon-left'>
        <i className='pi pi-search' />
        <InputText
          type='search'
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder='Buscar...'
        />
      </span>
    </div>
  );

  return (
    <div className='grid'>
      <div className='col-12'>
        <Toast ref={toastRef} />
        <div className='card'>
          <Toolbar
            className='mb-4'
            left={leftToolbarTemplate}
            right={rightToolbarTemplate}
          />
          <DataTable
            ref={tableRef}
            value={invitados}
            dataKey='_id'
            paginator
            rows={10}
            selection={selectedInvitados}
            onSelectionChange={(e) => setSelectedInvitados(e.value)}
            scrollable
            scrollHeight='500px'
            scrollWidth='100%'
            scrollDirection='both'
            header={headerTemplate}
            rowsPerPageOptions={[10, 20, 30]}
            className='datatable-responsive mt-3'
            paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
            currentPageReportTemplate='{currentPage} de {totalPages}'
            globalFilter={globalFilter}
            emptyMessageTemplate='No se encontraron invitados'
          >
            <Column field='name' header='Nombre' sortable />
            <Column field='last_name' header='Apellido' sortable />
            <Column field='dni' header='DNI' sortable />
            <Column field='number_plate' header='Placa' sortable />
            <Column field='telefono' header='Teléfono' sortable />
            <Column field='email' header='Email' sortable />
            <Column field='date_entry' header='Fecha de registro' sortable />
            <Column field='tenant_name' header='Inquilino' sortable />
          </DataTable>
        </div>
      </div>
    </div>
  )
}
