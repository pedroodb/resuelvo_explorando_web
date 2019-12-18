import React from 'react'
import { Button, List, Icon, ButtonGroup } from 'semantic-ui-react'

const ListItem = ({name,load,del}) => (
  <List.Item>
    <List.Content floated='right'>
      <ButtonGroup>
        <Button basic primary onClick={load}><Icon name='edit'/>Editar</Button>
        <Button basic primary onClick={del}><Icon name='trash'/>Eliminar</Button> 
      </ButtonGroup>
    </List.Content>
    <List.Content>{name}</List.Content>
  </List.Item>  
)

export default ListItem
