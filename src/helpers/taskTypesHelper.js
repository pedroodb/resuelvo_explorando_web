import {
  MULTIPLE_CHOICE,
  FREE_ANSWER,
} from '../constants/taskTypes'

export default {
  [MULTIPLE_CHOICE]:{
    defaultPayload:{
      options:[]
    },
    name:'Multiple Choice'
  },
  [FREE_ANSWER]:{
    defaultPayload:{
      slogan:'',
      answer:'',
    },
    name:'Free answer'
  }
}