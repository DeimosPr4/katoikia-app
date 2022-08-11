import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import AdministradoresComunidad from '../components/AdministradoresComunidad';
import AdministradoresSistema from '../components/AdministradoresSistema';
import Communities from '../components/ComunidadViviendas';
import Dashboard from '../templates/Dashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppMenu } from '../AppMenu';
import { CSSTransition } from 'react-transition-group';

const cookies = new Cookies();

const menu = [
    {
        label: 'Home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Administradores del sistema', icon: 'pi pi-fw pi-id-card', to: '/administradoresSistema' },
            { label: 'Administradores de comunidad', icon: 'pi pi-fw pi-id-card', to: '/administradoresComunidad' },
            { label: 'Comunidadades', icon: 'pi pi-fw pi-id-card', to: '/comunidadesViviendas' },
        ]
    },
];

class MenuAdmin extends Component {

    constructor(){
        super()
        this.state = {
            layoutColorMode: 'light',
            layoutMode: 'static',
            menuClick: false, 
            mobileTopbarMenuClick: false,
            overlayMenuActive: false,
            mobileMenuActive: false
        }
    
    }
   
    onSidebarClick = () => {
        this.setState({
            menuClick: true
        })

    }

    onMenuItemClick = (event) => {
        if (!event.item.items) {
            this.state.overlayMenuActive = false;
            this.state.mobileMenuActive = false;  
            this.setState({
                overlayMenuActive: true,
                mobileMenuActive:false
            })
        
        }
    }

    cerrarSesion = () => {
        cookies.remove('id', { path: "/" });
        cookies.remove('email', { path: "/" });
        cookies.remove('name', { path: "/" });
        cookies.remove('type', { path: "/" });
        window.location.href = '/login';
    }

    componentDidMount() {
        if (!cookies.get('email')) {
            window.location.href = "/login";
        } 
    }

    render() {

        return (
            <div>
                Menu Principal
                <div className="layout-sidebar" onClick={this.onSidebarClick}>
                    <AppMenu model={menu} onMenuItemClick={this.onMenuItemClick} layoutColorMode={this.state.layoutColorMode} />
                    <button type="button" onClick={() => this.cerrarSesion()}>Logout</button>

                </div>

                <div className="layout-main-container">
                    <div className="layout-main">
                        <Route exact path="/" render={() => <Dashboard colorMode={this.state.layoutColorMode} />} />
                        <Route exact path="/administradoresSistema" component={AdministradoresSistema} />
                        <Route path="/administradoresComunidad" component={AdministradoresComunidad} />
                        <Route path="/comunidadesViviendas" component={Communities} />
                    </div>

                </div>
                <br />
                <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={this.state.mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>
            </div>
        );
    }
}

export default MenuAdmin;