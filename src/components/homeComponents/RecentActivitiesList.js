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
<<<<<<< HEAD
        <List divided verticalAlign='middle'>
          {activities.map((activity) => 
            <RecentActivityItem activity={activity}/>
=======
        <List verticalAlign='middle'>
          {Array.from(activities).map( activity => 
            <RecentActivityItem key={activity._id} activity={activity}/>
>>>>>>> 806111b... Trae actividades desde la api + Separacion APIFunc
          )}
        </List>
      </div>
    )
  }
}

export default RecentActivitiesListComponent
