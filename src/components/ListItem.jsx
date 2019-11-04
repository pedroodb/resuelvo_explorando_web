import React from 'react'
import { Button, List, Icon } from 'semantic-ui-react'

const ListItem = ({name,load,del}) => (
  <List.Item>
    <List.Header className='listHeader' >{name}</List.Header>
    <List.Content floated='right'>
      <Button primary onClick={load}> <Icon name='edit'/>Editar</Button>
      <Button primary onClick={del}><Icon name='trash'/>Eliminar</Button> 
    </List.Content>
  </List.Item>  
)

export default ListItem
