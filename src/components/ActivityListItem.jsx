import React from 'react'
import { Button, List, Icon } from 'semantic-ui-react'

const ActivityListItem = ({activity,onLoad,del}) => (
  <List.Item>
    <List.Content>{activity.title}</List.Content>
    <List.Content >
      <Button basic color='blue' onClick={onLoad}> <Icon name='edit'/>Editar</Button>
      <Button basic color='blue' onClick={del}><Icon name='delete'/>Eliminar</Button> 
    </List.Content>
  </List.Item>  
)

export default ActivityListItem
