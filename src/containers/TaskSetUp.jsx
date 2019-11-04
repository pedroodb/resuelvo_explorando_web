import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Button, Divider } from 'semantic-ui-react'

import {
  MULTIPLE_CHOICE,
  FREE_ANSWER,
} from '../constants/taskTypes'
import {
  UNSET,
} from '../constants/status'
import {
  saveTask,
  updateTask,
  deleteTask,
} from '../actions/tasks'
import {
  clearCurrentTask,
  setCurrentTaskField,
  setCurrentTaskType,
} from '../actions/currentTaskActions'
import TaskTypesHelper from '../helpers/taskTypesHelper'
import TaskBuilder from '../components/taskSetUpComponents/TaskBuilder.jsx'
import '../styles/General.css'

class TaskSetUpContainer extends Component {

  render() {

    const {
      title,
      description,
      type,
      code,
      payload,
      editing,
      actions:{
        setCurrentTaskField,
        setCurrentTaskType,
        clearCurrentTask,
        editTask,
        addTask,
        removeTask,
      },
    } = this.props

    const task = {title, description, type, code, payload}

    return title === UNSET ? (
      <Redirect to='/activityCreation/activitySetUp' />
    ) : 
    (
      <div className="background">
        <div className="container">
          <header>Creando tarea</header>
          <Form>
            <Form.Input name='title' label='Título' value={title} placeholder='Título' onChange={(event, { value, name }) => setCurrentTaskField(name,value)} required/>
            <Form.Input name='description' label='Descripción' value={description} placeholder='Descripción' onChange={(event, { value, name }) => setCurrentTaskField(name,value)} required/>
            <Form.Select
              name='type'
              value={type} 
              placeholder='Elija el tipo de tarea' 
              onChange={(event, { value }) => setCurrentTaskType(value,TaskTypesHelper[value].defaultPayload)}
              options={[
                { text:'Multiple Choice', value:MULTIPLE_CHOICE },
                { text:'Respuesta libre', value:FREE_ANSWER },
              ]}
            />
          </Form>
          <TaskBuilder type={type} payload={payload}/>
          <Divider/>
          <Button content='Confirmar' onClick={() => (editing ? editTask(task) : addTask(task))}/>
          <Button content='Cancelar' onClick={() => clearCurrentTask()}/>
          { editing ? (<Button content='Eliminar' onClick={() => removeTask(task)}/>) : null }
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      addTask: saveTask,
      editTask: updateTask,
      removeTask: deleteTask,
      clearCurrentTask,
      setCurrentTaskField,
      setCurrentTaskType,
    }, dispatch)
  }
}

function mapStateToProps({currentTask,currentActivity}) {
  const {
    title,
    description,
    code,
    type,
    payload,
  } = currentTask
  return {
    title,
    description,
    code,
    type,
    payload,
    editing:(code!==UNSET),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TaskSetUpContainer))
