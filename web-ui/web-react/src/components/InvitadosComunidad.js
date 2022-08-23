import { useCookies } from 'react-cookie';
import { useState, useRef } from 'react';

const InvitadosComunidad = () => {
  const [cookies] = useCookies();
  const [globalFilter, setGlobalFilter] = useState(null);
  const [invitados, setInvitados] = useState([]);
  const [selectedInvitados, setSelectedInvitados] = useState([]);
  const tableRef = useRef(null);
  const toast = useRef(null);
  
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
