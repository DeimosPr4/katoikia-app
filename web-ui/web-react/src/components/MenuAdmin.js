import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import AdministradoresComunidad from '../components/AdministradoresComunidad';
import AdministradoresSistema from '../components/AdministradoresSistema';
import Communities from '../components/ComunidadViviendas';
import Dashboard from '../templates/Dashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
const cookies = new Cookies();


const menu = [
    {
        label: 'Home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Administradores del sistema', icon: 'pi pi-fw pi-id-card', to: '/administradoresSistema' },
            { label: 'Administradores de comunidad', icon: 'pi pi-fw pi-id-card', to: '/administradoresComunidad' },
            { label: 'Comunidadades', icon: 'pi pi-fw pi-id-card', to: '/comunidadesViviendas' },
            { label: 'Log out', icon: 'pi pi-fw pi-id-card', to: '/logOut' }
        ]
    },
];


const handleLogout = () => {
    cookies.remove('id', { path: "/" });
    cookies.remove('email', { path: "/" });
    cookies.remove('name', { path: "/" });
    window.location.href = '/';
}

class MenuAdmin extends Component {

    state = {
        layoutColorMode: 'light',
        layoutMode: 'static',

    }


    cerrarSesion = () => {
        cookies.remove('id', { path: "/" });
        cookies.remove('email', { path: "/" });
        cookies.remove('name', { path: "/" });
        window.location.href = '/';
    }

    componentDidMount() {
        if (!cookies.get('email')) {
            window.location.href = "./";
        }
    }

    render() {

        return (
            <div>
                Menu Principal
                <div className="layout-sidebar" onClick={onSidebarClick}>
                    <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
                </div>

                <div className="layout-main-container">
                    <div className="layout-main">
                        <Route exact path="/" render={() => <Dashboard colorMode={this.state.layoutColorMode} />} />
                        <Route exact path="/administradoresSistema" component={AdministradoresSistema} />
                        <Route path="/administradoresComunidad" component={AdministradoresComunidad} />
                        <Route path="/comunidadesViviendas" component={Communities} />
                        <button onClick={this.cerrarSesion}>Logout</button>
                    </div>

                </div>
                <br />
                <button onClick={() => this.cerrarSesion()}>Cerrar Sesión</button>
            </div>
        );
    }
}

export default MenuAdmin;