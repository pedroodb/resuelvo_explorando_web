import React, { Component } from 'react'
import { Form} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  mtActions,
} from '../../actions/tasks'

class MultimediaTaskComponent extends Component {

  render() {

    const {
      payload:{
        slogan,
        multimedia_type,
      },
      actions:{
        setSlogan,
        setMultimedia_type,
      }
    } = this.props

    return(
      <Form>
        <br/>
        <Form.Input label='Consigna' placeholder='Consigna' onChange={(e,{value}) => setSlogan(value)} value={slogan} />
        <h5>Tipo de respueta</h5>
        <Form.Select
          name='multimedia_type'
          required
          label='Elija el tipo de contenido'
          defaultValue={multimedia_type}
          placeholder='Elija el tipo de contenido'
          onChange={(event, { value }) => setMultimedia_type(value)}
          options={[
            { text:'Audio', value:'audio' },
            { text:'Foto', value:'foto' },
            { text:'Video', value:'video' },
          ]}
    />
      </Form>
    )
  }
}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      setSlogan:mtActions.setSlogan,
      setMultimedia_type:mtActions.setMultimedia_type,
    }, dispatch)
  }
}

export default connect(null,mapDispatchToProps)(MultimediaTaskComponent)