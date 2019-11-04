import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, Divider, Header} from 'semantic-ui-react'

import { UNSET } from '../constants/status'
import {
  setField,
  clearActivity,
} from '../actions/currentActivity'
import {
  saveActivity,
  updateActivity,
} from '../actions/activities'

import { TaskCardGroup } from '../components/activitySetUpComponents'
import '../styles/ActivitySetUp.css'

class ActivitySetUpContainer extends Component {

  handleFieldSet = (event, { value, name }) => this.props.actions.setField(name,value)

  handleActivityDiscard() {
    this.props.actions.clearActivity()
    this.props.history.push("/")
  }

  render() {

    const {
      history,
      currentActivity: {
        title,
        description,
        tasks,
        id,
      },
      actions: {
        saveActivity,
        updateActivity,
      }
    } = this.props

    return title === UNSET ?
      <Redirect to="/" />
    : (
      <div id="ActivitySetUp" className="background">
        <Header textAlign='center' >{(id===UNSET) ? 'Creando' : 'Editando'} actividad {title} : {description}</Header>
        <div className="ui raised very padded text container segment">
          <Form>
            <Form.Input name='title' label='Título' value={title} placeholder='Título' required
              onChange={this.handleFieldSet.bind(this)} />
            <Form.Input name='description' label='Descripción' value={description} placeholder='Descripción' required
              onChange={this.handleFieldSet.bind(this)} />
            <TaskCardGroup tasks={tasks}/>
          </Form>
          <Divider/>
          <div className="butonesco">
          <Button primary onClick={() => history.push("/activityCreation/taskSetUp")}>Agregar tarea</Button>
          <Button primary
            onClick={() => (id===UNSET) ? 
              saveActivity({...this.props.currentActivity,id:undefined})
              : updateActivity(id,this.props.currentActivity)}
          >Guardar</Button>
          <Button primary onClick={this.handleActivityDiscard.bind(this)}>Descartar</Button>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      setField,
      clearActivity,
      saveActivity,
      updateActivity,
    }, dispatch)
  }
}

function mapStateToProps({currentActivity}) {
  return {
    currentActivity,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ActivitySetUpContainer))
