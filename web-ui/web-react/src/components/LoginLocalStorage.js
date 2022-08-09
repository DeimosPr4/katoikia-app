import DashboardAdmin from "./DashboardAdmin";
import React, { Component, Fragment } from 'react';
import Cookies from 'universal-cookie';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const baseUrl = "http://localhost:4000/user/loginUser";
const cookies = new Cookies();


class LoginLocalStorage extends Component {
    state = {
        form: {
            email: '',
            password: ''
        }, 
        errorMessages:{}
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

        console.log(data);

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
                    cookies.set('email', user.email, { path: "/" });
                    alert(`Bienvenido ${user.name}`);
                    window.location.href = "/";
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
            window.location.href = "/";
        }
    }

    renderErrorMessage = (name) =>
    name === this.state.errorMessages.name && (
      <div className="error">{this.state.errorMessages.message}</div>
    );

  errors = {
    email: "Correo requerido",
    pass: "Contraseña requerida"
  };

    render() {
        return (

            <Fragment>
              
                <div className="login-wrapper">

                    <div className="grid form justify-content-center my-5">
                        <div className="col-5">
                            <div className="card">
                                <h5>Iniciar Sesión</h5>
                                <div className="p-fluid formgrid grid">
                                    <div className="field col-12">
                                        <label htmlFor="email">Correo electrónico</label>
                                        <InputText id="email"
                                            type="email"
                                            name="email"
                                            onChange={this.handleChange}
                                            placeholder='Correo electrónico' />
                                        {this.renderErrorMessage("email")}
                                    </div>
                                    <div className="field col-12 ">
                                        <label htmlFor="password">Contraseña</label>
                                        <InputText id="password"
                                            type="password"
                                            name="password"
                                            onChange={this.handleChange}
                                            placeholder='Contraseña'
                                        />
                                        {this.renderErrorMessage("password")}
                                    </div>

                                    <Button label="Iniciar sesión" type="button" onClick={() => this.iniciarSesion()}></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>



        );
    }
}

export default LoginLocalStorage;