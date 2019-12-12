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
  setCurrentTaskField,
  setCurrentTaskType,
} from '../actions/tasks'
import TaskTypesHelper from '../helpers/taskTypesHelper'
import TaskBuilder from '../components/taskSetUpComponents/TaskBuilder.jsx'

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
        getTasks,
      }
    } = this.props

    if(tasks_index_status === OUTDATED) getTasks(this.props.match.params.id)

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
          <Modal size='small'
            trigger={<Button primary>Agregar tarea</Button>}
            header="Crear una nueva tarea"
            content={
              <div style={{padding:20}}>
                <Form>
                  <Form.Input required name='name' label='Nombre' placeholder='Título' onChange={(event, { value, name }) => setCurrentTaskField(name,value)}/>
                  <Form.Input required name='description' label='Descripción' placeholder='Descripción' onChange={(event, { value, name }) => setCurrentTaskField(name,value)}/>
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
                {/* <TaskBuilder type={task.type} payload={task.payload}/> */}
              </div>
            }
            actions={[
              'Cancelar',
              { key:"new", content:"Crear", positive:true, onClick : () => history.push(`/activity/${id}/task/new`)}
            ]}
          />
          <Button primary onClick={() => history.push(`/activity/${id}/workflow`)}>Workflow</Button>
          <Button primary
            onClick={() => {
              updateActivity(id,this.props.activity)
              history.push(`/Activity/${id}/workflow`)
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
      getTask,
      setCurrentTaskField,
      setCurrentTaskType,
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
