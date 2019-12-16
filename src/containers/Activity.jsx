import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, Divider, Header } from 'semantic-ui-react'

import { SUCCESS, UNSET, OUTDATED } from '../constants/status'
import { TASK } from '../constants/helpers'
import StatusList from '../components/StatusList'
import ListItem from '../components/ListItem'
import CreationModal from '../components/CreationModal'
import {
  getActivity,
  saveActivity,
  updateActivity,
  setField,
} from '../actions/activities'
import {
  getTasks,
  deleteTask,
  getTask,
  saveTask,
  resetGet,
  setCurrentTaskField,
  setCurrentTaskType,
} from '../actions/tasks'

import '../styles/ActivitySetUp.css'

class ActivitySetUpContainer extends Component {

  constructor(props) {
    super(props)
    this.toggleModal = this.toggleModal.bind(this)
    this.state = {
      creatingTask: false,
      validationError: false,
    }
  }

  componentDidMount() {
    const {
      getActivity,
      getTasks,
      resetGet,
    } = this.props.actions
    getActivity(this.props.match.params.id)
    getTasks(this.props.match.params.id)
    resetGet()
  }

  componentDidUpdate(prevProps) {
    this.checkIndexStatus()
    this.checkTaskJustSaved(prevProps)
    this.checkActivityJustSaved(prevProps)
  }

  checkIndexStatus() {
    const {
      tasks_index_status,
      actions: {
        getTasks,
      },
      match: {
        params: {
          id
        }
      }
    } = this.props

    if(tasks_index_status === OUTDATED) getTasks(id)
  }

  checkActivityJustSaved(prevProps) {
    const {
      activity_update_status,
      history,
    } = this.props

    if (activity_update_status !== prevProps.activity_update_status && activity_update_status === SUCCESS) {
      history.push('/')
    }
  }

  checkTaskJustSaved(prevProps) {
    const {
      task_save_status,
      task_save_id,
      history,
      activity: {
        id,
      }
    } = this.props

    if (task_save_status !== prevProps.task_save_status && task_save_status === SUCCESS) {
      history.push(`/activity/${id}/task/${task_save_id}`)
    }
  }

  handleFieldSet = (event, { value, name }) => this.props.actions.setField(name,value)

  toggleModal = () => this.setState(state => ({creatingTask: !state.creatingTask}))
    
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
      task,
      tasks_index_status,
      task_save_status,
      actions: {
        updateActivity,
        deleteTask,
        saveTask,
        setCurrentTaskField,
        setCurrentTaskType,
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
          <Button primary onClick={this.toggleModal}>Agregar tarea</Button>
          <CreationModal
            open={this.state.creatingTask}
            toggle={this.toggleModal}
            status={task_save_status}
            item={task}
            validationError={this.state.validationError}
            itemType={TASK}
            actions={({
              setField:setCurrentTaskField,
              setType:setCurrentTaskType,
              save:() => {
                if(task.name !== '' && task.description !== '' && task.type !== '') {
                  saveTask(id,task)
                } else {
                  this.setState(() => ({validationError:true}))
                }
              }
            })}
          />
          <Button onClick={() => history.push(`/activity/${id}/workflow`)}>Workflow</Button>
          <Button onClick={() => history.push('/')}>Descartar</Button>
          <Button primary onClick={() => updateActivity(id,this.props.activity)}>Guardar</Button>
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
      getTask,
      saveTask,
      resetGet,
      setCurrentTaskField,
      setCurrentTaskType,
    }, dispatch)
  }
}

function mapStateToProps({activities: activityReducer,tasks: taskReducer}) {
  const {
    index: {
      tasks,
      status: tasks_index_status,
    },
    get: {
      task
    },
    save: {
      status: task_save_status,
      last: {
        id: task_save_id,
      }
    }
  } = taskReducer
  const {
    get: {
      activity,
      status: activity_status
    },
    update: {
      status: activity_update_status,
    }
  } = activityReducer
  return {
    tasks,
    tasks_index_status,
    task_save_id,
    task_save_status,
    task,
    activity,
    activity_status,
    activity_update_status,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ActivitySetUpContainer))
