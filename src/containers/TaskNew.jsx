import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { SUCCESS, UNSET } from '../constants/status'
import {
  clearSaveTask,
  saveTask,
} from '../actions/tasks'

import '../styles/General.css'

const emptyTask = {name:' ',description:' ',type:UNSET,code:UNSET}

class TaskNewContainer extends Component {

  constructor() {
    super()
    this.state = {created:false}
  }

  componentDidMount(){
    const {
      status,
      actions:{
        clearSaveTask,
        saveTask,
      },
      match:{
        params:{
          id,
        }
      }
    } = this.props
    if (status === SUCCESS) {
      clearSaveTask()
    } else {
      saveTask(id,{...emptyTask,activityId:id})
      this.setState({created:true})
    }
  }

  componentDidUpdate() {
    const {
      actions:{
        saveTask,
      },
      match:{
        params:{
          id,
        }
      }
    } = this.props
    if (!this.state.created) {
      saveTask(id,{...emptyTask,activityId:id})
      this.setState({created:true})
    }
  }

  render() {

    const {
      task,
      status,
      match:{
        params:{
          id,
        }
      }
    } = this.props

    return (status === SUCCESS && this.state.created) ? (
      <Redirect to={`/Activity/${id}/task/${task.id}`} />
    ) : null
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      clearSaveTask,
      saveTask,
    }, dispatch)
  }
}

function mapStateToProps({tasks: tasksReducer}) {
  const {
    save:{
      last:task,
      status,
    }
  } = tasksReducer
  return {
    task,
    status,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(TaskNewContainer))
