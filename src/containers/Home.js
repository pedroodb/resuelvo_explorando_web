import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/resuelvo_explorando_logo.png'
import '../App.css'

class HomeContainer extends Component {
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save toooo reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
            <Link to="/activitySetUp">Crear actividad</Link>
          </header>
        </div>
      )
    }
  }
  
  export default HomeContainer