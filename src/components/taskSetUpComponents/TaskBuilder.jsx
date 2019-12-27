import React from 'react'

import {
  MULTIPLE_CHOICE,
  FREE_ANSWER,
  MULTIMEDIA_TASK,
} from '../../constants/taskTypes'
import MultipleChoice from './MultipleChoiceComponent.jsx'
import FreeAnswerComponent from './FreeAnswerComponent'
import MultimediaTaskComponent from './MultimediaTaskComponent'

const TaskBuilder = ({type, payload}) => {
  switch (type) {
    case MULTIPLE_CHOICE:
      return <MultipleChoice type={type} payload={payload} />
    case FREE_ANSWER:
      return <FreeAnswerComponent payload={payload} />
    case MULTIMEDIA_TASK:
      return <MultimediaTaskComponent payload={payload} />
    default:
      return null
  }
}

export default TaskBuilder