import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ActivityListItem from '../components/ActivityListItem'
import { updateActivities } from '../actions/activities'
import { setActivity } from '../actions/currentActivity'
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
      actions: {
        setActivity
      }
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
          activity => <ActivityListItem activity={activity} key={activity.title} onLoad={
            () => {
              setActivity(activity)
              history.push('/activityCreation/activitySetUp')
            }
          }/>
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
      setActivity,
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

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HomeContainer))