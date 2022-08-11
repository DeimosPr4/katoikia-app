import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const AppTopbar = (props) => {

     function cerrarSesion()  {
        cookies.remove('id', { path: "/" });
        cookies.remove('email', { path: "/" });
        cookies.remove('name', { path: "/" });
        cookies.remove('type', { path: "/" });
        cookies.remove('community_id', { path: "/" });
        window.location.href = '/login';
    }

    return (
        <div className="layout-topbar">
            <Link to="/" className="layout-topbar-logo">
                <img src={'assets/layout/images/logo-dark.svg'    } alt="logo" />
                <span>KATOIKIA</span>
            </Link>

            {/* <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars"/>
            </button> */}

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" >
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
                <li>
                    <button className="p-link layout-topbar-button" >
                        <i className="pi pi-user" />
                        <span>Profile</span>
                    </button>
                    <button type="button" onClick={() => cerrarSesion()}>Logout</button>
                </li>
            </ul>
        </div>
    );
}
