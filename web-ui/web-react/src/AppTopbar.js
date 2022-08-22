import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Cookies from 'universal-cookie';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';

const cookies = new Cookies();

export const AppTopbar = (props) => {
    const [logged, setLogged] = useState(null);


    function cerrarSesion() {
        cookies.remove('id', { path: "/" });
        cookies.remove('email', { path: "/" });
        cookies.remove('name', { path: "/" });
        cookies.remove('type', { path: "/" });
        cookies.remove('community_id', { path: "/" });
        window.location.href = '/login';
    }

    useEffect(() => {
        if (cookies.get('email')) {
            setLogged(true);
        } else {
            setLogged(false);
        };
    }, [])


    const buttonLogout = () => {
        return (
            <>
                <div className="my-2">
                    <Button label="Cerrar Sesión"
                        className="p-button-danger"
                        onClick={cerrarSesion}
                        disabled={logged} />
                </div>
            </>
        )
    }

    const menuProfile = [
        {
            label: 'Perfil',
            icon: 'pi pi-user',
            items: [
                {
                    label: 'Cerrar Sesion',
                    icon: 'pi pi-fw pi-lock',
                }
            ],
        },
    ]


    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src={'images/Logo_Katoikia.svg'} alt="logo" />
                <span>KATOIKIA</span>
            </Link>

            {/* <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button> */}

            <button
                type="button"
                className="p-link layout-topbar-menu-button layout-topbar-button"
            >
                <i className="pi pi-ellipsis-v" />
            </button>

            <ul className="layout-topbar-menu lg:flex origin-top">
                {/* <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-calendar"/>
                            <span>Events</span>
                        </button>
                    </li> */}
                {/* <li>
                        <button className="p-link layout-topbar-button" onClick={props.onMobileSubTopbarMenuClick}>
                            <i className="pi pi-cog"/>
                            <span>Settings</span>
                        </button>
                    </li> */}
                <li className='mx-2' hidden={!logged}>
                    <button className="p-link layout-topbar-button" >
                        <i className="pi pi-user" />
                        <span>Perfil</span>
                    </button>
                </li>
                <li className='mx-2' hidden={!logged}>
                    <button className="p-link layout-topbar-button" onClick={cerrarSesion} >
                        <i className="pi pi-sign-out" />
                        <span>Cerrar Sesión</span>
                    </button>
                </li>
                {/*
                    <Menubar model={menuProfile} ></Menubar>


                </li>
                <li hidden={!logged}>
                    <div className="my-2" >
                        <Button label="Cerrar Sesión"
                            className="p-button-danger"
                            onClick={cerrarSesion}
                        />
                    </div>
                </li>*/}
            </ul>
        </div>
    );
}
