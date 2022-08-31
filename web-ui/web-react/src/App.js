import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { BrowserRouter, Switch, Route, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppConfig } from './AppConfig';

import Dashboard from './templates/Dashboard';
import ButtonDemo from './templates/ButtonDemo';
import ChartDemo from './templates/ChartDemo';
import Documentation from './templates/Documentation';
import FileDemo from './templates/FileDemo';
import FloatLabelDemo from './templates/FloatLabelDemo';
import FormLayoutDemo from './templates/FormLayoutDemo';
import InputDemo from './templates/InputDemo';
import ListDemo from './templates/ListDemo';
import MenuDemo from './templates/MenuDemo';
import MessagesDemo from './templates/MessagesDemo';
import MiscDemo from './templates/MiscDemo';
import OverlayDemo from './templates/OverlayDemo';
import MediaDemo from './templates/MediaDemo';
import PanelDemo from './templates/PanelDemo';
import TableDemo from './templates/TableDemo';
import TreeDemo from './templates/TreeDemo';
import InvalidStateDemo from './templates/InvalidStateDemo';
import BlocksDemo from './templates/BlocksDemo';
import IconsDemo from './templates/IconsDemo';
import AdministradoresSistema from './components/AdministradoresSistema';
import AdministradoresComunidad from './components/AdministradoresComunidad';
import GuardasSeguridad from './components/GuardasSeguridad';
import Communities from './components/ComunidadViviendas';
import Inquilinos from './components/Inquilinos';
import RegistroComunicado from './components/RegistroComunicado';
import InvitadosComunidad from './components/InvitadosComunidad';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Crud from './pages/Crud';
import EmptyPage from './pages/EmptyPage';
import TimelineDemo from './pages/TimelineDemo';

import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import './App.scss';
import { PrimeIcons } from 'primereact/api';
import AreasComunes from './components/AreasComunes';
import { useCookies } from "react-cookie";
import LogInUser from './components/LogInUser';
import Page404 from './components/Page404'
import Reservaciones from './components/Reservaciones';
import PerfilAdminComunidad from './components/PerfilAdminComunidad';


const App = () => {
    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('light')
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();
    const [cookies, setCookies] = useCookies();
    const [logged, setLogged] = useState()

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, 'body-overflow-hidden');
        } else {
            removeClass(document.body, 'body-overflow-hidden');
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef &&
            copyTooltipRef.current &&
            copyTooltipRef.current.updateTargetEvents();
    }, [location]);







    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode);
    };

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode);
    };

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    };

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            } else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };
    const isDesktop = () => {
        return window.innerWidth >= 992;
    };

    const menu2 = [
        {
            label: 'Inicio',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
                { label: 'Administradores del sistema', icon: PrimeIcons.USERS, to: '/administradoresSistema' },
                { label: 'Administradores de comunidad', icon: PrimeIcons.USERS, to: '/administradoresComunidad' },
                { label: 'Comunidades', icon: PrimeIcons.BUILDING, to: '/comunidadesViviendas' },
            ]
        }
    ]


    const menu3 = [
        {
            label: 'Inicio',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
                { label: 'Inquilinos', icon: PrimeIcons.USERS, to: '/inquilinos' },
                { label: 'Guardas de seguridad', icon: PrimeIcons.LOCK, to: '/guardasSeguridad' },
                {
                    label: 'Áreas Comunes de Comunidad',
                    icon: PrimeIcons.BUILDING,
                    to: '/areasComunes',
                },
                { label: 'Comunicados', icon: PrimeIcons.COMMENTS, to: '/registroComunicado' },
                { label: 'Invitados', icon: PrimeIcons.USERS, to: '/invitadosComunidad' },
                { label: 'Reservaciones', icon: PrimeIcons.CALENDAR, to: '/reservaciones'},
            ]
        },
    ]

    const menuLogin = [
        {
            label: 'Inicio',
            items: [
                {
                    label: 'Inicio de sesion',
                    icon: PrimeIcons.BUILDING,
                    to: '/login'
                },
            ]
        },
    ]

    function menu4() {
        if (cookies.type == '1') {
            return menu2;
        } else if (cookies.type == '2') {
            return menu3;
        } else {
            return menuLogin;
        }
    }

    const menu = [
        {
            label: 'Inicio',
            items:
                [
                    {
                        label: 'Administradores del sistema',
                        icon: PrimeIcons.USERS,
                        to: '/administradoresSistema',
                    },
                    {
                        label: 'Administradores de comunidad',
                        icon: PrimeIcons.USERS,
                        to: '/administradoresComunidad',
                    },
                    {
                        label: 'Guardas de seguridad',
                        icon: PrimeIcons.LOCK,
                        to: '/guardasSeguridad',
                    },
                    {
                        label: 'Comunidades',
                        icon: PrimeIcons.BUILDING,
                        to: '/comunidadesViviendas',
                    },
                    {
                        label: 'Inquilinos',
                        icon: PrimeIcons.USER,
                        to: '/inquilinos'
                    },
                    {
                        label: 'Áreas Comunes de Comunidad',
                        icon: PrimeIcons.BUILDING,
                        to: '/areasComunes',
                    },
                    { label: 'Log in', icon: 'pi pi-fw pi-id-card', to: '/logIn' },
                ],
        },
        {
            label: 'UI Components',
            icon: 'pi pi-fw pi-sitemap',
            items: [
                {
                    label: 'Form Layout',
                    icon: 'pi pi-fw pi-id-card',
                    to: '/formlayout',
                },
                { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/input' },
                {
                    label: 'Float Label',
                    icon: 'pi pi-fw pi-bookmark',
                    to: '/floatlabel',
                },
                {
                    label: 'Invalid State',
                    icon: 'pi pi-fw pi-exclamation-circle',
                    to: 'invalidstate',
                },
                { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/button' },
                { label: 'Table', icon: 'pi pi-fw pi-table', to: '/table' },
                { label: 'List', icon: 'pi pi-fw pi-list', to: '/list' },
                { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/tree' },
                { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/panel' },
                { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/overlay' },
                { label: 'Media', icon: 'pi pi-fw pi-image', to: '/media' },
                { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/menu' },
                { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/messages' },
                { label: 'File', icon: 'pi pi-fw pi-file', to: '/file' },
                { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/chart' },
                { label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/misc' },
            ],
        },
        {
            label: 'UI Blocks',
            items: [
                {
                    label: 'Free Blocks',
                    icon: 'pi pi-fw pi-eye',
                    to: '/blocks',
                    badge: 'NEW',
                },
                {
                    label: 'All Blocks',
                    icon: 'pi pi-fw pi-globe',
                    url: 'https://www.primefaces.org/primeblocks-react',
                },
            ],
        },
        {
            label: 'Icons',
            items: [{ label: 'PrimeIcons', icon: 'pi pi-fw pi-prime', to: '/icons' }],
        },
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-clone',
            items: [
                { label: 'Crud', icon: 'pi pi-fw pi-user-edit', to: '/crud' },
                { label: 'Timeline', icon: 'pi pi-fw pi-calendar', to: '/timeline' },
                { label: 'Empty', icon: 'pi pi-fw pi-circle-off', to: '/empty' },
            ],
        },
        {
            label: 'Menu Hierarchy',
            icon: 'pi pi-fw pi-search',
            items: [
                {
                    label: 'Submenu 1',
                    icon: 'pi pi-fw pi-bookmark',
                    items: [
                        {
                            label: 'Submenu 1.1',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-bookmark' },
                            ],
                        },
                        {
                            label: 'Submenu 1.2',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-bookmark' },
                            ],
                        },
                    ],
                },
                {
                    label: 'Submenu 2',
                    icon: 'pi pi-fw pi-bookmark',
                    items: [
                        {
                            label: 'Submenu 2.1',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-bookmark' },
                            ],
                        },
                        {
                            label: 'Submenu 2.2',
                            icon: 'pi pi-fw pi-bookmark',
                            items: [
                                { label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-bookmark' },
                            ],
                        },
                    ],
                },
            ],
        },
    ];

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += ' ' + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else
            element.className = element.className.replace(
                new RegExp(
                    '(^|\\b)' + className.split(' ').join('|') + '(\\b|$)',
                    'gi',
                ),
                ' ',
            );
    };

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive':
            staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active':
            overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light',
    });




    return (

        <BrowserRouter>
            <Switch>

                <div className={wrapperClass} onClick={onWrapperClick}>


                    <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

                    <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                        mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

                    <div className="layout-sidebar" onClick={onSidebarClick}>
                        <AppMenu model={menu4()} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
                    </div>

                    <div className="layout-main-container">
                        <div className="layout-main">
                            {(() => {
                                if (!cookies.email) {
                                    return (
                                        <>

                                            <Route path="/login" exact component={LogInUser} />
                                        </>

                                    )
                                } else {

                                    if (cookies.type == '1') {
                                        return (
                                            <>
                                                <Route path="/" exact render={() => <Dashboard colorMode={layoutColorMode} location={location} />} />
                                                <Route path="/administradoresSistema" component={AdministradoresSistema} />
                                                <Route path="/administradoresComunidad" component={AdministradoresComunidad} />
                                                <Route path="/comunidadesViviendas" component={Communities} />
                                            </>

                                        )

                                    } else if (cookies.type == '2') {
                                        return (
                                            <>
                                                <Route path="/" exact render={() => <Dashboard colorMode={layoutColorMode} location={location} />} />
                                                <Route path="/guardasSeguridad" component={GuardasSeguridad} />
                                                <Route path="/inquilinos" component={Inquilinos} />
                                                <Route path="/areasComunes" component={AreasComunes} />
                                                <Route path="/reservaciones" component={Reservaciones} />
                                                <Route path="/registroComunicado" component={RegistroComunicado} />
                                                <Route path="/invitadosComunidad" component={InvitadosComunidad} />
                                                <Route path="/pefilAdminComunidad" component={PerfilAdminComunidad} />
                                            </>
                                        )
                                    } else {
                                        return (
                                            <Route path="/page404" exact component={Page404} />
                                        )
                                    }


                                    return (
                                        <>
                                            <Route path="/" exact render={() => <Dashboard colorMode={layoutColorMode} location={location} />} />
                                            <Route path="/formlayout" component={FormLayoutDemo} />
                                            <Route path="/input" component={InputDemo} />
                                            <Route path="/floatlabel" component={FloatLabelDemo} />
                                            <Route path="/invalidstate" component={InvalidStateDemo} />
                                            <Route path="/button" component={ButtonDemo} />
                                            <Route path="/table" component={TableDemo} />
                                            <Route path="/list" component={ListDemo} />
                                            <Route path="/tree" component={TreeDemo} />
                                            <Route path="/panel" component={PanelDemo} />
                                            <Route path="/overlay" component={OverlayDemo} />
                                            <Route path="/media" component={MediaDemo} />
                                            <Route path="/menu" component={MenuDemo} />
                                            <Route path="/messages" component={MessagesDemo} />
                                            {/*<Route path="/blocks" component={BlocksDemo} />*/}
                                            <Route path="/icons" component={IconsDemo} />
                                            <Route path="/file" component={FileDemo} />
                                            <Route path="/chart" render={() => <ChartDemo colorMode={layoutColorMode} location={location} />} />
                                            <Route path="/misc" component={MiscDemo} />
                                            <Route path="/timeline" component={TimelineDemo} />
                                            <Route path="/crud" component={Crud} />
                                            <Route path="/empty" component={EmptyPage} />
                                            <Route path="/documentation" component={Documentation} />
                                        </>

                                    )

                                }
                            })()}

                        </div>

                        <AppFooter layoutColorMode={layoutColorMode} />
                    </div>

                    <AppConfig />

                    <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                        <div className="layout-mask p-component-overlay"></div>
                    </CSSTransition>
                </div>
            </Switch>
        </BrowserRouter>

    );

}

export default App;
