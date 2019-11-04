import React from 'react'

import {
  MULTIPLE_CHOICE
} from '../../constants/taskTypes'
import MultipleChoice from './MultipleChoiceComponent.jsx'

const TaskBuilder = ({type, payload}) => {
  switch (type) {
    case MULTIPLE_CHOICE:
      return <MultipleChoice type={type} payload={payload}/>
    default:
      return null
  }
}

export default TaskBuilder