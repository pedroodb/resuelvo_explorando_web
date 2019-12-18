import React, { Component } from 'react'
import { Form, TextArea} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  faActions,
} from '../../actions/tasks'

class MultimediaTaskComponent extends Component {

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
        <br/>
        <Form.Input label='Consigna' placeholder='Consigna' onChange={(e,{value}) => setSlogan(value)} value={slogan} />
        <h5>Tipo de respueta</h5>
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

export default connect(null,mapDispatchToProps)(MultimediaTaskComponent)