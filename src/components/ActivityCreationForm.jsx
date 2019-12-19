import React from 'react'
import { Form } from 'semantic-ui-react'

import { PENDING} from '../constants/status'
import intl from 'react-intl-universal'

const ActivityCreationForm = ({status, activity:{title,description}, validationError, setField}) => (
  <Form loading={status === PENDING}>
    <Form.Input
      name='title'
      label={intl.get('TITLE')}
      placeholder={intl.get('TITLE')}
      required
      value={title}
      error={(validationError && title === '') ? {content:'Este campo no puede estar vacio'} : undefined}
      onChange={(event, { value, name }) => setField(name,value)}
    />
    <Form.Input
      required
      name='description'
      label={intl.get('DESCRIPTION')}
      placeholder={intl.get('DESCRIPTION')}
      error={(validationError && description === '') ? {content:'Este campo no puede estar vacio'} : undefined}
      value={description}
      onChange={(event, { value, name }) => setField(name,value)}
    />
  </Form>
)

export default ActivityCreationForm