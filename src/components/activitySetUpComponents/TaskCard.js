import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { removeTask } from '../../actions/currentActivityActions'
import { setCurrentTask } from '../../actions/currentTaskActions'

class TaskCardComponent extends Component {

  render() {

    const {
      task,
      history,
      actions:{
        setCurrentTask,
        removeTask,
      },
    } = this.props

    return(
      <Card key={task.code}>
        <Card.Content>
          <Card.Header>{task.title}</Card.Header>
          <Card.Meta>{task.type}</Card.Meta>
          <Card.Description>{task.description}</Card.Description>
          <Button onClick={() => {
            removeTask(task)
            setCurrentTask(task)
            history.push("/taskSetUp")
          }}>Editar
          </Button>
        </Card.Content>
      </Card>
    )
  }

}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      setCurrentTask,
      removeTask,
    }, dispatch)
  }
}

//Funcion que mapea el estado de la APLICACION (redux) con las props del componente
function mapStateToProps({}) {
  return {}
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TaskCardComponent))