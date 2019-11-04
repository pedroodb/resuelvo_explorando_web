import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, Divider } from 'semantic-ui-react'

import { SUCCESS, PENDING, UNSET } from '../constants/status'
import StatusList from '../components/StatusList'
import {
  initCurrentTask,
} from '../actions/currentTaskActions'
import {
  getActivity,
  saveActivity,
  updateActivity,
  setField,
} from '../actions/activities'
import {
  getTasks,
} from '../actions/tasks'

import '../styles/General.css'

class ActivitySetUpContainer extends Component {

  componentDidMount(){
    const {
      getActivity,
      getTasks,
    } = this.props.actions
    getActivity(this.props.match.params.id)
    getTasks(this.props.match.params.id)
  }

  handleFieldSet = (event, { value, name }) => this.props.actions.setField(name,value)

  render() {

    const {
      history,
      activity: {
        title,
        description,
        id,
      },
      activity_status,
      tasks,
      tasks_index_status,
      actions: {
        saveActivity,
        updateActivity,
        initCurrentTask,
      }
    } = this.props

    return (activity_status === SUCCESS) ? (
      <div className="background">
        <div className="container">
          <header>{(id===UNSET) ? 'Creando' : 'Editando'} actividad {title} : {description}</header>
          <Form>
            <Form.Input name='title' label='Título' value={title} placeholder='Título' required
              onChange={this.handleFieldSet.bind(this)} />
            <Form.Input name='description' label='Descripción' value={description} placeholder='Descripción' required
              onChange={this.handleFieldSet.bind(this)} />
            <StatusList items={tasks} status={tasks_index_status} render_item={task => task.title}/>
          </Form>
          <Divider/>
          <Button onClick={() => {
            initCurrentTask()
            history.push("/activityCreation/taskSetUp")
          }}>Agregar tarea</Button>
          <Button
            onClick={() => {
              if (id===UNSET) {
                saveActivity({...this.props.activity,id:undefined})
              } else {
                updateActivity(id,this.props.activity)
              }
              history.push('/')
            }}
          >Guardar</Button>
          <Button onClick={() => history.push('/')}>Descartar</Button>
        </div>
      </div>
    ) : null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      setField,
      getActivity,
      saveActivity,
      updateActivity,
      getTasks,
      initCurrentTask,
    }, dispatch)
  }
}

function mapStateToProps({activities: activityReducer,tasks: taskReducer}) {
  const {
    index:{
      tasks,
      status: tasks_index_status,
    }
  } = taskReducer
  const {
    get:{
      activity,
      status: activity_status
    }
  } = activityReducer
  return {
    tasks,
    tasks_index_status,
    activity,
    activity_status,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ActivitySetUpContainer))
