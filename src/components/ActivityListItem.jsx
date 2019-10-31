import React from 'react'
import { Button, List } from 'semantic-ui-react'

const ActivityListItem = ({activity,onLoad}) => (
  <List.Item>
    <List.Content floated='right'>
      <Button onClick={onLoad}>Cargar</Button>
    </List.Content>
    <List.Content>{activity.title}</List.Content>
  </List.Item>  
)

export default ActivityListItem
