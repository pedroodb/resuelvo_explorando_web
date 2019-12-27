import React, { Component } from 'react'
import { Form} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  mtActions,
} from '../../actions/tasks'
import {
  AUDIO,
  VIDEO,
  IMAGE,
} from '../../constants/taskTypes'

class MultimediaTaskComponent extends Component {

  render() {

    const {
      payload:{
        slogan,
        multimedia_type,
      },
      actions:{
        setSlogan,
        setMultimediaType,
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
          onChange={(event, { value }) => setMultimediaType(value)}
          options={[
            { text:'Audio', value:AUDIO },
            { text:'Foto', value:IMAGE },
            { text:'Video', value:VIDEO },
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
      setMultimediaType:mtActions.setMultimediaType,
    }, dispatch)
  }
}

export default connect(null,mapDispatchToProps)(MultimediaTaskComponent)