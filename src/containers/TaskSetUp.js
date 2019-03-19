import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class TaskSetUpContainer extends Component {

  render() {

    return (
      <div>
        <header> Creando tarea
        </header>
      </div>
    )
  }
}

//Funcion que mapea las acciones con las funciones que llamamos desde el componente
function mapDispatchToProps(dispatch) {
  return {
    actions : bindActionCreators({

    }, dispatch)
  }
}

//Funcion que mapea el estado de la APLICACION (redux) con las props del componente
function mapStateToProps({currentTaskReducer}) {
  return {
    currentTask:currentTaskReducer
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(TaskSetUpContainer)
