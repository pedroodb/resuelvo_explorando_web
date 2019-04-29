import React, { Component } from 'react'
import { List, Divider } from 'semantic-ui-react'

import RecentActivityItem from './RecentActivityItem'

class RecentActivitiesListComponent extends Component {

  render() {
      
    const {
      activities,
    } = this.props

    return (
      <div className="listContainer">
        <h3>Recientes</h3>
        <Divider/>
        <List divided verticalAlign='middle'>
          {activities.map((activity) => 
            <RecentActivityItem activity={activity}/>
          )}
        </List>
      </div>
    )
  }
}

export default RecentActivitiesListComponent
