import React, { Component } from 'react'
import { Card } from 'semantic-ui-react'

import { TaskCard } from './'

class TaskCardGroupComponent extends Component {

  render() {
      
    const {
      tasks,
    } = this.props

    return (
      <Card.Group>
        {tasks.map((task) => <TaskCard task={task}/>)}
      </Card.Group>
    )
  }
}

export default TaskCardGroupComponent
