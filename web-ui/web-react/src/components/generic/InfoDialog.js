import React from 'react'

class InfoDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openInfoDialog: false,
    }
  }
  render() {
    return (
      <Dialog
        visible={this.state.openInfoDialog}
        style={{ width: '650px' }}
        modal
        className='p-fluid'
        header={this.props.header}
        footer={this.props.footer}
      >
        <div className='container text-center'>
          <div className='row my-4'>
            <div className='col-4 md:col-4'>
              <p>Nombre</p>
              <div className='p-0 col-2 md:col-2' style={{ margin: '0 auto' }}>
                <div className='p-inputgroup align-items-center justify-content-evenly'>
                  <i className='pi pi-user icon-khaki' />
                  <p>{this.props.info.name}</p>
                </div>
              </div>
              <div className='col-4 md:col-4'>
                <p>Apellido(s)</p>
                <div
                  className='p-0 col-2 md:col-2'
                  style={{ margin: '0 auto' }}
                >
                  <div className='p-inputgroup align-items-center justify-content-evenly'>
                    <i className='pi pi-user icon-khaki' />
                    <p>{this.props.info.last_name}</p>
                  </div>
                </div>
              </div>
              <div className='col-4 md:col-4'>
                <p>Identificación</p>
                <div
                  className='p-0 col-2 md:col-2'
                  style={{ margin: '0 auto' }}
                >
                  <div className='p-inputgroup align-items-center justify-content-evenly'>
                    <i className='pi pi-user icon-khaki' />
                    <p>{this.props.info.dni}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='row my-5 justify-content-center'>
              <div className=' col-4 md:col-4'>
                <p>Teléfono</p>
                <div className='p-0 col-10 md:col-10'>
                  <div className='p-inputgroup align-items-center justify-content-evenly'>
                    <i className='pi pi-phone icon-khaki'></i>
                    <p>{this.props.info.phone}</p>
                  </div>
                </div>
              </div>
              <div className=' col-6 md:col-6'>
                <p>Correo Electrónico</p>
                <div
                  className='p-0 col-10  md:col-10'
                  style={{ margin: '0 auto' }}
                >
                  <div className='p-inputgroup align-items-center justify-content-evenly'>
                    <i className='pi pi-envelope icon-khaki'></i>
                    <p>{this.props.info.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    )
  }
}
