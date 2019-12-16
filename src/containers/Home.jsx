import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Header, Modal, Form, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  getActivities,
  deleteActivity,
  saveActivity,
  setField,
} from '../actions/activities'

import {
  setLanguage,
} from '../actions/configuration'

import { OUTDATED, SUCCESS, UNSET, PENDING } from '../constants/status'
import ListItem from '../components/ListItem'
import logo from '../assets/resuelvo_explorando_logo.png'
import StatusList from '../components/StatusList'
import '../styles/Home.css'
import '../styles/General.css'

import intl from 'react-intl-universal';

const locales = {
  "en-US": require('../locales/en-US.json'),
  "es-ES": require('../locales/es-ES.json'),
};


class HomeContainer extends Component {

  constructor(props) {
    super(props)
    this.toggleModal = this.toggleModal.bind(this)
    this.state = {
      creatingActivity: false
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
    this.loadLocales()
  }

  loadLocales() {
    console.log(this.props.lang)
    intl.init({
      currentLocale: this.props.lang , // TODO: determine locale here
      locales,
    })
    .then(() => {

    });
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

  toggleModal = () => this.setState(state => ({creatingActivity: !state.creatingActivity}))

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
      lang,
      actions: {
        deleteActivity,
        saveActivity,
        setLanguage,
      }
    } = this.props

    const languageOptions = [
      {key: 'es-ES', text: 'Espanol', value: 'es-ES'},
      {key: 'en-US', text: 'Ingles', value: 'en-US'},
    ]

    return (
      <div id="Home" className="background">
        <header className="header">
          <Header>
            {intl.get('WELCOME_TITLE')}
          </Header>
          <Dropdown
            button
            className='icon'
            icon='world'
            options={languageOptions}
            value={lang}
            onChange={(event, data) => setLanguage(data.value)}
          />
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
        <Modal size='small' open={this.state.creatingActivity} onClose={this.toggleModal}>
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
      setLanguage,
    }, dispatch)
  }
}

function mapStateToProps({activities,configuration}) {
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
    lang: configuration.language,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HomeContainer))