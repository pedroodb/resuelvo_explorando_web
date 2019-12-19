import React, { Component } from 'react'
import intl from 'react-intl-universal'
import { connect } from 'react-redux'
import { UNSET } from '../constants/status.js'

const locales = {
  "en-US": require('../locales/en-US.json'),
  "es-ES": require('../locales/es-ES.json'),
}

class Internacionalization extends Component {

  loadLocales(prevProps) {
    if(prevProps.lang !== this.props.lang) {
      intl.init({
        currentLocale: this.props.lang , // TODO: determine locale here
        locales,
      })
      .then(() => {
        this.forceUpdate()
      })
    }
  }

  componentDidMount() {
    this.loadLocales({
      lang:UNSET,
    })
  }

  componentDidUpdate(prevProps) {
    this.loadLocales(prevProps)
  }

  render() {

    const {
      BaseComponent,
    } = this.props

    return (
      <BaseComponent {...this.props} />
    )
  }
  
}

function mapStateToProps({configuration}) {
    return {
        lang: configuration.language,
    }
}

export default connect(mapStateToProps, null)(Internacionalization)
