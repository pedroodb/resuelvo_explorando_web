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
        {tasks.map((task, index) => <TaskCard task={task} key={index}/>)}
      </Card.Group>
    )
  }
}

export default TaskCardGroupComponent
