import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { SUCCESS } from '../constants/status'
import {
  clearSaveActivity,
  saveActivity,
} from '../actions/activities'

import '../styles/General.css'

class ActivitySetUpContainer extends Component {

  constructor() {
    super()
    this.state = {created:false}
  }

  componentDidMount(){
    const {
      clearSaveActivity,
      saveActivity,
      status,
    } = this.props.actions
    if (status === SUCCESS) {
      clearSaveActivity()
    } else {
      saveActivity({title:' ',description:' '})
      this.setState({created:true})
    }
  }

  componentDidUpdate() {
    const {
      saveActivity,
    } = this.props.actions
    if (!this.state.created) {
      saveActivity({title:' ',description:' '})
      this.setState({created:true})
    }
  }

  render() {

    const {
      activity,
      status,
    } = this.props

    return (status === SUCCESS && this.state.created) ? (
      <Redirect to={`/Activity/${activity.id}`} />
    ) : null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      clearSaveActivity,
      saveActivity,
    }, dispatch)
  }
}

function mapStateToProps({activities: activityReducer}) {
  const {
    save:{
      last:activity,
      status,
    }
  } = activityReducer
  return {
    activity,
    status,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ActivitySetUpContainer))
