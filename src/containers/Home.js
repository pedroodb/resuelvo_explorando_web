import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/resuelvo_explorando_logo.png'
import '../styles/Home.css'

class HomeContainer extends Component {
    render() {
      return (
        <div id="HomeContainer">
          <header className="header">
            <img src={logo} className="logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save toooo reload.
            </p>
            <Link to="/activityCreation/activitySetUp">Crear actividad</Link>
          </header>
        </div>
      )
    }
  }
  
  export default HomeContainer