import React, { useEffect, useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { faHomeAlt } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { useCookies } from "react-cookie";


const AreasComunes = () => {

    let emptyCommonArea = {
        _id: null,
        dni: '',
        name: '',
        hourMin: '',
        hourMax: '',
        community_id: '',
        bookable: '1',
        bookable_text: '',
    };

    const [commonAreaList, setCommonAreaList] = useState([]);
    const [commonArea, setCommonArea] = useState(emptyCommonArea);
    const [selectedCommonAreas, setSelectedCommonAreas] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [deleteCommonAreaDialog, setDeleteCommonAreaDialog] = useState(false);
    const [deleteCommonAreasDialog, setDeleteCommonAreasDialog] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);

    const [cookies, setCookie] = useCookies();

    async function getCommonAreas() {
        await fetch(`http://localhost:4000/commonArea/findByCommunity/${cookies.community_id}`, { method: 'GET' })
            .then((response) => response.json())
            .then(data => data.message)
            .then(data => {
                if(data) {
                    data.map(item => {
                        if(item.bookable == '1') {
                            item.bookable_text = 'Disponible';
                        } else{
                            item.bookable_text = 'Cerrado';
                        }
                    })
                }
                setCommonAreaList(data);
            });
    }

    useEffect(() => {
        getCommonAreas();
    }, []);


    const deleteCommonArea = () => {
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
        let _common_areas = commonAreaList.filter(
            (val) => val._id !== commonArea._id,
        );
        setCommonAreaList(_common_areas);
        setDeleteCommonAreaDialog(false);
        setCommonArea(emptyCommonArea);
        toast.current.show({
            severity: 'success',
            summary: 'Área Común Eliminada',
            life: 3000,
        });
    };

    const deleteSelectedCommonAreas = () => {
        let _commonareas = commonAreaList.filter(
            (val) => !selectedCommonAreas.includes(val),
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
        setCommonAreaList(_commonareas);
        setDeleteCommonAreasDialog(false);
        setSelectedCommonAreas(null);
        toast.current.show({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Áreas Comúnes Eliminadas',
            life: 3000,
        });
    };

    const hideDeleteCommonAreaDialog = () => {
        setDeleteCommonAreaDialog(false);
    }

    const hideDeleteCommonAreasDialog = () => {
        setDeleteCommonAreasDialog(false);
    }

    const confirmDeleteCommonArea = (commonArea) => {
        setCommonArea(commonArea);
        setDeleteCommonAreaDialog(true);
    }

    const confirmDeleteSelected = () => {
        setDeleteCommonAreasDialog(true);
    };



    const actionsCommonArea = (rowData) => {
        return (
            <div className="actions">
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger mt-2"
                    onClick={() => confirmDeleteCommonArea(rowData)}
                />
            </div>
        );
    };


    const deleteCommonAreaDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteCommonAreaDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteCommonArea} />
        </>
    );

    const deleteCommonAreasDialogFooter = (
        <>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteCommonAreasDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedCommonAreas} />
        </>
    );


    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Eliminar" icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedCommonAreas || !selectedCommonAreas.length} />
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


    const header = (
        <React.Fragment>

            <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                <h5 className="m-0">Áreas Comunes</h5>
                <span className="block mt-2 md:mt-0 p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
                </span>
            </div>
        </React.Fragment>
    );

    const headerName = (
        <>
            <p>{' '}
                <FontAwesomeIcon icon={faUserAlt} style={{ color: "#C08135" }} /> {' '}
                Nombre
            </p>
        </>
    )

    const headerHourMin = (
        <>
            <p>
                {' '}
                <FontAwesomeIcon icon={faUserAlt} style={{ color: "#D7A86E" }} />{' '}
                Hora de apertura
            </p>
        </>
    )

    const headerHourMax = (
        <>
            <p> {' '}
                <FontAwesomeIcon icon={faIdCardAlt} style={{ color: "#C08135" }} />{' '}
                Hora de cierre
            </p>
        </>
    )

    const headerBookable = (
        <>
            <p> {' '}
                <FontAwesomeIcon icon={faAt} style={{ color: "#D7A86E" }} />{' '}
                Reservable
            </p>
        </>
    )


    const statusBodyTemplate = (rowData) => {
        return (
          <>
            <span
              className={`status status-${rowData.bookable}`}
            >
              {rowData.bookable_text}
            </span>
          </>
        );
      };

    return (
        <div className="grid">
            <div className="col-12">
                <Toast ref={toast} />
                <div className="card">
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    <DataTable ref={dt} value={commonAreaList} dataKey="_id" paginator rows={5} selection={selectedCommonAreas} onSelectionChange={(e) => setSelectedCommonAreas(e.value)}
                        scrollable scrollHeight="400px" scrollDirection="both" header={header}
                        rowsPerPageOptions={[5, 10, 25]} className="datatable-responsive mt-3"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} administradores de comunidades de viviendas"
                        globalFilter={globalFilter} emptyMessage="No hay administradores de comunidades registrados.">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="name" sortable header={headerName} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column field="hourMin"  header={headerHourMin} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }} alignFrozen="left"></Column>
                        <Column field="hourMax"  header={headerHourMax} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}>                    </Column>
                        <Column field="bookable" sortable header={headerBookable} body={statusBodyTemplate} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column style={{ flexGrow: 1, flexBasis: '130px', minWidth: '130px' }} body={actionsCommonArea}></Column>
                    </DataTable>
                    <Dialog visible={deleteCommonAreaDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteCommonAreaDialogFooter} onHide={hideDeleteCommonAreaDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {commonArea && <span>¿Estás seguro que desea eliminar a <b>{commonArea.name}</b>?</span>}
                        </div>
                    </Dialog>
                    <Dialog visible={deleteCommonAreasDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteCommonAreasDialogFooter} onHide={hideDeleteCommonAreasDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {selectedCommonAreas && <span>¿Está seguro eliminar las áreas comunes seleccionadas?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );

};


export default React.memo(AreasComunes);
