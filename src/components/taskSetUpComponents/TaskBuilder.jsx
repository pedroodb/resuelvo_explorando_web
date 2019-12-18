import React from 'react'

import {
  MULTIPLE_CHOICE,
  FREE_ANSWER,
} from '../../constants/taskTypes'
import MultipleChoice from './MultipleChoiceComponent.jsx'
import FreeAnswerComponent from './FreeAnswerComponent'

const TaskBuilder = ({type, payload}) => {
  switch (type) {
    case MULTIPLE_CHOICE:
      return <MultipleChoice type={type} payload={payload} />
    case FREE_ANSWER:
      return <FreeAnswerComponent payload={payload} />
    default:
      return null
  }
}

export default TaskBuilder