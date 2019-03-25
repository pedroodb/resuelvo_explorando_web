import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setCurrentTaskField } from '../../actions/currentTaskActions'

class MultipleChoiceComponent extends Component {

  render() {

    const {
      options,
      actions:{
        setCurrentTaskField
      }
    } = this.props

    return(
      <div>
        {options.map((option, index) => (<Form.Input key={index} value={option.value}/>))}
        <Button content='Agregar opción' onClick={() => setCurrentTaskField('payload',[...options, {value:''}])}></Button>
      </div>
    )
  }

}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      setCurrentTaskField,
    }, dispatch)
  }
}

//Funcion que mapea el estado de la APLICACION (redux) con las props del componente
function mapStateToProps({currentTaskReducer}) {
  const {
    task:{
      payload:{
        options,
      },
    },
  } = currentTaskReducer
  return {
    options,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MultipleChoiceComponent)