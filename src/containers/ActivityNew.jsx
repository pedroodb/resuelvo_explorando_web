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

class ActivityNewContainer extends Component {

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
      console.log(this.props.title)
      saveActivity({title: this.props.title ,description:this.props.description})
      this.setState({created:true})
    }
  }

  componentDidUpdate() {
    const {
      saveActivity,
    } = this.props.actions
    if (!this.state.created) {
      saveActivity({title: this.props.title ,description:this.props.description})
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
    get:{
      activity:{
        title,
        description,
      }
    },
    save:{
      last:activity,
      status,
    }
  } = activityReducer
  return {
    activity,
    status,
    title,
    description
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ActivityNewContainer))
