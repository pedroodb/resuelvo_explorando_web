import {
  ACTIVITIES_UPDATE,
} from '../constants'

export const updateActivities = (activities) => ({
  type:ACTIVITIES_UPDATE,
  payload:activities,
})
