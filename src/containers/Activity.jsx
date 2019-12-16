import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, Divider, Header, Modal} from 'semantic-ui-react'

import { SUCCESS, PENDING, UNSET, OUTDATED } from '../constants/status'
import StatusList from '../components/StatusList'
import ListItem from '../components/ListItem'
import {
  MULTIPLE_CHOICE,
  FREE_ANSWER,
} from '../constants/taskTypes'
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
import TaskTypesHelper from '../helpers/taskTypesHelper'
import TaskBuilder from '../components/taskSetUpComponents/TaskBuilder.jsx'

import '../styles/ActivitySetUp.css'

class ActivitySetUpContainer extends Component {

  constructor(props) {
    super(props)
    this.toggleModal = this.toggleModal.bind(this)
    this.state = {
      creatingTask: false
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
          <Modal size='small' open={this.state.creatingTask} onClose={this.toggleModal}>
            <Modal.Header>Crear una nueva tarea</Modal.Header>
            <Modal.Content>
              <Form loading={task_save_status === PENDING}>
                <Form.Input
                  name='name'
                  label='Nombre'
                  placeholder='Título'
                  value={(task.name === UNSET) ? '' : task.name}
                  onChange={(event, { value, name }) => setCurrentTaskField(name,value)}
                />
                <Form.Input
                  name='description'
                  label='Descripción'
                  placeholder='Descripción'
                  value={(task.description === UNSET) ? '' : task.description}
                  onChange={(event, { value, name }) => setCurrentTaskField(name,value)}
                />
                <Form.Select
                  name='type'
                  placeholder='Elija el tipo de tarea' 
                  onChange={(event, { value }) => setCurrentTaskType(value,TaskTypesHelper[value].defaultPayload)}
                  options={[
                    { text:'Multiple Choice', value:MULTIPLE_CHOICE },
                    { text:'Respuesta libre', value:FREE_ANSWER },
                  ]}
                />
              </Form>
              <TaskBuilder type={task.type} payload={task.payload}/>
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.toggleModal}>Cancelar</Button>
              <Button positive onClick={() => {
                if(task.name !== UNSET && task.description !== UNSET && task.type !== UNSET) {
                  saveTask(id, task)
                }
              }}>Crear</Button>
            </Modal.Actions>
          </Modal>
          <Button primary onClick={() => history.push(`/activity/${id}/workflow`)}>Workflow</Button>
          <Button primary onClick={() => history.push('/')}>Descartar</Button>
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
