import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form } from 'semantic-ui-react'

import { MULTIPLE_CHOICE, FREE_ANSWER } from '../constants'
import { addTask } from '../actions/currentActivityActions'
import { clearCurrentTask, setCurrentTaskTitle, setCurrentTaskDescription, setCurrentTaskType, setCurrentTaskPayload } from '../actions/currentTaskActions'

class TaskSetUpContainer extends Component {

  handleFormSubmit = () => {
    this.props.actions.addTask(this.props.fields)
    this.props.actions.clearCurrentTask()
    this.props.history.push("/activitySetup")
  }

  render() {

    const {
      fields,
      actions:{
        setCurrentTaskTitle,
        setCurrentTaskDescription,
        setCurrentTaskType,
        setCurrentTaskPayload,
      },
    } = this.props

    return (
      <div>
        <header> Creando tarea
        </header>
        <Form onSubmit={this.handleFormSubmit}>
          <Form.Input label='Título' value={fields.title} placeholder='Título' onChange={(event, { value }) => setCurrentTaskTitle(value)} required/>
          <Form.Input label='Descripción' value={fields.description} placeholder='Descripción' onChange={(event, { value }) => setCurrentTaskDescription(value)} required/>
          <Form.Select
            value={fields.type} 
            placeholder='Elija el tipo de tarea' 
            onChange={(event, { value }) => setCurrentTaskType(value)}
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
      clearCurrentTask,
      setCurrentTaskTitle,
      setCurrentTaskDescription,
      setCurrentTaskType,
      setCurrentTaskPayload
    }, dispatch)
  }
}

//Funcion que mapea el estado de la APLICACION (redux) con las props del componente
function mapStateToProps(
  {currentTaskReducer:{
    current,
    fields,
    editing,
  }}) {
  return {
    current,
    fields,
    editing,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TaskSetUpContainer))
