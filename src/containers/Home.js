import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import RecentActivityItem from '../components/RecentActivityItem'
import { updateActivities } from '../actions/activities'
import logo from '../assets/resuelvo_explorando_logo.png'
import StatusList from '../components/StatusList'
import '../styles/Home.css'
import '../styles/General.css'

class HomeContainer extends Component {

  componentDidMount() {
    this.props.actions.updateActivities()
  }

  render() {

    const {
      history,
      activities,
      status,
    } = this.props

    return (
      <div id="Home" className="background">
        <img src={logo} className="logo" alt="logo" />
        <header className="header">
          <p>
            Bienvenido a la herramienta de configuración de Resuelvo Explorando.
          </p>
        </header>
        <StatusList status={status} items={activities} render_item={
          activity => <RecentActivityItem activity={activity} key={activity.title}/>
        }/>
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
  const {
    activities,
    status,
  } = activitiesReducer

  return {
    activities,
    status,
  }
}

/*La funcion withRouter importada de react-router-dom es una funcion de alto orden de componentes
que te devuelve el componente con las props del router (entre ellas history)*/
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HomeContainer))