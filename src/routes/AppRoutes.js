import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import {
  Home,
  Activity,
  Task,
  TaskNew,
  ActivitySummary,
} from '../containers'

class AppRoutes extends Component {
    render() {
      return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/activity/:id/task/New' component={TaskNew}/>
            <Route path='/activity/:id/task/:fk' component={Task}/>
            <Route path='/activity/:id/workflow' component={ActivitySummary}/>
            <Route path='/activity/:id' component={Activity}/>
        </Switch>
      )
    }
  }
  
  export default AppRoutes