import {UserRegisterSuccessActionType} from "./Actions/UserRegisterSuccessAction";
import {UserRegisterFailedActionType} from "./Actions/UserRegisterFailedAction";
import {UserRegisterInitActionType} from "./Actions/SetUserRegisterInitAction";

export type RegisterReducerState = {
  registerSuccess?: boolean
  failureStatus?: string
}

const initialState = {}

type Action = UserRegisterSuccessActionType | UserRegisterFailedActionType | UserRegisterInitActionType

export const RegisterReducer = (state: RegisterReducerState = initialState, action: Action) => {
  switch (action.type) {
    case "USER_REGISTER_INIT": {
      return {
        registerSuccess: undefined,
        failureStatus: undefined
      }
    }
    case "USER_REGISTER_SUCCESS": {
      return {
        registerSuccess: true
      }
    }
    case "USER_REGISTER_FAILED": {
      return {
        registerSuccess: false,
        failureStatus: action.payload
      }
    }
    default: {
      return state
    }
  }
}
