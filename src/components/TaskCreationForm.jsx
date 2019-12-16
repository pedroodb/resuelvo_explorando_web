import React from 'react'
import { Form } from 'semantic-ui-react'

import { MULTIPLE_CHOICE, FREE_ANSWER } from '../constants/taskTypes'
import TaskTypesHelper from '../helpers/taskTypesHelper'
import { PENDING, UNSET } from '../constants/status'

const TaskCreationForm = ({status, task, setField, setType}) => (
  <Form loading={status === PENDING}>
    <Form.Input
      name='name'
      label='Nombre'
      placeholder='Nombre'
      value={(task.name === UNSET) ? '' : task.name}
      onChange={(event, { value, name }) => setField(name,value)}
    />
    <Form.Input
      name='description'
      label='Descripción'
      placeholder='Descripción'
      value={(task.description === UNSET) ? '' : task.description}
      onChange={(event, { value, name }) => setField(name,value)}
    />
    <Form.Select
      name='type'
      placeholder='Elija el tipo de tarea' 
      onChange={(event, { value }) => setType(value,TaskTypesHelper[value].defaultPayload)}
      options={[
        { text:'Multiple Choice', value:MULTIPLE_CHOICE },
        { text:'Respuesta libre', value:FREE_ANSWER },
      ]}
    />
  </Form>
)

export default TaskCreationForm