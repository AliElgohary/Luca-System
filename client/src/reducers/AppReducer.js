import { produce } from 'immer'
import { AUTH_ENDS, AUTH_STARTS, SET_ACCESS_TOKEN } from '../constants/actionTypes'

//must be a pure function
const AppReducer = (state, action) => {
   switch (action.type) {
      case SET_ACCESS_TOKEN:
         return produce(state, draft => {
            draft.authUser.accessToken = action.payload
         })
      case AUTH_STARTS:
         return produce(state , draft => {
            draft.authUser.isAuthenticating = true
      })
      case AUTH_ENDS:
         return produce(state , draft => {
            draft.authUser.isAuthenticating = false
      }) 
      default:
         return state
   }
}

export default AppReducer
