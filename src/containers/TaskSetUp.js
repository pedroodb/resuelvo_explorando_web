import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Button } from 'semantic-ui-react'

import { MULTIPLE_CHOICE, FREE_ANSWER } from '../constants'
import { addTask, editTask } from '../actions/currentActivityActions'
import { clearCurrentTask, setCurrentTaskField } from '../actions/currentTaskActions'

class TaskSetUpContainer extends Component {

  handleFormSubmit = () => {
    this.props.editing ?
      this.props.actions.editTask(this.props.task) :
      this.props.actions.addTask(this.props.task)
    this.props.actions.clearCurrentTask()
    this.props.history.push("/activitySetup")
  }

  handleFormCancel = () => {
    this.props.actions.clearCurrentTask()
    this.props.history.push("/activitySetup")
  }

  render() {

    const {
      task,
      actions:{
        setCurrentTaskField,
      },
    } = this.props

    return (
      <div>
        <header> Creando tarea
        </header>
        <Form>
          <Form.Input name='title' label='Título' value={task.title} placeholder='Título' onChange={(event, { value, name }) => setCurrentTaskField(name,value)} required/>
          <Form.Input name='description' label='Descripción' value={task.description} placeholder='Descripción' onChange={(event, { value, name }) => setCurrentTaskField(name,value)} required/>
          <Form.Select
            name='type'
            value={task.type} 
            placeholder='Elija el tipo de tarea' 
            onChange={(event, { value, name }) => setCurrentTaskField(name,value)}
            options={[
              { text:'Multiple Choice', value:MULTIPLE_CHOICE },
              { text:'Respuesta libre', value:FREE_ANSWER },
            ]}
          />
        </Form>
        <Button content='Confirmar' onClick={this.handleFormSubmit.bind(this)}/>
        <Button content='Cancelar' onClick={this.handleFormCancel.bind(this)}/>
      </div>
    )
  }
}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      addTask,
      editTask,
      clearCurrentTask,
      setCurrentTaskField,
    }, dispatch)
  }
}

//Funcion que mapea el estado de la APLICACION (redux) con las props del componente
function mapStateToProps(
  {currentTaskReducer:{
    task,
    editing,
  }}) {
  return {
    task,
    editing,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TaskSetUpContainer))
