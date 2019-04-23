import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

import { RecentActivitiesList } from '../components/homeComponents/index'
import { getActivities } from '../helpers/APIFunctions'
import logo from '../assets/resuelvo_explorando_logo.png'
import '../styles/Home.css'
import '../styles/General.css'

class HomeContainer extends Component {

  render() {

    const {
      history
    } = this.props

    return (
      <div id="Home" className="background">
        <img src={logo} className="logo" alt="logo" />
        <header className="header">
          <p>
            Bienvenido a la herramienta de configuración de Resuelvo Explorando.
          </p>
        </header>
        {/*getActivities().then((activities) =>
          <RecentActivitiesList activities={activities}/>
        )*/}
        <Button onClick={() => history.push("/activityCreation/activitySetUp")}>Crear actividad</Button>
      </div>
    )
  }
}

/*La funcion withRouter importada de react-router-dom es una funcion de alto orden de componentes
que te devuelve el componente con las props del router (entre ellas history)*/
export default withRouter(HomeContainer)