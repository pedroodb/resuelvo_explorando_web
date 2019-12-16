import React, { Component } from 'react'
import { Form, TextArea } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  faActions,
} from '../../actions/tasks'

class FreeAnswerComponent extends Component {

  render() {

    const {
      payload:{
        slogan,
        answer,
      },
      actions:{
        setSlogan,
        setAnswer,
      }
    } = this.props

    return(
      <Form>
        <Form.Input placeholder='Consigna' onChange={(e,{value}) => setSlogan(value)} value={slogan} />
        <TextArea placeholder='Respuesta esperada' onChange={(e,{value}) => setAnswer(value)} value={answer} />
      </Form>
    )
  }
}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      setSlogan:faActions.setSlogan,
      setAnswer:faActions.setAnswer,
    }, dispatch)
  }
}

export default connect(null,mapDispatchToProps)(FreeAnswerComponent)