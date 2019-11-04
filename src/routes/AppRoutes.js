import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import {
  Home,
  Activity,
  ActivityNew,
  Task,
  TaskNew,
} from '../containers'

class AppRoutes extends Component {
    render() {
      return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/Activity/new' component={ActivityNew}/>
            <Route path='/Activity/:id/Task/New' component={TaskNew}/>
            <Route path='/Activity/:id/Task/:fk' component={Task}/>
            <Route path='/Activity/:id' component={Activity}/>
        </Switch>
      )
    }
  }
  
  export default AppRoutes