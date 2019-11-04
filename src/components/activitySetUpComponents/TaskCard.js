import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class TaskCardComponent extends Component {

  render() {

    const {
      task,
      history,
    } = this.props

    return(
      <Card key={task.code}>
        <Card.Content>
          <Card.Header>{task.title}</Card.Header>
          <Card.Meta>{task.type}</Card.Meta>
          <Card.Description>{task.description}</Card.Description>
          <Button onClick={() => {
            history.push("/")
          }}>Editar
          </Button>
        </Card.Content>
      </Card>
    )
  }

}

export default (withRouter(TaskCardComponent))