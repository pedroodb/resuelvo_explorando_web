import React, { Component } from 'react'
import { Button, List } from 'semantic-ui-react'

class RecentActivitiesListComponent extends Component {

  render() {
      
    const {
      activities,
    } = this.props

    return (
      <List divided verticalAlign='middle'>
        {activities.map((activity) => 
          <List.Item>
            <List.Content floated='right'>
              <Button>Cargar</Button>
            </List.Content>
            <List.Content>{activity}</List.Content>
          </List.Item>  
        )}
      </List>
    )
  }
}

export default RecentActivitiesListComponent
