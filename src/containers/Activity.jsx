import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, Divider, Header} from 'semantic-ui-react'

import { SUCCESS, PENDING, UNSET } from '../constants/status'
import StatusList from '../components/StatusList'
import ListItem from '../components/ListItem'
import {
  getActivity,
  saveActivity,
  updateActivity,
  setField,
} from '../actions/activities'
import {
  getTasks,
  deleteTask,
} from '../actions/tasks'

import '../styles/ActivitySetUp.css'

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
        updateActivity,
        deleteTask,
      }
    } = this.props

    return (activity_status === SUCCESS) ? (
      <div id="ActivitySetUp" className="background">
        <Header textAlign='center' >{(id===UNSET) ? 'Creando' : 'Editando'} actividad {title} : {description}</Header>
        <div className="ui raised very padded text container segment">
          <Form>
            <Form.Input name='title' label='Título' value={title} placeholder='Título' required
              onChange={this.handleFieldSet.bind(this)} />
            <Form.Input name='description' label='Descripción' value={description} placeholder='Descripción' required
              onChange={this.handleFieldSet.bind(this)} />
            <StatusList items={tasks} status={tasks_index_status} render_item={task =>
              (<ListItem
                name={task.name}
                key={task.id}
                load={() => history.push(`/activity/${id}/task/${task.id}`)}
                del={() => deleteTask(id,task.id)}
              />)}
            />
          </Form>
          <Divider/>
          <Button primary onClick={() => history.push(`/activity/${id}/task/new`)}>Agregar tarea</Button>
          <Button primary onClick={() => history.push(`/activity/${id}/workflow`)}>Workflow</Button>
          <Button primary
            onClick={() => {
              updateActivity(id,this.props.activity)
              history.push('/')
            }}
          >Guardar</Button>
          <Button primary onClick={() => history.push('/')}>Descartar</Button>
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
      deleteTask,
      getTasks,
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
