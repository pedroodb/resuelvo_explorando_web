import React from 'react'
import { Button, List } from 'semantic-ui-react'

const ActivityListItem = ({activity,onLoad,del}) => (
  <List.Item>
    <List.Content floated='right'>
      <Button basic color='blue' onClick={onLoad}>Cargar</Button>
      <Button basic color='blue' onClick={del}>Eliminar</Button> 
    </List.Content>
    <List.Content>{activity.title}</List.Content>
  </List.Item>  
)

export default ActivityListItem
