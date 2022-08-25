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
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faClockFour } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';

const Reservations = () => {
    let emptyReservation = {
        _id: null,
        start_time: '',
        finish_time: '',
        user_id: '',
        user_name: '',
        common_area_id: '',
        common_area_name: '',
        community_id: '',
        status: '1',
        status_text: '',
        date_entry: new Date(),
    };


    const [reservations, setReservations] = useState([]);
    const [reservation, setReservation] = useState(emptyReservation);
    const [submitted, setSubmitted] = useState(false);
    const [selectedReservations, setSelectedReservations] = useState(null);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [deleteReservationDialog, setDeleteReservationDialog] = useState(false);
    const [deleteReservationsDialog, setDeleteReservationsDialog] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    const [cookies, setCookies] = useCookies()
    const [areas, setAreas] = useState([]);
    const [area, setArea] = useState();
    const [areaId, setAreaId] = useState();
    const [tenants, setTenants] = useState([]);
    const [tenantId, setTenantId] = useState();
    const [saveButtonTitle, setSaveButtonTitle] = useState("Registrar")

    async function tenantsList(id) {
        await fetch(`http://localhost:4000/user/findTenants/${id}`,
            { method: 'GET' })
            .then((response) => response.json())
            .then(data => data.message)
            .then(data => {
                data = data.filter(
                    (val) => val.status != -1,
                )
                data = data.map(item => {
                    item.password = '';
                    return item;
                })
                setTenants(data)
            });
    }

    async function areasList(id) {
        await fetch(`http://localhost:4000/commonArea/findByCommunity/${id}`,
            { method: 'GET' })
            .then((response) => response.json())
            .then(data => data.message)
            .then(data => {
                data = data.filter(
                    (val) => val.status != -1,
                )
                setAreas(data)
            });
    }

    async function reservationList(id) {
        await fetch(`http://localhost:4000/reservation/findReservations/${id}`,
            { method: 'GET' })
            .then((response) => response.json())
            .then(data => data.message)
            .then(data => {
                data = data.filter(
                    (val) => val.status != -1,
                )
                data.map((item) => {
                    if (item.status == '1') {
                        item.status_text = 'Activo';
                    } else if (item.status == '0') {
                        item.status_text = 'Inactivo';
                    }
                })

                setReservations(data)
            });
    }

    useEffect(() => {
        tenantsList(cookies.community_id);
    }, [])

    useEffect(() => {
        areasList(cookies.community_id);
    }, [])


    reservations.map((item) => {
        let tenant = tenants.find(item2 => item2._id == item.user_id);
        if (tenant) {
            item.user_name = tenant.name + ' ' + tenant.last_name;
        }
    });


    useEffect(() => {
        reservationList(cookies.community_id);
    }, [])

    const saveReservation = () => {
        if (reservation.common_area_id) {

        } else {
            setSubmitted(true);
        }
    }


    const actionsReservation = (rowData) => {


        return (
            <div className="actions">
                <Button
                    icon="pi pi-trash"
                    className="p-button-rounded p-button-danger mt-2 mx-2"
                    onClick={() => confirmDeleteReservation(rowData)}
                    title="Eliminar Reserva"
                />
            </div>
        );
    };



    const confirmDeleteReservation = (reservation) => {
        setReservation(reservation);
        setDeleteReservationDialog(true);
    };

    const confirmDeleteSelected = () => {
        setDeleteReservationsDialog(true);
    };

    const cancelEdit = () => {
        setReservation(emptyReservation);
        setSaveButtonTitle('Registrar');
        setAreaId('');
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button
                        label="Eliminar"
                        icon="pi pi-trash"
                        className="p-button-danger"
                        onClick={confirmDeleteSelected}
                        disabled={!selectedReservations || !selectedReservations.length}
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
            <h5 className="m-0">
                Reservaciones <i className="fal fa-user"></i>
            </h5>
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

    const headerStartTime = (
        <>
            <p>
                {' '}
                <FontAwesomeIcon icon={faClockFour} style={{ color: '#C08135' }} />
                Hora de Apertura
            </p>
        </>
    );

    const headerEndTime = (
        <>
            <p>
                {' '}
                <FontAwesomeIcon icon={faClockFour} style={{ color: '#D7A86E' }} />{' '}
                Hora de Cierre
            </p>
        </>
    );

    const headerUser = (
        <>
            <p>
                {' '}
                <FontAwesomeIcon icon={faUserAlt} style={{ color: '#C08135' }} />{' '}
                Inquilino
            </p>
        </>
    );


    const headerArea = (
        <>
            <p>
                {' '}
                <FontAwesomeIcon icon={faHome} style={{ color: '#D7A86E' }} />{' '}
                Área Reservada
            </p>
        </>
    );

    const headerStatus = (
        <>
            <p> {' '}
                <FontAwesomeIcon icon={faCircleQuestion} style={{ color: "#C08135" }} />{' '}
                Estado
            </p>
        </>
    )

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

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _reservation = { ...reservation };
        _reservation[`${name}`] = val;

        setReservation(_reservation);
    };

    const handleAreas = (e) => {
        const getAreaId = e.target.value;
        setAreaId(getAreaId);
        let area = areas.find(item => item._id == getAreaId);
        setArea(area)
    }

    const handleTenants = (e) => {
        const getTenantId = e.target.value;
        setAreaId(getTenantId);
    }

    const aList = areas.map((item) => ({
        label: item.name,
        value: item._id,
    }));

    const tList = tenants.map((item) => ({
        label: item.name,
        value: item._id,
    }));

    function convertToISO(timeString) {
        const [hour12, ampm] = timeString.split(/(?=[ap]m$)/i)
        const hour = hour12 % 12 + (ampm.toLowerCase() === 'pm' ? 12 : 0)
        const date = new Date()
        // Set time, adjusted for time zone
        date.setHours(hour, -date.getTimezoneOffset(), 0, 0)
        return date.toISOString()
    }

    function validateTime(timeStart, timeFinish) {
        if ((timeFinish - timeStart) == 1) {
            return (
                <>
                    <small className="p-invalid">La hora de inicio debe ser la hora .</small>
                </>
            )
        }
    }

    function convertToTime(timeString) {
        const [hour, minute] = timeString.split(':');
        const date = new Date()
        date.setHours(hour);
        date.setMinutes(minute);
        console.log(date.toTimeString());
        return date.toString()
    }


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
                        value={reservations}
                        dataKey="_id"
                        paginator
                        rows={5}
                        selection={selectedReservations}
                        onSelectionChange={(e) => setSelectedReservations(e.value)}
                        scrollable
                        scrollHeight="400px"
                        scrollDirection="both"
                        header={header}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive mt-3"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} reservaciones de la comunidad"
                        globalFilter={globalFilter}
                        emptyMessage="No hay reservas registradas."
                    >
                        <Column
                            selectionMode="multiple"
                            headerStyle={{ width: '3rem' }}
                        ></Column>
                        <Column
                            field="start_time"
                            sortable
                            header={headerStartTime}
                            style={{
                                flexGrow: 1,
                                flexBasis: '160px',
                                minWidth: '160px',
                                wordBreak: 'break-word',
                            }}
                        ></Column>
                        <Column
                            field="finish_time"
                            sortable
                            header={headerEndTime}
                            style={{
                                flexGrow: 1,
                                flexBasis: '160px',
                                minWidth: '160px',
                                wordBreak: 'break-word',
                            }}
                            alignFrozen="left"
                        ></Column>
                        <Column
                            field="user_name"
                            header={headerUser}
                            style={{
                                flexGrow: 1,
                                flexBasis: '160px',
                                minWidth: '160px',
                                wordBreak: 'break-word',
                            }}
                        ></Column>
                        <Column
                            field="common_area_name"
                            header={headerArea}
                            style={{
                                flexGrow: 1,
                                flexBasis: '160px',
                                minWidth: '160px',
                                wordBreak: 'break-word',
                            }}
                        ></Column>
                        <Column
                            field="status"
                            sortable
                            header={headerStatus}
                            body={statusBodyTemplate}
                            style={{ flexGrow: 1, flexBasis: '160px', minWidth: '160px', wordBreak: 'break-word' }}>
                        </Column>
                        <Column

                            style={{ flexGrow: 1, flexBasis: '80px', minWidth: '80px' }}
                            body={actionsReservation}
                        ></Column>
                    </DataTable>


                </div>
            </div>
            <div className="col-12">
                <div className="card">
                    <h5>Reservar Área para Inquilino</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-6 md:col-6">
                            <label htmlFor="common_area_id">Área Común: </label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-home"></i>
                                    </span>
                                    <Dropdown
                                        placeholder="--Seleccione el Area Común a Reservar--"
                                        id="common_area_id"
                                        value={areaId}
                                        options={aList}
                                        onChange={handleAreas}
                                        required autoFocus
                                        className={
                                            classNames({ 'p-invalid': submitted && !areaId })}
                                    />
                                </div>
                                {submitted
                                    && !areaId
                                    && <small className="p-invalid">Área Común es requerida.</small>}
                            </div>
                        </div>
                        {area &&
                            <>
                                <div className="field col-3 md:col-3">
                                    <label htmlFor="name">Fecha Inicio</label>
                                    <div className="p-0 col-12 md:col-12">
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                                <i className="pi pi-home"></i>
                                            </span>
                                            <InputText
                                                id="start_time"
                                                onChange={(e) => onInputChange(e, 'start_time')}
                                                required
                                                autoFocus
                                                min={area.hourMin}
                                                max={area.hourMax}
                                                type="time"
                                                lang='es'
                                                value={reservation.start_time}
                                                className={classNames({
                                                    'p-invalid': submitted && reservation.start_time === '',
                                                })}
                                            />
                                        </div>
                                        {submitted && reservation.start_time === '' && (
                                            <small className="p-invalid">Nombre es requirido.</small>
                                        )}
                                    </div>
                                </div>

                                <div className="field col-3 md:col-3">
                                    <label htmlFor="name">Nombre</label>
                                    <div className="p-0 col-12 md:col-12">
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                                <i className="pi pi-home"></i>
                                            </span>
                                            <InputText
                                                id="finish_time"
                                                value={reservation.finish_time}
                                                onChange={(e) => onInputChange(e, 'finish_time')}
                                                required
                                                autoFocus
                                                type="time"
                                                className={classNames({
                                                    'p-invalid': submitted && reservation.finish_time === '',
                                                })}
                                            />
                                        </div>
                                        {submitted && reservation.finish_time === '' && (
                                            <small className="p-invalid">Nombre es requirido.</small>
                                        )}
                                    </div>
                                </div>
                            </>
                        }
                        <div className="field col-6 md:col-6">
                            <label htmlFor="common_area_id">Inquilino: </label>
                            <div className="p-0 col-12 md:col-12">
                                <div className="p-inputgroup">
                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                        <i className="pi pi-home"></i>
                                    </span>
                                    <Dropdown
                                        placeholder="--Seleccione el Inquilino a Reservar--"
                                        id="common_area_id"
                                        value={tenantId}
                                        options={tList}
                                        onChange={handleTenants}
                                        required autoFocus
                                        className={
                                            classNames({ 'p-invalid': submitted && !tenantId })}
                                    />
                                </div>
                                {submitted
                                    && !tenantId
                                    && <small className="p-invalid">Inquilino es requerido.</small>}
                            </div>
                        </div>

                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "10px",
                            width: "100%"
                        }}>
                            <Button
                                label={`${saveButtonTitle}`}
                                onClick={saveReservation}
                            />
                            {saveButtonTitle === 'Actualizar' && (
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


}

export default React.memo(Reservations);
