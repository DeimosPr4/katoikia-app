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
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faAt } from '@fortawesome/free-solid-svg-icons';
import { faIdCardAlt } from '@fortawesome/free-solid-svg-icons';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { useCookies } from "react-cookie";
import { RadioButton } from 'primereact/radiobutton';

const AreasComunes = () => {

    let emptyCommonArea = {
        _id: null,
        name: '',
        hourMin: '00:00',
        hourMax: '01:00',
        community_id: '',
        bookable: '1',
        bookable_text: '',
        status: '1',
        status_text: '',
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
                if (data) {
                    data.map(item => {
                        if (item.bookable == '1') {
                            item.bookable_text = 'Necesaria';
                        } else {
                            item.bookable_text = 'No es necesarioa';
                        }

                        if (item.status == '1') {
                            item.status_text = 'Activo';
                        } else if (item.status == '0') {
                            item.status_text = 'Inactivo';
                        } else {
                            item.status_text = 'Eliminado';
                        }
                    })
                }

                data = data.filter(
                    (val) => val.status != -1,
                )
                setCommonAreaList(data);
            });
    }

    useEffect(() => {
        getCommonAreas();
    }, []);

    const saveCommonArea = () => {
        if (
            commonArea.name &&
            commonArea.hourMin &&
            commonArea.hourMax
        ) {
            let _common_areas = [...commonAreaList];
            let _common_area = { ...commonArea };
            _common_area.community_id = cookies.community_id;

            // console.log(houses)
            fetch('http://localhost:4000/commonArea/createCommonArea', {
                cache: 'no-cache',
                method: 'POST',
                body: JSON.stringify(_common_area),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(function (response) {
                    if (response.status != 201)
                        console.log('Ocurrió un error con el servicio: ' + response.status);
                    else return response.json();
                })
                .then((data) => {
                    if (data) {
                        if (_common_area.bookable == '1') {
                            _common_area.bookable_text = 'Necesaria';
                        } else {
                            _common_area.bookable_text = 'No es necesaria';
                        }

                        if (_common_area.status == '1') {
                            _common_area.status_text = 'Activo';
                        } else if (_common_area.status == '0') {
                            _common_area.status_text = 'Inactivo';
                        } else {
                            _common_area.status_text = 'Eliminado';
                        }
                    }
                    _common_areas.push(_common_area);

                    toast.current.show({
                        severity: 'success',
                        summary: 'Registro exitoso',
                        detail: 'Área Común Creada',
                        life: 3000,
                    });
                    setCommonAreaList(_common_areas);
                    setCommonArea(emptyCommonArea);
                })
                .catch((err) => {
                    console.log('Ocurrió un error con el fetch', err);
                    toast.current.show({
                        severity: 'danger',
                        summary: 'Error',
                        detail: 'No se pudo registrar el área común',
                        life: 3000
                    });

                });
        } else {
            setSubmitted(true);
        }
    };


    const deleteCommonArea = () => {
        fetch('http://localhost:4000/commonArea/deleteCommonArea/' + commonArea._id, {
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

                    let _common_areas = commonAreaList.filter(
                        (val) => val._id !== commonArea._id,
                    );
                    _common_areas = _common_areas.filter(
                        (val) => val.status != -1,
                    )
                    setCommonAreaList(_common_areas);
                    setDeleteCommonAreaDialog(false);
                    setCommonArea(emptyCommonArea);
                    toast.current.show({
                        severity: 'success',
                        summary: 'Área Común Eliminada',
                        life: 3000,
                    });
                }
            )
            .catch(
                err => {
                    console.log('Ocurrió un error con el fetch', err)
                    toast.current.show({ severity: 'danger', summary: 'Error', detail: 'Área Común no se pudo eliminar', life: 3000 });
                }
            );

    };

    const deleteSelectedCommonAreas = () => {
        let _common_areas = commonAreaList.filter(
            (val) => !selectedCommonAreas.includes(val),
        );
        selectedCommonAreas.map((item) => {
            fetch('http://localhost:4000/commonArea/deleteCommonArea/' + item._id, {
                cache: 'no-cache',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        });
        _common_areas = _common_areas.filter(
            (val) => val.status != -1,
        )
        setCommonAreaList(_common_areas);
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

    const onBookableChange = (e) => {
        let _commonArea = { ...commonArea };
        _commonArea['bookable'] = e.value;
        setCommonArea(_commonArea);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _commonArea = { ...commonArea };
        _commonArea[`${name}`] = val;
        setCommonArea(_commonArea);
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
                <FontAwesomeIcon icon={faClipboardCheck} style={{ color: "#D7A86E" }} />{' '}
                Reservación
            </p>
        </>
    )

    const headerStatus = (
        <>
            <p> {' '}
                <FontAwesomeIcon icon={faCircleQuestion} style={{ color: "#C08135" }} />{' '}
                Estado
            </p>
        </>
    )


    const bookableBodyTemplate = (rowData) => {
        let class_color = '';
        if (rowData.bookable == '1') {
            class_color = '0';
        } else {
            class_color = '1';

        }
        return (
            <>
                <span
                    className={`status status-${class_color}`}
                >
                    {rowData.bookable_text}
                </span>
            </>
        );
    };

    const statusBodyTemplate = (rowData) => {
        return (
            <>
                <span
                    className={`status status-${rowData.status}`}
                >
                    {rowData.status_text}
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
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} áreas comunes"
                        globalFilter={globalFilter} emptyMessage="No hay áreas comunes registrados.">
                        <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                        <Column field="name" sortable header={headerName} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
                        <Column field="hourMin" header={headerHourMin} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }} alignFrozen="left"></Column>
                        <Column field="hourMax" header={headerHourMax} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}>                    </Column>
                        <Column field="bookable" sortable header={headerBookable} body={bookableBodyTemplate} style={{ flexGrow: 1, flexBasis: '200px', minWidth: '200px', wordBreak: 'break-word' }}></Column>
                        <Column field="status" sortable header={headerStatus} body={statusBodyTemplate} style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}></Column>
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
            <div className="col-12">
                <div className="card">
                    <h5>Registro de área común</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-6">
                            <label htmlFor="name">Nombre</label>
                            <InputText id="name"
                                type="text"
                                onChange={(e) => onInputChange(e, 'name')}
                                value={commonArea.name}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && commonArea.name === '',
                                })}
                            />
                            {submitted && commonArea.name === '' && (
                                <small className="p-invalid">Nombre es requirido.</small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="hourMin">Hora apertura</label>
                            <InputText id="hourMin"
                                type="time"
                                min="00:00" max="23:59"
                                step="3600000"
                                onChange={(e) => onInputChange(e, 'hourMin')}
                                value={commonArea.hourMin}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && commonArea.hourMin === '',
                                })}
                            />
                            {submitted && commonArea.hourMin === '' && (
                                <small className="p-invalid">Hora de apertura es requirido.</small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="hourMax">Hora de cierre</label>
                            <InputText id="hourMax"
                                type="time"
                                min="00:00" max="23:59"
                                step="3600000"
                                onChange={(e) => onInputChange(e, 'hourMax')}
                                value={commonArea.hourMax}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && commonArea.hourMax === '',
                                })}
                            />
                            {submitted && commonArea.hourMax === '' && (
                                <small className="p-invalid">Hora de apertura es requirido.</small>
                            )}
                        </div>
                        <div className="field col-12 md:col-6">
                            <label htmlFor="bookable">¿Necesita Reservación?</label>
                            <div className="formgrid grid">
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="bookable1"
                                        name="bookable"
                                        value="1"
                                        onChange={onBookableChange}
                                        checked={commonArea.bookable === '1'}
                                    />
                                    <label htmlFor="bookable1">Sí</label>
                                </div>
                                <div className="field-radiobutton col-6">
                                    <RadioButton
                                        inputId="bookable2"
                                        name="bookable"
                                        value="0"
                                        onChange={onBookableChange}
                                        checked={commonArea.bookable === '0'}
                                    />
                                    <label htmlFor="bookable2">No</label>
                                </div>
                            </div>
                        </div>

                        <Button label="Registrar" onClick={saveCommonArea}></Button>
                    </div>
                </div>
            </div>

        </div>
    );

};


export default React.memo(AreasComunes);
