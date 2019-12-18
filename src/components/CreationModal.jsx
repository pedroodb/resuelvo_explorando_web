import React from 'react'
import { Button, Modal} from 'semantic-ui-react'

import { TASK, /*ACTIVITY*/ } from '../constants/helpers'
import TaskCreationForm from './TaskCreationForm'
import ActivityCreationForm from './ActivityCreationForm'

const CreationModal = ({
  open,
  toggle,
  status,
  item,
  itemType,
  validationError,
  actions:{
    setField,
    setType,
    save
  }}) => (
  <Modal size='small' open={open} onClose={toggle}>
    <Modal.Header>Crear Nueva {(itemType === TASK) ? 'Tarea' : 'Actividad'}</Modal.Header>
    <Modal.Content>
      {(itemType === TASK) ?
        <TaskCreationForm
          status={status}
          task={item}
          validationError={validationError}
          setField={setField}
          setType={setType}
        />
        :
        <ActivityCreationForm
          status={status}
          activity={item}
          validationError={validationError}
          setField={setField}
        />
      }
    </Modal.Content>
    <Modal.Actions>
      <Button basic onClick={toggle}>Cancelar</Button>
      <Button basic positive onClick={save}>Crear</Button>
    </Modal.Actions>
  </Modal>
)

export default CreationModal