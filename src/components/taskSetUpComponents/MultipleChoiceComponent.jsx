import React, { Component } from 'react'
import { Button, Form, Icon, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  mcActions,
} from '../../actions/tasks'

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
      <Segment>
        <Form>
        {options.map((option, index) => (
          <Form.Group key={index}>
            <br/>
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
            <Button color='youtube'><Icon name='trash' /></Button>
          </Form.Group>))}
          </Form>
        <Button content='Agregar opción' onClick={() => addOption({ value:'', isCorrect:false })}></Button>
      </Segment>
    )
  }
}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({
      addOption:mcActions.addOption,
      updateOption:mcActions.updateOption,
    }, dispatch)
  }
}

export default connect(null,mapDispatchToProps)(MultipleChoiceComponent)