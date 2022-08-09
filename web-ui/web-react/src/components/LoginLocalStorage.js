import DashboardAdmin from "./DashboardAdmin";
import React, { Component, Fragment } from 'react';
import Cookies from 'universal-cookie';
import { InputText } from 'primereact/inputtext';

const baseUrl = "http://localhost:4000/user/loginUser";
const cookies = new Cookies();


class LoginLocalStorage extends Component {
    state = {
        form: {
            username: '',
            password: ''
        }
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    iniciarSesion = async () => {
        const data = {
            email: this.state.form.email,
            password: this.state.form.password
        }

        await fetch(baseUrl, {
            cache: 'no-cache',
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return response.json();
            })
            .then(response => {
                console.log(response.message);
                if (response.message) {
                    const user = response.message;
                    cookies.set('id', user._id, { path: "/" });
                    cookies.set('name', user.name, { path: "/" });
                    cookies.set('email', user.username, { path: "/" });
                    alert(`Bienvenido ${user.name}`);
                    window.location.href = "./menu";
                } else {
                    alert('El usuario o la contraseña no son correctos');
                }
            })
            .catch(error => {
                console.log(error);
            })



    }

    componentDidMount() {
        if (cookies.get('email')) {
            window.location.href = "./menu";
        }
    }


    render() {
        return (

            <Fragment>
                <div className="grid">
                    <div className="col-12">
                        <div className="card">
                            <h5>Iniciar Sesión</h5>
                            <div className="p-fluid formgrid grid">
                                <div className="field col-12">
                                    <label htmlFor="correo">Correo electrónico</label>
                                    <InputText id="correo" type="email" placeholder='Correo electrónico' onChange={this.handleChange} />
                                </div>
                                <div className="field col-12 ">
                                    <label htmlFor="contrasenna">Contraseña</label>
                                    <InputText id="contrasenna" type="password" placeholder='Contraseña' onChange={this.handleChange} />
                                </div>

                                <button className="btn btn-primary" onClick={() => this.iniciarSesion()}>Iniciar Sesión</button>
                            </div>
                        </div>
                    </div>
                </div>

            </Fragment>



        );
    }
}

export default LoginLocalStorage;