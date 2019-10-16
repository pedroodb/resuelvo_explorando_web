import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, Divider } from 'semantic-ui-react'

import { setField, clearActivity } from '../actions/currentActivityActions'
import { TaskCardGroup } from '../components/activitySetUpComponents'
import { saveActivity } from '../helpers/ActivitiesAPIFunctions'
import '../styles/General.css'

class ActivitySetUpContainer extends Component {

  handleFieldSet = (event, { value, name }) => this.props.actions.setField(name,value)

  handleActivityDiscard() {
    this.props.actions.clearActivity()
    this.props.history.push("/")
  }

  handleActivitySaved = () => saveActivity(this.props.currentActivity).then(
    res => {
      if(res.ok) {
        this.props.actions.clearActivity()
        this.props.history.push("/")
      }
    }
  )

  render() {

    const {
      history,
      currentActivity: {
        title,
        description,
        tasks,
      },
    } = this.props

    return (
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
          <Button onClick={this.handleActivitySaved.bind(this)}>Guardar actividad</Button>
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
    }, dispatch)
  }
}

function mapStateToProps({currentActivityReducer}) {
  return {
    currentActivity:currentActivityReducer
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ActivitySetUpContainer))
