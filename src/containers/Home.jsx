import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Header, Modal, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getActivities,
  deleteActivity,
  setField,
} from '../actions/activities'

import { OUTDATED } from '../constants/status'
import ListItem from '../components/ListItem'
import logo from '../assets/resuelvo_explorando_logo.png'
import StatusList from '../components/StatusList'
import '../styles/Home.css'
import '../styles/General.css'

class HomeContainer extends Component {

  handleFieldSet = (event, { value, name }) =>  {
    this.props.actions.setField(name,value)
  }

  componentDidMount() {
    this.props.actions.updateActivities()
  }

  render() {

    const {
      history,
      activities,
      status,
      actions: {
        deleteActivity,
        updateActivities,
      }
    } = this.props

    if (status===OUTDATED) updateActivities()

    return (
      <div id="Home" className="background">
        <header className="header">
          <Header>
            Bienvenido a la herramienta de configuración de Resuelvo Explorando.
          </Header>
        </header>
        <img src={logo} className="logo" alt="logo" />
        <StatusList status={status} items={activities} render_item={
          activity => (
            <ListItem
              name={activity.title}
              key={activity.id}
              del={() => deleteActivity(activity.id)}
              load={() => history.push(`/Activity/${activity.id}`)}
            />
          )
        }/>
        <Modal size='small'
          trigger={<Button primary>Crear Nueva Actividad</Button>}
          header='Crear Nueva Actividad'
          content={
            <div style={{padding:20}}>
            <Form>
              <Form.Input name='title' label='Título' placeholder='Título' required
                onChange={this.handleFieldSet.bind(this)} 
                />
              <Form.Input name='description' label='Descripción' placeholder='Descripción' required
                onChange={this.handleFieldSet.bind(this)} 
                />
            </Form>
            </div>
          }
          actions={[
            'Cancelar', 
            { key: 'new', content: 'Crear', positive: true,  onClick:() => {history.push("/Activity/new")} }
          ]}  
        />
      </div>  
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      updateActivities: getActivities,
      deleteActivity,
      setField,
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