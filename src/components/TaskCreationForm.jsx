import React from 'react'
import { Form } from 'semantic-ui-react'

import { MULTIPLE_CHOICE, FREE_ANSWER,MULTIMEDIA_TASK } from '../constants/taskTypes'
import TaskTypesHelper from '../helpers/taskTypesHelper'
import { PENDING, UNSET } from '../constants/status'
import intl from 'react-intl-universal'

const TaskCreationForm = ({status, task, setField, setType, validationError}) => (
  <Form loading={status === PENDING}>
    <Form.Input
      name='name'
      required
      label='Nombre'
      placeholder='Nombre'
      value={(task.name === UNSET) ? '' : task.name}
      error={(validationError && task.name === '') ? {content:intl.get('EMPTY_FIELD_ERROR')} : undefined}
      onChange={(event, { value, name }) => setField(name,value)}
    />
    <Form.Input
      required
      name='description'
      label='Descripción'
      placeholder='Descripción'
      error={(validationError && task.description === '') ? {content:intl.get('EMPTY_FIELD_ERROR')} : undefined}
      value={(task.description === UNSET) ? '' : task.description}
      onChange={(event, { value, name }) => setField(name,value)}
    />
    <Form.Select
      name='type'
      required
      label='Elija el tipo de tarea'
      placeholder='Elija el tipo de tarea'
      error={(validationError && task.type === UNSET) ? {content:intl.get('EMPTY_FIELD_ERROR')} : undefined}
      onChange={(event, { value }) => setType(value,TaskTypesHelper[value].defaultPayload)}
      options={[
        { text:'Multiple Choice', value:MULTIPLE_CHOICE },
        { text:'Respuesta libre', value:FREE_ANSWER },
        { text:'Tarea multimedia', value:MULTIMEDIA_TASK },
      ]}
    />
  </Form>
)

export default TaskCreationForm