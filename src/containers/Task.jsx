import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Form, Button, Divider, Segment, Header, ButtonGroup } from 'semantic-ui-react'

import {
  MULTIPLE_CHOICE,
  FREE_ANSWER,
  MULTIMEDIA_TASK,
} from '../constants/taskTypes'
import {
  getTask,
  updateTask,
  setCurrentTaskField,
  setCurrentTaskType,
} from '../actions/tasks'
import TaskTypesHelper from '../helpers/taskTypesHelper'
import TaskBuilder from '../components/taskSetUpComponents/TaskBuilder.jsx'
import '../styles/General.css'
import { SUCCESS, OUTDATED, PENDING } from '../constants/status'

class TaskSetUpContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      validationError: false,
    }
  }

  componentDidMount() {
    const {
      id,
      fk,
    } = this.props.match.params
    this.props.actions.getTask(id,fk)
  }

  componentDidUpdate(prevProps) {
    this.checkTaskJustSaved(prevProps)
  }

  checkTaskJustSaved(prevProps) {
    const {
      updateStatus,
      history,
      match:{
        params:{
          id
        }
      }
    } = this.props

    if (updateStatus !== prevProps.updateStatus && updateStatus === SUCCESS) {
      history.push(`/Activity/${id}`)
    }
  }

  render() {

    const {
      task,
      status,
      updateStatus,
      history,
      actions:{
        setCurrentTaskField,
        setCurrentTaskType,
        updateTask,
      },
      match:{
        params:{
          id:activity_id
        }
      }
    } = this.props

    const {
      validationError
    } = this.state

    return (status === SUCCESS || status === OUTDATED) ? (
      <div className="background">
        <Segment padded='very' className='container'>
          <Header>Creando tarea</Header>
          <Form loading={updateStatus === PENDING}>
            <Form.Input required name='name' label='Nombre' value={task.name} placeholder='Título'
              onChange={(event, { value, name }) => setCurrentTaskField(name,value)}
              error={(validationError && task.name === '') ? {content:'Este campo no puede estar vacio'} : undefined}
            />
            <Form.Input required name='description' label='Descripción' value={task.description} placeholder='Descripción'
              onChange={(event, { value, name }) => setCurrentTaskField(name,value)}
              error={(validationError && task.description === '') ? {content:'Este campo no puede estar vacio'} : undefined}
            />
            <Form.Select
              name='type'
              value={task.type}
              label='Seleccione un tipo de tarea'
              placeholder='Elija el tipo de tarea' 
              onChange={(event, { value }) => setCurrentTaskType(value,TaskTypesHelper[value].defaultPayload)}
              options={[
                { text:'Multiple Choice', value:MULTIPLE_CHOICE },
                { text:'Respuesta libre', value:FREE_ANSWER },
                { text:'Tarea multimedia', value:MULTIMEDIA_TASK },
              ]}
            />
          </Form>
          <Divider/>
          <TaskBuilder type={task.type} payload={task.payload}/>
          <Divider/>
          <ButtonGroup floated='right'>
            <Button basic color='grey' content='Cancelar' onClick={() => history.push(`/Activity/${activity_id}`)}/>
            <Button basic primary content='Confirmar' onClick={() => {
              if(task.name !== '' && task.description !== '') {
                updateTask(activity_id,task.id,task)
              } else {
                this.setState(() => ({validationError:true}))
              }
            }}/>
          </ButtonGroup>
        </Segment>
      </div>
    ) : null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      getTask,
      updateTask,
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
    },
    update:{
      status:updateStatus,
    }
  } = tasks
  return {
    task,
    status,
    updateStatus,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TaskSetUpContainer))
