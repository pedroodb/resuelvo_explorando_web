import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import logo from '../assets/resuelvo_explorando_logo.png'
import '../styles/Home.css'

class HomeContainer extends Component {

  render() {

    const {
      history
    } = this.props

    return (
      <div id="HomeContainer">
        <header className="header">
          <img src={logo} className="logo" alt="logo" />
          <p>
            Edit src/App.js and save to reload.
          </p>
          <Button onClick={() => history.push("/activityCreation/activitySetUp")}>Crear actividad</Button>
        </header>
      </div>
    )
  }
}
  
export default withRouter(HomeContainer)