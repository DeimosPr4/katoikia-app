import React, { Component, Fragment, useRef } from 'react';
import Cookies from 'universal-cookie';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const baseUrl = 'http://localhost:4000/user/loginUser';
const cookies = new Cookies();

class LogInUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        email: '',
        password: '',
      },
      errorEmail: false,
      errorPassword: false,
      logged: null,
    };
  }

  handleChange = async (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  validaciones = (data) => {
    let error = false;
    if (data.email == '') {
      this.setState({
        errorEmail: true,
      });
      error = true;
    } else {
      this.setState({
        errorEmail: false,
      });
    }
    if (data.password == '') {
      this.setState({
        errorPassword: true,
      });
      error = true;
    } else {
      this.setState({
        errorPassword: false,
      });
    }

    return error;
  };

  iniciarSesion = async () => {
    const data = {
      email: this.state.form.email,
      password: this.state.form.password,
    };

    console.log(data);

    if (!this.validaciones(data)) {
      this.setState({
        email: true,
        password: true,
      });
      await fetch(baseUrl, {
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.status != 201)
            console.log('Ocurrió un error con el servicio: ' + response.status);
          else return response.json();
        })
        .then((response) => {
          console.log(response.message);

          if (response.message) {
            const user = response.message;

            if (user.user_type == '1' || user.user_type == '2') {
              cookies.set('id', user._id, { path: '/' });
              cookies.set('name', user.name, { path: '/' });
              cookies.set('email', user.email, { path: '/' });
              cookies.set('type', user.user_type, { path: '/' });
              if (user.user_type != '1') {
                cookies.set('community_id', user.community_id, { path: '/' });
              }
              // alert(`Bienvenido ${user.name}`);
              document.getElementById('notification').hidden = true;
              document.getElementById('notification2').hidden = false;

              document.getElementById(
                'message2',
              ).innerHTML = `Bienvenido ${user.name}`;

              window.location.href = '/';
            }
            window.location.href = '/page404';
          } else {
            document.getElementById('notification2').hidden = true;
            document.getElementById('notification').hidden = false;

            //alert('El usuario o la contraseña no son correctos');
            document.getElementById('message').innerHTML =
              'El usuario o la contraseña son incorrectos';
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  componentDidMount() {
    if (cookies.get('email')) {
      window.location.href = '/';
    }
  }

  renderErrorMessage = (name) =>
    name === this.state.errorMessages.name && (
      <div className="error">{this.state.errorMessages.message}</div>
    );

  errors = {
    email: 'Correo requerido',
    pass: 'Contraseña requerida',
  };

  render() {
    return (
      <Fragment>
        <div className="grid ">
          <div className="col-10 xl:col-8">
            <div
              id="notification"
              className="p-message p-message-error"
              hidden={true}
            >
              <div className="card">
                <h5 className="card-header" id="message"></h5>
              </div>
            </div>
            <div
              id="notification2"
              className="p-message p-message-success"
              hidden={true}
            >
              <div className="card">
                <h5 className="card-header" id="message2"></h5>
              </div>
            </div>
          </div>
          <div className="col-10 xl:col-8">
            <div className="card">
              <h5 className="card-header">Iniciar Sesión</h5>
              <div className="p-fluid formgrid grid">
                <div className="field col-12 md:col-12">
                  <label htmlFor="email">Correo electrónico</label>
                  <div className="p-0 col-12 md:col-12">
                    <div className="p-inputgroup">
                      <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                        <i className="pi pi-user"></i>
                      </span>
                      <InputText
                        id="email"
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                        placeholder="Correo electrónico"
                        className={this.state.errorEmail ? 'p-invalid' : ''}
                      />
                    </div>
                    {this.state.errorEmail && (
                      <small className="p-invalid">
                        Correo electrónico es requerido
                      </small>
                    )}
                  </div>
                </div>
                <div className="field col-12 md:col-12">
                  <label htmlFor="v">Contraseña</label>
                  <div className="p-0 col-12 md:col-12">
                    <div className="p-inputgroup">
                      <span className="p-inputgroup-addon p-button p-icon-input-khaki">
                        <i className="pi pi-lock"></i>
                      </span>
                      <InputText
                        id="password"
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        placeholder="Contraseña"
                        className={this.state.errorPassword ? 'p-invalid' : ''}
                      />
                    </div>
                    {this.state.errorPassword && (
                      <small className="p-invalid">
                        Contraseña es requerida
                      </small>
                    )}
                  </div>
                </div>

                <Button
                  label="Iniciar sesión"
                  type="button"
                  onClick={() => this.iniciarSesion()}
                ></Button>
                <Button
                  label="Restablecer Contraseña"
                  className="p-button-link"
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default LogInUser;
