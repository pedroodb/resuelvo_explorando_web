import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, Divider } from 'semantic-ui-react'

import { SUCCESS } from '../constants/status'
import {
  setField,
  clearActivity,
} from '../actions/currentActivity'
import {
  saveActivity,
} from '../actions/activities'

import { TaskCardGroup } from '../components/activitySetUpComponents'
import '../styles/General.css'

class ActivitySetUpContainer extends Component {

  handleFieldSet = (event, { value, name }) => this.props.actions.setField(name,value)

  handleActivityDiscard() {
    this.props.actions.clearActivity()
    this.props.history.push("/")
  }

  render() {

    const {
      history,
      saveStatus,
      currentActivity: {
        title,
        description,
        tasks,
      },
      actions: {
        saveActivity,
      }
    } = this.props

    return saveStatus === SUCCESS ?
      <Redirect to="/" />
    : (
      <div className="background">
        <div className="container">
          <header>Creando actividad {title} : {description}</header>
          <Form>
            <Form.Input name='title' label='Título' value={title} placeholder='Título' required
              onChange={this.handleFieldSet.bind(this)} />
            <Form.Input name='description' label='Descripción' value={description} placeholder='Descripción' required
              onChange={this.handleFieldSet.bind(this)} />
            <TaskCardGroup tasks={tasks}/>
          </Form>
          <Divider/>
          <Button onClick={() => history.push("/activityCreation/taskSetUp")}>Agregar tarea</Button>
          <Button onClick={() => saveActivity(this.props.currentActivity)}>Guardar actividad</Button>
          <Button onClick={this.handleActivityDiscard.bind(this)}>Descartar</Button>
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
    }, dispatch)
  }
}

function mapStateToProps({currentActivity,activities}) {
  return {
    currentActivity,
    saveStatus:activities.save.status,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ActivitySetUpContainer))
