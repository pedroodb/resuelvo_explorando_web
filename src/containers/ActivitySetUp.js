import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form, Divider } from 'semantic-ui-react'

import { setField, clearActivity } from '../actions/currentActivityActions'
import { TaskCardGroup } from '../components/activitySetUpComponents'
import { saveActivity } from '../helpers/APIFunctions'
import '../styles/General.css'

class ActivitySetUpContainer extends Component {

  render() {

    const {
      history,
      currentActivity: {
        title,
        description,
        tasks,
      },
      actions: {
        setField,
        clearActivity,
      },
    } = this.props

    return (
      <div className="background">
        <div className="container">
          <header>Creando actividad {title} : {description}</header>
          <Form>
            <Form.Input name='title' label='Título' value={title} placeholder='Título' required
              onChange={(event, { value, name }) => {setField(name,value)}} />
            <Form.Input name='description' label='Descripción' value={description} placeholder='Descripción' required
              onChange={(event, {value, name}) => {setField(name,value)}} />
            <TaskCardGroup tasks={tasks}/>
          </Form>
          <Divider/>
          <Button onClick={() => history.push("/activityCreation/taskSetUp")}>Agregar tarea</Button>
          <Button onClick={() => saveActivity(this.props.currentActivity).then(
            res => {
              if(res.ok) {
                clearActivity()
                history.push("/")
              }
            }
          )}>Guardar actividad</Button>
        </div>
      </div>
    )
  }
}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      setField,
      clearActivity,
    }, dispatch)
  }
}

//Funcion que mapea el estado de la APLICACION (redux) con las props del componente
function mapStateToProps({currentActivityReducer}) {
  return {
    currentActivity:currentActivityReducer
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ActivitySetUpContainer))
