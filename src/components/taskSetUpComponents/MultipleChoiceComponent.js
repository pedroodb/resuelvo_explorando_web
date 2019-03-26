import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setCurrentTaskField, addOptionToMCTask } from '../../actions/currentTaskActions'

class MultipleChoiceComponent extends Component {

  render() {

    const {
      payload:{
        options,
      },
      actions:{
        setCurrentTaskField,
        addOptionToMCTask,
      }
    } = this.props

    return(
      <div>
        {options.map((option, index) => (<Form.Input key={index} value={option.value}/>))}
        <Button content='Agregar opción' onClick={() => addOptionToMCTask({value:''})}></Button>
      </div>
    )
  }

}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      setCurrentTaskField,
      addOptionToMCTask,
    }, dispatch)
  }
}

//Funcion que mapea el estado de la APLICACION (redux) con las props del componente
function mapStateToProps({currentTaskReducer}) {
  const {
    task:{
      payload,
    },
  } = currentTaskReducer
  return {
    payload,
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MultipleChoiceComponent)