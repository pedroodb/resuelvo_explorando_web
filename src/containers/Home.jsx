import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Header, Modal, Form, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getActivities,
  deleteActivity,
  saveActivity,
  setField,
} from '../actions/activities'

import { OUTDATED, SUCCESS, UNSET, PENDING } from '../constants/status'
import ListItem from '../components/ListItem'
import logo from '../assets/resuelvo_explorando_logo.png'
import StatusList from '../components/StatusList'
import '../styles/Home.css'
import '../styles/General.css'

class HomeContainer extends Component {

  constructor(props) {
    super(props)
    this.toggleModal = this.toggleModal.bind(this)
    this.state = {
      creatingTask: false
    }
  } 

  handleFieldSet = (event, { value, name }) =>  {
    this.props.actions.setField(name,value)
  }

  componentDidMount() {
    this.props.actions.getActivities()
  }

  componentDidUpdate(prevProps) {
    this.checkIndexStatus()
    this.checkActivityJustSaved(prevProps)
  }

  checkIndexStatus() {
    const {
      status,
      actions: {
        getActivities,
      }
    } = this.props

    if (status===OUTDATED) getActivities()
  }

  checkActivityJustSaved(prevProps) {
    const {
      saveStatus,
      savedActivity,
      history,
    } = this.props

    if (prevProps.saveStatus !== saveStatus && saveStatus === SUCCESS) {
      history.push(`/Activity/${savedActivity.id}`)
    }
  }

  toggleModal = () => this.setState(state => ({creatingTask: !state.creatingTask}))

  render() {

    const {
      history,
      activities,
      status,
      saveStatus,
      newActivity: {
        title,
        description,
      },
      actions: {
        deleteActivity,
        saveActivity,
      }
    } = this.props

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
        <Button primary onClick={this.toggleModal}>Crear Nueva Actividad</Button>
        <Modal size='small' open={this.state.creatingTask} onClose={this.toggleModal}>
          <Modal.Header>Crear Nueva Actividad</Modal.Header>
          <Modal.Content>
            <Form loading={saveStatus === PENDING}>
              <Form.Input name='title' label='Título' placeholder='Título' onChange={this.handleFieldSet.bind(this)} />
              <Form.Input name='description' label='Descripción' placeholder='Descripción' onChange={this.handleFieldSet.bind(this)} />
            </Form>
          </Modal.Content>
          <Modal.Actions>
              <Button onClick={this.toggleModal}>Cancelar</Button>
              <Button positive onClick={() => {
                if(title !== UNSET && description !== UNSET) {
                  saveActivity({title, description})
                }
              }}>Crear</Button>
          </Modal.Actions>
        </Modal>
      </div>  
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      getActivities,
      deleteActivity,
      saveActivity,
      setField,
    }, dispatch)
  }
}

function mapStateToProps({activities}) {
  const {
    index:{
      activities: index,
      status,
    },
    save:{
      status: saveStatus,
      last: savedActivity
    },
    get:{
      activity: newActivity,
    },
  } = activities
  return {
    activities: index,
    status,
    newActivity,
    saveStatus,
    savedActivity,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HomeContainer))