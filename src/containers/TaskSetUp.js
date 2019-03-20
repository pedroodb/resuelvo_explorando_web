import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form } from 'semantic-ui-react'

import { MULTIPLE_CHOICE, FREE_ANSWER } from '../constants'
import { addTask } from '../actions/currentActivityActions'
import { clearTask } from '../actions/currentTaskActions'

class TaskSetUpContainer extends Component {

  constructor(props) {
    super(props)

    this.handleFormChange = this.handleFormChange.bind(this)

    this.state = {
      task:this.props.task,
    }
  }

  handleFormChange = (event, { name, value }) => this.setState(({task}) => ({ task:{...task,[name]:value} }))

  handleFormSubmit = () => {
    this.props.actions.addTask(this.state.task)
    this.props.actions.clearTask()
    this.props.history.push("/activitySetup")
  }

  render() {

    const {
      task,
    } = this.state

    return (
      <div>
        <header> Creando tarea
        </header>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Input name='title' label='Título' value={task.title} placeholder='Título' onChange={this.handleFormChange} />
          <Form.Input name='description' label='Descripción' value={task.description} placeholder='Descripción' onChange={this.handleFormChange} />
          <Form.Select name='type' 
            value={task.type} 
            placeholder='Elija el tipo de tarea' 
            onChange={this.handleFormChange}
            options={[
              { text:'Multiple Choice', value:MULTIPLE_CHOICE },
              { text:'Respuesta libre', value:FREE_ANSWER },
            ]}
          />
          <Form.Button content='Agregar tarea' />
        </Form>
      </div>
    )
  }
}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      addTask,
      clearTask,
    }, dispatch)
  }
}

//Funcion que mapea el estado de la APLICACION (redux) con las props del componente
function mapStateToProps({currentTaskReducer}) {
  return {
    task:currentTaskReducer
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TaskSetUpContainer))
