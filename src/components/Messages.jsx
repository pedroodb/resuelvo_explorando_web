import React from 'react'
import { Message, Icon } from 'semantic-ui-react'

export const InfoMessage = ({ title, description }) => (
  <Message>
    <Message.Content>
      <Message.Header>{title}</Message.Header>
      {description}
    </Message.Content>
  </Message>
)

export const LoadingMessage = ({ title, description }) => (
  <Message icon>
    <Icon name='circle notched' loading />
    <Message.Content>
      <Message.Header>{title}</Message.Header>
      {description}
    </Message.Content>
  </Message>
)

export const ErrorMessage = ({ title, errors = [] }) => (
  <Message
    error
    header={title}
    list={errors}
  />
)