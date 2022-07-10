import {SetLoadingFalseActionType} from "./Actions/SetLoadingFalseAction";
import {SetLoadingTrueActionType} from "./Actions/SetLoadingTrueAction";

export type LoadingReducerType = {
  loading: boolean
}

const initialState = {
  loading: false
}

type Action = SetLoadingFalseActionType | SetLoadingTrueActionType

export const LoadingReducer = (state: LoadingReducerType = initialState, action: Action) => {
  switch (action.type) {
    case "SET_TRUE": {
      return {
        loading: true
      };
    }
    case "SET_FALSE": {
      return {
        loading: false
      }
    }
    default: {
      return state;
    }
  }
}
