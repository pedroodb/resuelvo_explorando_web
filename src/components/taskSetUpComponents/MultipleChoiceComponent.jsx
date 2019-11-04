import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  setCurrentTaskType,
  mcActions,
} from '../../actions/currentTaskActions'

class MultipleChoiceComponent extends Component {

  handleOptionChange(index,option,field,value) {
    this.props.actions.updateOption(index,{
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
        addOption,
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
        <Button content='Agregar opción' onClick={() => addOption({ value:'', isCorrect:false })}></Button>
      </div>
    )
  }
}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      setCurrentTaskType,
      addOption:mcActions.addOption,
      updateOption:mcActions.updateOption,
    }, dispatch)
  }
}

export default connect(null,mapDispatchToProps)(MultipleChoiceComponent)