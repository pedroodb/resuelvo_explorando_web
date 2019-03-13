import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Button, Form } from 'semantic-ui-react'

import { setTitle, setDescription } from '../actions/currentActivityActions'

class ActivitySetUpContainer extends Component {

  render() {
      
    const {
      title,
      description,
    } = this.props.currentActivity

    return (
      <div>
        <header> Creando actividad {title}
        </header>
        <Form>
          <Form.Field>
            <label>Titulo</label>
            <input placeholder='Titulo' onChange={(event) => {this.props.actions.setTitle(event.target.value)}} />
          </Form.Field>
          <Form.Field>
            <label>Descripcion</label>
            <input placeholder='Descripcion' onChange={(event) => {this.props.actions.setDescription(event.target.value)}}/>
          </Form.Field>
          <Button>Agregar tarea</Button>
        </Form>
      </div>
    )
  }
}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      setTitle,
      setDescription,
    }, dispatch)
  }
}

//Funcion que mapea el estado de la APLICACION (redux) con las props del componente
function mapStateToProps({currentActivityReducer}) {
  return {
    currentActivity:currentActivityReducer
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ActivitySetUpContainer)
