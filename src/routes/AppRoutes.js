import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home, ActivitySetUp, TaskSetUp, ActivitySummary } from '../containers'

class AppRoutes extends Component {
    render() {
      return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/activityCreation/activitySetUp' component={ActivitySetUp}/>
            <Route path='/activityCreation/taskSetUp' component={TaskSetUp}/>
            <Route path='/activityCreation/activitySummary' component={ActivitySummary}/>
        </Switch>
      )
    }
  }
  
  export default AppRoutes