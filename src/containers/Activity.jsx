import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, Divider, Header,Icon, Segment, ButtonGroup } from 'semantic-ui-react'
import intl from 'react-intl-universal'

import { SUCCESS, OUTDATED, PENDING } from '../constants/status'
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

class ActivitySetUpContainer extends Component {

  constructor(props) {
    super(props)
    this.toggleModal = this.toggleModal.bind(this)
    this.state = {
      creatingTask: false,
      taskValidationError: false,
      validationErrors: false,
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
      activity_update_status,
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

    const {
      validationErrors,
      taskValidationError,
    } = this.state

    return (activity_status === SUCCESS) ? (
      <div id="ActivitySetUp" className="background">
        <Header as='h1' textAlign='center'>{title}</Header>
        <Segment padded='very' className='container'>
          <Form loading={activity_update_status === PENDING}>
            <Form.Input name='title' label='Título' value={title} placeholder='Título' required
              onChange={this.handleFieldSet.bind(this)}
              error={(validationErrors && title === '') ? {content:'Este campo no puede estar vacio'} : undefined}
              />
            <Form.Input name='description' label='Descripción' value={description} placeholder='Descripción' required
              onChange={this.handleFieldSet.bind(this)} 
              error={(validationErrors && description === '') ? {content:'Este campo no puede estar vacio'} : undefined}
              />
          </Form>
          <Divider/>
          <StatusList
            items={tasks}
            status={tasks_index_status} 
            render_item={task =>
              (<ListItem
                name={task.name}
                key={task.id}
                load={() => history.push(`/activity/${id}/task/${task.id}`)}
                del={() => deleteTask(id,task.id)}
              />)
            }
          />
          <Divider/>
          <Button basic primary onClick={this.toggleModal}><Icon name='add' />{intl.get("ADD_TASK")}</Button>
          <Button basic color='grey' onClick={() => history.push(`/activity/${id}/workflow`)}>Workflow</Button>
          <CreationModal
            open={this.state.creatingTask}
            toggle={this.toggleModal}
            status={task_save_status}
            item={task}
            validationError={taskValidationError}
            itemType={TASK}
            actions={({
              setField:setCurrentTaskField,
              setType:setCurrentTaskType,
              save:() => {
                if(task.name !== '' && task.description !== '' && task.type !== '') {
                  saveTask(id,task)
                } else {
                  this.setState(() => ({taskValidationError:true}))
                }
              }
            })}
          />
          <ButtonGroup floated='right'>
            <Button basic color='grey' floated='right' onClick={() => history.push('/')}><Icon name='arrow left' />Descartar</Button>
            <Button basic primary onClick={() => {
              if(title !== '' && description !== '') {
                updateActivity(id,this.props.activity)
              } else {
                this.setState(() => ({validationErrors:true}))
              }
              }}><Icon name='upload' />Guardar</Button>
          </ButtonGroup>
        </Segment>
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
