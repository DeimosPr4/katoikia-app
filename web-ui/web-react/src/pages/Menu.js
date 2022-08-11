import React, { Component } from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Menu extends Component {
    cerrarSesion=()=>{
        cookies.remove('id', {path: "/"});
        cookies.remove('email', {path: "/"});
        cookies.remove('name', {path: "/"});
        window.location.href='/login';
    }

    componentDidMount() {
        if(!cookies.get('email')){
            window.location.href="./login";
        }
    }

    render() {
        console.log('id: '+ cookies.get('id'));
        console.log('name: '+cookies.get('name'));
        console.log('email: '+cookies.get('email'));
        return (
            <div>
                Menu Principal

                <br />
                <button onClick={()=>this.cerrarSesion()}>Cerrar Sesión</button>
            </div>
        );
    }
}

export default Menu;