import React, { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import classNames from 'classnames';

const InvitadosComunidad = () => {
  const [cookies] = useCookies();
  const [globalFilter, setGlobalFilter] = useState(null);
  const [invitados, setInvitados] = useState([]);
  const [selectedInvitados, setSelectedInvitados] = useState([]);
  const tableRef = useRef(null);
  const toastRef = useRef(null);

  const getInvitados = async () => {
    await fetch(`http://localhost:4000/guest/allGuests`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => data.message)
      .then((data) => {
        data = data.filter(
          (invitado) => invitado.community === cookies.community_id,
        );
        setInvitados(data);
      });
  };

  useEffect(() => {
    getInvitados();
  }, [getInvitados, invitados]);

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="my-2">
          <p>Boton Eliminar aqui</p>
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

  const headerName = (
    <>
      <p>
        {' '}
        <FontAwesomeIcon icon={faUserAlt} style={{ color: '#C08135' }} /> Nombre
      </p>
    </>
  );

  const headerTenant = (
    <>
      <p>
        {' '}
        <FontAwesomeIcon icon={faUserAlt} style={{ color: '#C08135' }} /> Inquilino
      </p>
    </>
  );

  const headerLastName = (
    <>
      <p>
        {' '}
        <FontAwesomeIcon icon={faUserAlt} style={{ color: '#D7A86E' }} />{' '}
        Apellido(s)
      </p>
    </>
  );

  const headerPlate = (
    <p>
      {' '}
      <FontAwesomeIcon icon={faIdCardAlt} style={{ color: '#C08135' }} />{' '}
      Placa
    </p>
  );

  const headerDNI = (
    <p>
      {' '}
      <FontAwesomeIcon icon={faIdCardAlt} style={{ color: '#C08135' }} />{' '}
      Identificación
    </p>
  );

  const headerEmail = (
    <>
      <p>
        {' '}
        <FontAwesomeIcon icon={faAt} style={{ color: '#D7A86E' }} /> Correo
        Electrónico
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

  const headerTemplate = (
    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
      <h5 className="m-0">Invitados</h5>
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

  return (
    <div className="grid">
      <div className="col-12">
        <Toast ref={toastRef} />
        <div className="card">
          <Toolbar
            className="mb-4"
            left={leftToolbarTemplate}
          />
          <DataTable
            ref={tableRef}
            value={invitados}
            dataKey="_id"
            paginator
            rows={10}
            selection={selectedInvitados}
            onSelectionChange={(e) => setSelectedInvitados(e.value)}
            scrollable
            scrollHeight="500px"
            scrollWidth="100%"
            scrollDirection="both"
            header={headerTemplate}
            rowsPerPageOptions={[10, 20, 30]}
            className="datatable-responsive mt-3"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="{currentPage} de {totalPages}"
            globalFilter={globalFilter}
            emptyMessageTemplate="No se encontraron invitados"
          >
            <Column field="name" sortable header={headerName} />
            <Column
              field="last_name"
              sortable
              header={headerLastName}
            />
            <Column field="dni"  sortable header={headerDNI} />
            <Column
              field="number_plate"
              sortable
              header={headerPlate}
            />
            <Column
              field="telefono"
              sortable
              header={headerPhone}
            />
            <Column
              field="email"
              sortable
              header={headerEmail}
            />
            <Column
              field="date_entry"
              sortable
              header={headerName}
            />
            <Column
              field="tenant_name"
              sortable
              header={headerTenant}
            />
          </DataTable>
        </div>
      </div>
    </div>
  );
};

export default React.memo(InvitadosComunidad);
