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
        date: '',
        time: '',
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
    const [reservationDialog, setReservationDialog] = useState(false);
    const [dateMax, setDateMax] = useState();


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
                    (val) => val.status != -1
                )
                data = data.filter(
                    (val) => val.bookable == 1,
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

                    item.date = formatDateString(item.date)

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

        let _reservations = [...reservations];
        let _reservation = { ...reservation };

        if (_reservation.date && _reservation.time && tenantId && areaId
            && !validationTime()
            && !validationIsSameUser() && !validationIsReservation()) {
            _reservation.common_area_name = areas.find(item => item._id == areaId).name;
            let tenant = tenants.find(item => item._id == tenantId);
            _reservation.user_name = tenant.name + ' ' + tenant.last_name;
            _reservation.user_id = tenantId;
            _reservation.common_area_id = areaId;
            _reservation.community_id = cookies.community_id;
            _reservation.date = formatDateString(_reservation.date)

            if (_reservation.status == '1') {
                _reservation.status_text = 'Activo';
            } else if (_reservation.status == '0') {
                _reservation.status_text = 'Inactivo';
            }
            fetch('http://localhost:4000/reservation/createReservation/', {
                cache: 'no-cache',
                method: 'POST',
                body: JSON.stringify(_reservation),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    if (response.status !== 200 && response.status !== 201)
                        console.log(`Hubo un error en el servicio: ${response.status}`)
                    else return response.json()
                }).then(() => {
                    _reservations.push(_reservation);
                    setReservations(_reservations)
                    toast.current.show({
                        severity: 'success',
                        summary: 'Éxito',
                        detail: 'Reservación realizada',
                        life: 3000,
                    });

                    setReservationDialog(false)
                    setAreaId('')
                    setTenantId('')
                })

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
        setTenantId('');
    }

    const hideNewReservationDialog = () => {
        setSubmitted(false);
        setReservationDialog(false);
        setReservation(emptyReservation);
        setAreaId('');
        setTenantId('');
    };

    const openNewReservation = () => {
        setReservation(emptyReservation);
        setReservationDialog(true);
        setSubmitted(false);
    };



    const hideDeleteReservationDialog = () => {
        setDeleteReservationDialog(false);
    };

    const hideDeleteReservationsDialog = () => {
        setDeleteReservationsDialog(false);
    };


    const deleteReservation = () => {
        fetch('http://localhost:4000/reservation/deleteReservation' + reservation._id, {
            cache: 'no-cache',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(function (response) {
                if (response.status != 201)
                    console.log('Ocurrió un error con el servicio: ' + response.status);
                else return response.json();
            })
            .then(function (response) {
                let _reservation = reservations.filter(
                    (val) => (val._id !== reservation._id || val.status != -1),
                );

                setReservations(_reservation);
                setDeleteReservationDialog(false);
                setReservation(emptyReservation);
                toast.current.show({
                    severity: 'success',
                    summary: 'Éxito',
                    detail: 'Reservación Eliminada',
                    life: 3000,
                });
            })
            .catch((err) => {
                console.log('Ocurrió un error con el fetch', err);
                toast.current.show({
                    severity: 'danger',
                    summary: 'Error',
                    detail: 'Reservación no se pudo Eliminar',
                    life: 3000,
                });
            });
    };

    const deleteSelectedReservations = () => {
        let _reservations = reservations.filter(
            (val) => (!selectedReservations.includes(val)),
        );
        selectedReservations.map((item) => {
            fetch('http://localhost:4000/reservation/deleteReservation/' + item._id, {
                cache: 'no-cache',
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        });
        _reservations = _reservations.filter(
            (val) => val.status != -1,
        )
        setReservations(_reservations);
        setDeleteReservationsDialog(false);
        setSelectedReservations(null);
        toast.current.show({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Reservaciones Eliminadas',
            life: 3000,
        });
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button
                        label="Nueva Reservación"
                        icon="pi pi-plus"
                        className="p-button-success mr-2"
                        onClick={openNewReservation}
                    />
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

    const reservationDialogFooter = (
        <>
            <Button
                label="Cerrar"
                icon="pi pi-times"
                className="p-button-text"
                onClick={hideNewReservationDialog}
            />

        </>
    );

    const deleteReservationDialogFooter = (
        <>
          <Button
            label="No"
            icon="pi pi-times"
            className="p-button-text"
            onClick={hideDeleteReservationDialog}
          />
          <Button
            label="Yes"
            icon="pi pi-check"
            className="p-button-text"
            onClick={deleteReservation}
          />
        </>
      );
    
      const deleteReservationsDialogFooter = (
        <>
          <Button
            label="No"
            icon="pi pi-times"
            className="p-button-text"
            onClick={hideDeleteReservationsDialog}
          />
          <Button
            label="Yes"
            icon="pi pi-check"
            className="p-button-text"
            onClick={deleteSelectedReservations}
          />
        </>
      );

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

    const headerDate = (
        <>
            <p>
                {' '}
                <FontAwesomeIcon icon={faClockFour} style={{ color: '#C08135' }} />
                Fecha de Reserva
            </p>
        </>
    );

    const headerTime = (
        <>
            <p>
                {' '}
                <FontAwesomeIcon icon={faClockFour} style={{ color: '#D7A86E' }} />{' '}
                Hora de Reserva
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

    const onTimeChange = (e) => {
        e.target.value.split(':')[1] = "00";
        const val = (e.target && e.target.value.split(':')[0]) || '';
        let _reservation = { ...reservation };
        document.getElementById('time').value = val + ":00";
        _reservation['time'] = val + ":00";
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
        setTenantId(getTenantId);
    }

    const aList = areas.map((item) => ({
        label: item.name,
        value: item._id,
    }));

    const tList = tenants.map((item) => ({
        label: item.name,
        value: item._id,
    }));

    function validationTime() {
        let value = true;
        const [hourR, minuteR] = reservation.time.split(':');
        if (hourR != "") {
            const [hourMin, minuteMin] = area.hourMin.split(':');
            const [hourMax, minuteMax] = area.hourMax.split(':');
            if ((parseInt(hourR) >= parseInt(hourMin)) && (parseInt(hourR) <= parseInt(hourMax))) {
                value = false;
            }
        } else {
            value = false;
        }
        return value;
    }

    function formatDateString(dateString) {
        let date = new Date(dateString).toLocaleDateString("es-CL");
        return date;
    }

    function validationIsReservation() {
        if (reservation.date && reservation.time && areaId) {
            let date1 = new Date(reservation.date).toJSON().split('T')[0];
            let date2 = date1.split('-')[2] + '-' + date1.split('-')[1] + '-' + date1.split('-')[0];

            let booked = reservations.filter(item => item.common_area_id == areaId
                && item.date == date2
                && item.time == reservation.time);

            if (booked.length > 0) {
                return true;

            } else {
                return false;
            }
        }
    }

    function validationIsSameUser() {
        if (reservation.date && tenantId && areaId) {
            let date1 = new Date(reservation.date).toJSON().split('T')[0];
            let date2 = date1.split('-')[2] + '-' + date1.split('-')[1] + '-' + date1.split('-')[0];

            let booked = reservations.filter(item => item.common_area_id == areaId
                && item.date == date2
                && item.user_id == tenantId);
            if (booked.length >= 2) {
                return true;

            } else {
                return false;
            }
        }
    }

    const getDateMax = () => {
        let today = new Date();
        today.setDate(today.getDate() + 7)
        return today.toJSON().split('T')[0];
    }

    const getDateMin = () => {
        let today = new Date();
        today.setDate(today.getDate() - 1)
        return today.toJSON().split('T')[0];
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
                            field="date"
                            sortable
                            header={headerDate}
                            style={{
                                flexGrow: 1,
                                flexBasis: '160px',
                                minWidth: '160px',
                                wordBreak: 'break-word',
                            }}
                        ></Column>
                        <Column
                            field="time"
                            sortable
                            header={headerTime}
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
                    <Dialog
                        visible={reservationDialog}
                        style={{ width: '650px' }}
                        header="Reservar Área para Inquilino"
                        modal
                        className="p-fluid"
                        footer={reservationDialogFooter}
                        onHide={hideNewReservationDialog}
                    >
                        {reservation && (
                            <div className="p-fluid formgrid grid">
                                <div className="field col-12 md:col-12">
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
                                        <div className="field col-6 md:col-6">
                                            <label htmlFor="name">Fecha</label>
                                            <div className="p-0 col-12 md:col-12">
                                                <div className="p-inputgroup">
                                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                                        <i className="pi pi-home"></i>
                                                    </span>
                                                    <InputText
                                                        id="date"
                                                        onChange={(e) => onInputChange(e, 'date')}
                                                        required
                                                        autoFocus
                                                        min={getDateMin()}
                                                        max={getDateMax()}
                                                        type="date"
                                                        lang='es-CL'
                                                        value={reservation.date}
                                                        className={classNames({
                                                            'p-invalid': submitted && (reservation.date === ''
                                                                || validationIsReservation()),
                                                        })}
                                                    />

                                                </div>
                                                {submitted && reservation.date === '' && (
                                                    <small className="p-invalid">Fecha es requirida.</small>
                                                )}

                                            </div>
                                        </div>

                                        <div className="field col-6 md:col-6">
                                            <label htmlFor="name">Hora de Reservación</label>
                                            <div className="p-0 col-12 md:col-12">
                                                <div className="p-inputgroup">
                                                    <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                                        <i className="pi pi-home"></i>
                                                    </span>
                                                    <InputText
                                                        id="time"
                                                        value={reservation.time}
                                                        onChange={(e) => onTimeChange(e)}
                                                        required
                                                        autoFocus
                                                        type="time"
                                                        step='3600'
                                                        className={classNames({
                                                            'p-invalid': submitted && (reservation.time === ''
                                                                || validationTime() || validationIsReservation()),
                                                        })}
                                                    />
                                                </div>
                                                {submitted && reservation.time === '' && (
                                                    <small className="p-invalid">Hora es requirido.</small>
                                                )}
                                                {submitted && validationTime() && (
                                                    <small className="p-invalid">La hora de inicio debe ser mayor de {area.hourMin} y menor de {area.hourMax} .</small>
                                                )}
                                                {submitted && validationIsReservation() && (
                                                    <small className="p-invalid">Ya hay una reservación en la fecha y hora ingresada.</small>
                                                )}

                                            </div>
                                        </div>
                                    </>
                                }
                                <div className="field col-12 md:col-12">
                                    <label htmlFor="user_id">Inquilino: </label>
                                    <div className="p-0 col-12 md:col-12">
                                        <div className="p-inputgroup">
                                            <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                                                <i className="pi pi-home"></i>
                                            </span>
                                            <Dropdown
                                                placeholder="--Seleccione el Inquilino a Reservar--"
                                                id="user_id"
                                                value={tenantId}
                                                options={tList}
                                                onChange={handleTenants}
                                                required autoFocus
                                                className={
                                                    classNames({
                                                        'p-invalid': submitted && (!tenantId
                                                            || validationIsSameUser())
                                                    })}
                                            />
                                        </div>
                                        {submitted
                                            && !tenantId
                                            && <small className="p-invalid">Inquilino es requerido.</small>}
                                        {submitted && validationIsSameUser() && (
                                            <small className="p-invalid">El inquilino no puede reservar más de dos veces el mismo día.</small>
                                        )}
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
                        )}
                    </Dialog>
                    <Dialog
                        visible={deleteReservationsDialog}
                        style={{ width: '450px' }}
                        header="Confirmar"
                        modal
                        footer={deleteReservationDialogFooter}
                        onHide={hideDeleteReservationDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i
                                className="pi pi-exclamation-triangle mr-3"
                                style={{ fontSize: '2rem' }}
                            />
                            {reservation && (
                                <span>
                                    ¿Estás seguro que desea eliminar la reservación de <b>{reservation.user_name}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>
                    <Dialog
                        visible={deleteReservationsDialog}
                        style={{ width: '450px' }}
                        header="Confirmar"
                        modal
                        footer={deleteReservationsDialogFooter}
                        onHide={hideDeleteReservationsDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i
                                className="pi pi-exclamation-triangle mr-3"
                                style={{ fontSize: '2rem' }}
                            />
                            {selectedReservations && (
                                <span>
                                    ¿Está seguro eliminar las reservaciones
                                    seleccionadas?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>

        </div>


    );


}

export default React.memo(Reservations);
