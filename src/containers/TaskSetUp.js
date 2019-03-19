import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form } from 'semantic-ui-react'

class TaskSetUpContainer extends Component {

  constructor(props) {
    super(props)

    this.handleFormChange = this.handleFormChange.bind(this)

    this.state = {
      ...this.props.task
    }
  }

  handleFormChange(event) {
    let newState = {}
    newState[event.target.name] = event.target.value
    this.setState(() => ({...newState}))
  }

  render() {

    const {
      history
    } = this.props

    return (
      <div>
        <header> Creando tarea
        </header>
        <Form>
          <Form.Field>
            <label>Titulo</label>
            <Form.Input name='title' placeholder='Titulo' onChange={this.handleFormChange} />
          </Form.Field>
          <Form.Field>
            <label>Descripcion</label>
            <input name='description' placeholder='Descripcion' onChange={this.handleFormChange} />
          </Form.Field>
          <Button onClick={() => history.push("/taskSetUp")}>Agregar tarea</Button>
        </Form>
      </div>
    )
  }
}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({

    }, dispatch)
  }
}

//Funcion que mapea el estado de la APLICACION (redux) con las props del componente
function mapStateToProps({currentTaskReducer}) {
  return {
    task:currentTaskReducer
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskSetUpContainer)
