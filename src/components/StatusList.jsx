import React from 'react'

import List from './List'
import {
  LoadingMessage,
  ErrorMessage,
} from './Messages'
import {
  PENDING,
  SUCCESS,
  OUTDATED,
  FAILURE,
} from '../constants/status'

//Wrapper para renderizar una lista en funcion el estado de la request a la API

const StatusList = ({ status, items, render_item }) => 
  status === PENDING ? <LoadingMessage title='Un segundo' description='Estamos obteniendo el listado del recurso' />
    : status === SUCCESS || status === OUTDATED ? <List items={items} render_item={render_item} />
      : status === FAILURE ? <ErrorMessage title='Lo sentimos' errors={['Hubo un error tratando de obtener el listado del recurso']} />
        : null

export default StatusList