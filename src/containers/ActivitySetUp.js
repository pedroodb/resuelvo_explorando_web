import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { setTitle, setDescription } from '../actions/currentActivityActions'

class ActivitySetUpContainer extends Component {

  render() {

    console.log(this.props)
      
    const {
      title,
      description,
    } = this.props.currentActivity

    return (
      <div>
        <header> Creando actividad {title}
        </header>
        <input type="text" onChange={(event) => {this.props.actions.setTitle(event.target.value)}}></input>
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
