import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import Inquilinos from './Inquilinos';
import GuardasSeguridad from './GuardasSeguridad';
import Dashboard from '../templates/Dashboard';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppMenu } from '../AppMenu';

const cookies = new Cookies();

const menu = [
    {
        label: 'Home',
        items: [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
            { label: 'Inquilinos', icon: 'pi pi-fw pi-id-card', to: '/inquilinos' },
            { label: 'Guardas de seguridad', icon: 'pi pi-fw pi-id-card', to: '/guardasSeguridad' },
        ]
    },
];

class MenuAdminCommunity extends Component {

    constructor() {
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
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })

        }
    }

    cerrarSesion = () => {
        cookies.remove('id', { path: "/" });
        cookies.remove('email', { path: "/" });
        cookies.remove('name', { path: "/" });
        cookies.remove('type', { path: "/" });
        cookies.remove('community_id', { path: "/" });
        window.location.href = '/login';
    }

    componentDidMount() {
        if (!cookies.get('email')) {
            window.location.href = "/login";
        }
    }


     onWrapperClick = (event) => {
        if (!this.state.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })
        }

        if (!this.state.mobileTopbarMenuClick) {
            this.setState({
                mobileTopbarMenuClick: false,
            })
        }

        this.setState({
            mobileTopbarMenuClick: false,
            menuClick: false
        })
    }

    render() {

        return (

            <div className={this.wrapperClass} onClick={this.onWrapperClick}>

                <div>
                    Menu Principal
                    <div className="layout-sidebar" onClick={this.onSidebarClick}>
                        <AppMenu model={menu} onMenuItemClick={this.onMenuItemClick} layoutColorMode={this.state.layoutColorMode} />
                        <button type="button" onClick={() => this.cerrarSesion()}>Logout</button>

                    </div>

                    <div className="layout-main-container">
                        <div className="layout-main">
                            <Route exact path="/" render={() => <Dashboard colorMode={this.state.layoutColorMode} />} />
                            <Route path="/inquilinos" component={Inquilinos} />
                            <Route path="/guardasSeguridad" component={GuardasSeguridad} />
                        </div>

                    </div>
                    <br />
                </div>
            </div>
        );
    }
}

export default MenuAdminCommunity;