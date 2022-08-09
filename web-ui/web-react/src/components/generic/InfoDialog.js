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
      ></Dialog>
    )
  }
}
