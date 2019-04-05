import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  addOptionToMCTask,
  updateMCTaskOption,
} from '../../actions/currentTaskActions'

class MultipleChoiceComponent extends Component {

  handleOptionChange(index,option,field,value) {
    this.props.actions.updateMCTaskOption(index,{
      ...option,
      [field]:value,
    })
  }

  render() {

    const {
      payload:{
        options,
      },
      actions:{
        addOptionToMCTask,
      }
    } = this.props

    return(
      <div>
        {options.map((option, index) => (
          <Form.Group key={index}>
            <Form.Input
              name='value' 
              value={option.value}
              onChange={(event, { value, name }) => this.handleOptionChange(index,option,name,value)}  
            />
            <Form.Checkbox
              name='isCorrect'
              label='Es correcta'
              checked={option.isCorrect}
              onChange={(event, { value, name }) => this.handleOptionChange(index,option,name,!option.isCorrect)}
            />
          </Form.Group>))}
        <Button content='Agregar opción' onClick={() => addOptionToMCTask({ value:'', isCorrect:false })}></Button>
      </div>
    )
  }

}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      addOptionToMCTask,
      updateMCTaskOption,
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