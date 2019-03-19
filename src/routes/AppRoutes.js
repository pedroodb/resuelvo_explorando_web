import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home } from '../containers'
import ActivityCreationRouter from '../routers/ActivityCreationRouter'

//Rutas correspondientes a la aplicación principal
class AppRoutes extends Component {
    render() {
      return (
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/activityCreation' component={ActivityCreationRouter}/>
        </Switch>
      )
    }
  }
  
  export default AppRoutes