import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Button, Divider } from 'semantic-ui-react'

import {
  MULTIPLE_CHOICE,
  FREE_ANSWER,
} from '../constants/taskTypes'
import {
  getTask,
  updateTask,
  deleteTask,
  setCurrentTaskField,
  setCurrentTaskType,
} from '../actions/tasks'
import TaskTypesHelper from '../helpers/taskTypesHelper'
import TaskBuilder from '../components/taskSetUpComponents/TaskBuilder.jsx'
import '../styles/General.css'
import { SUCCESS, OUTDATED } from '../constants/status'

class TaskSetUpContainer extends Component {

  componentDidMount() {
    const {
      id,
      fk,
    } = this.props.match.params
    this.props.actions.getTask(id,fk)
  }

  render() {

    const {
      task,
      status,
      history,
      actions:{
        setCurrentTaskField,
        setCurrentTaskType,
        updateTask,
        deleteTask,
      },
      match:{
        params:{
          id:activity_id
        }
      }
    } = this.props

    return (status === SUCCESS || status === OUTDATED) ? (
      <div className="background">
        <div className="ui raised very padded text container segment">
          <header>Creando tarea</header>
          <Form>
            <Form.Input required name='name' label='Nombre' value={task.name} placeholder='Título' onChange={(event, { value, name }) => setCurrentTaskField(name,value)} required/>
            <Form.Input required name='description' label='Descripción' value={task.description} placeholder='Descripción' onChange={(event, { value, name }) => setCurrentTaskField(name,value)} required/>
            <Form.Select
              name='type'
              value={task.type} 
              placeholder='Elija el tipo de tarea' 
              onChange={(event, { value }) => setCurrentTaskType(value,TaskTypesHelper[value].defaultPayload)}
              options={[
                { text:'Multiple Choice', value:MULTIPLE_CHOICE },
                { text:'Respuesta libre', value:FREE_ANSWER },
              ]}
            />
          </Form>
          <TaskBuilder type={task.type} payload={task.payload}/>
          <Divider/>
          <Button content='Confirmar' onClick={() => {
            updateTask(activity_id,task.id,task)
            history.push(`/Activity/${activity_id}`)
          }}/>
          <Button content='Cancelar' onClick={() => history.push(`/Activity/${activity_id}`)}/>
          <Button content='Eliminar' onClick={() => deleteTask(activity_id,task)}/>
        </div>
      </div>
    ) : null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      getTask,
      updateTask,
      deleteTask,
      setCurrentTaskField,
      setCurrentTaskType,
    }, dispatch)
  }
}

function mapStateToProps({tasks}) {
  const {
    get:{
      task,
      status,
    }
  } = tasks
  return {
    task,
    status,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TaskSetUpContainer))
