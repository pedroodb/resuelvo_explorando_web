import React from 'react'
import { Form } from 'semantic-ui-react'

import { PENDING} from '../constants/status'

const ActivityCreationForm = ({status, activity:{title,description}, validationError, setField}) => (
  <Form loading={status === PENDING}>
    <Form.Input
      name='title'
      label='Título'
      placeholder='Título'
      required
      value={title}
      error={(validationError && title === '') ? {content:'Este campo no puede estar vacio'} : undefined}
      onChange={(event, { value, name }) => setField(name,value)}
    />
    <Form.Input
      required
      name='description'
      label='Descripción'
      placeholder='Descripción'
      error={(validationError && description === '') ? {content:'Este campo no puede estar vacio'} : undefined}
      value={description}
      onChange={(event, { value, name }) => setField(name,value)}
    />
  </Form>
)

export default ActivityCreationForm