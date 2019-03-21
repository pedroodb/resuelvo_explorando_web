import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form } from 'semantic-ui-react'

import { setTitle, setDescription } from '../actions/currentActivityActions'
import { TaskCardGroup } from '../components/activitySetUpComponents'

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
        setTitle,
        setDescription,
      },
    } = this.props

    return (
      <div>
        <header>Creando actividad {title} : {description}</header>
        <Form>
          <Form.Input name='title' label='Título' value={title} placeholder='Título' required
            onChange={(event, {value}) => {setTitle(value)}} />
          <Form.Input name='description' label='Descripción' value={description} placeholder='Descripción' required
            onChange={(event, {value}) => {setDescription(value)}} />
          <TaskCardGroup tasks={tasks}/>
          <Button onClick={() => history.push("/taskSetUp")}>Agregar tarea</Button>
        </Form>
      </div>
    )
  }
}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      setTitle,
      setDescription,
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
