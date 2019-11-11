import React from 'react'
import { Button, List, Icon } from 'semantic-ui-react'

const ActivityListItem = ({activity,onLoad,del}) => (
  <List.Item>
    <List.Content floated='right'>
      <Button primary onClick={onLoad}> <Icon name='edit'/>Editar</Button>
      <Button primary onClick={del}><Icon name='trash'/>Eliminar</Button> 
    </List.Content>
    <List.Header id="ActivitySetUp" className='listHeader' >{activity.title}</List.Header>
  </List.Item>  
)

export default ActivityListItem
