import React from 'react'

class InfoDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }
  render() {
    return (
      <Dialog
        visible={this.state.open}
        style={{ width: '650px' }}
        modal
        className='p-fluid'
        header='Información'
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
              <div className='p-0 col-2 md:col-2' style={{ margin: '0 auto' }}>
                <div className='p-inputgroup align-items-center justify-content-evenly'>
                  <i className='pi pi-user icon-khaki' />
                  <p>{this.props.info.last_name}</p>
                </div>
              </div>
            </div>
            <div className='col-4 md:col-4'>
              <p>Identificación</p>
              <div className='p-0 col-2 md:col-2' style={{ margin: '0 auto' }}>
                <div className='p-inputgroup align-items-center justify-content-evenly'>
                  <i className='pi pi-user icon-khaki' />
                  <p>{this.props.info.dni}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    )
  }
}
