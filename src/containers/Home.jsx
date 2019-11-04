import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getActivities,
  deleteActivity,
} from '../actions/activities'
import {
  setActivity,
} from '../actions/currentActivity'

import { OUTDATED } from '../constants/status'
import ActivityListItem from '../components/ActivityListItem'
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
        setActivity,
        deleteActivity,
        updateActivities,
      }
    } = this.props

    if (status===OUTDATED) updateActivities()

    return (
      <div id="Home" className="background">
        <header className="header">
          <h1>
            Bienvenido a la herramienta de configuración de Resuelvo Explorando.
          </h1>
        </header>
        <img src={logo} className="logo" alt="logo" />
        <StatusList status={status} items={activities} render_item={
          activity => (
            <ActivityListItem
              activity={activity}
              key={activity.title}
              del={() => deleteActivity(activity.id)}
              onLoad={
                () => {
                  setActivity(activity)
                  history.push('/activityCreation/activitySetUp')
                }
              }
            />
          )
        }/>
        <Button basic color='blue' onClick={() => {
          setActivity({title:'', description:''})
          history.push("/activityCreation/activitySetUp")
        }}>Crear actividad</Button>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      updateActivities: getActivities,
      setActivity,
      deleteActivity,
    }, dispatch)
  }
}

function mapStateToProps({activities}) {
  const {
    index:{
      activities:index,
      status,
    },
  } = activities
  return {
    activities:index,
    status,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HomeContainer))