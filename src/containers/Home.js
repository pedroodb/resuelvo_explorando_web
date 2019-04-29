import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { RecentActivitiesList } from '../components/homeComponents/index'
import { getActivities } from '../helpers/APIFunctions'
import { updateActivities } from '../actions/activitiesActions'
import logo from '../assets/resuelvo_explorando_logo.png'
import '../styles/Home.css'
import '../styles/General.css'

class HomeContainer extends Component {

  componentDidMount() {
    getActivities().then((activities) =>
      this.props.actions.updateActivities(activities)
    )
  }

  render() {

    const {
      history,
      activities,
    } = this.props

    return (
      <div id="Home" className="background">
        <img src={logo} className="logo" alt="logo" />
        <header className="header">
          <p>
            Bienvenido a la herramienta de configuración de Resuelvo Explorando.
          </p>
        </header>
        <RecentActivitiesList activities={activities}/>
        <Button onClick={() => history.push("/activityCreation/activitySetUp")}>Crear actividad</Button>
      </div>
    )
  }
}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      updateActivities,
    }, dispatch)
  }
}

//Funcion que mapea el estado de la APLICACION (redux) con las props del componente
function mapStateToProps({activitiesReducer}) {
  return {
    activities:activitiesReducer.activities,
  }
}

/*La funcion withRouter importada de react-router-dom es una funcion de alto orden de componentes
que te devuelve el componente con las props del router (entre ellas history)*/
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HomeContainer))