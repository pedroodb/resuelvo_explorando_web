import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Button, Divider } from 'semantic-ui-react'

import { MULTIPLE_CHOICE, FREE_ANSWER } from '../constants'
import { addTask, editTask, removeTask } from '../actions/currentActivity'
import { clearCurrentTask, setCurrentTaskField, setCurrentTaskType } from '../actions/currentTaskActions'
import taskTypesDictionary from '../helpers/TaskTypesDictionary'
import '../styles/General.css'

class TaskSetUpContainer extends Component {

  constructor(props) {
    super(props)

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleTaskRemoval = this.handleTaskRemoval.bind(this)
  }

  handleFormSubmit = (shouldSubmit) => {
    const {
      editing,
      history,
      task,
      actions:{
        editTask,
        addTask,
        clearCurrentTask,
      },
    } = this.props

    if(shouldSubmit) {
      (editing ?
        editTask(task) :
        addTask(task))
    }
    clearCurrentTask()
    history.push("/activityCreation/activitySetup")
  }

  handleTaskRemoval = () => {
    const {
      history,
      task,
      actions:{
        removeTask,
        clearCurrentTask,
      },
    } = this.props

    removeTask(task)
    clearCurrentTask()
    history.push("/activityCreation/activitySetup")    
  }

  render() {

    const {
      task,
      editing,
      actions:{
        setCurrentTaskField,
        setCurrentTaskType,
      },
    } = this.props

    return (
      <div className="background">
        <div className="container">
          <header>Creando tarea</header>
          <Form>
            <Form.Input name='title' label='Título' value={task.title} placeholder='Título' onChange={(event, { value, name }) => setCurrentTaskField(name,value)} required/>
            <Form.Input name='description' label='Descripción' value={task.description} placeholder='Descripción' onChange={(event, { value, name }) => setCurrentTaskField(name,value)} required/>
            <Form.Select
              name='type'
              value={task.type} 
              placeholder='Elija el tipo de tarea' 
              onChange={(event, { value }) => setCurrentTaskType(value,taskTypesDictionary[value].defaultPayload)}
              options={[
                { text:'Multiple Choice', value:MULTIPLE_CHOICE },
                { text:'Respuesta libre', value:FREE_ANSWER },
              ]}
            />
          </Form>
          { task.type !== null ? taskTypesDictionary[task.type].componentToRender : null }
          <Divider/>
          <Button content='Confirmar' onClick={() => this.handleFormSubmit(true)}/>
          <Button content='Cancelar' onClick={() => this.handleFormSubmit(false)}/>
          { editing ? (<Button content='Eliminar' onClick={this.handleTaskRemoval}/>) : null }
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      addTask,
      editTask,
      removeTask,
      clearCurrentTask,
      setCurrentTaskField,
      setCurrentTaskType,
    }, dispatch)
  }
}

function mapStateToProps({currentTaskReducer}) {
  const {
    task,
    editing,
  } = currentTaskReducer
  return {
    task,
    editing,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TaskSetUpContainer))