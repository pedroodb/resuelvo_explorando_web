import React from 'react'
import { Form } from 'semantic-ui-react'

import { PENDING, UNSET } from '../constants/status'

const ActivityCreationForm = ({status, activity:{title,description}, setField}) => (
  <Form loading={status === PENDING}>
    <Form.Input
      name='title'
      label='Título'
      placeholder='Título'
      value={(title === UNSET) ? '' : title}
      onChange={(event, { value, name }) => setField(name,value)}
    />
    <Form.Input
      name='description'
      label='Descripción'
      placeholder='Descripción'
      value={(description === UNSET) ? '' : description}
      onChange={(event, { value, name }) => setField(name,value)}
    />
  </Form>
)

export default ActivityCreationForm