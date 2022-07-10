import User from "../../types/User";
import {FetchUserListActionType} from "./Actions/FetchUserListAction";

export type UserListReducerType = {
  users: User[];
}

const initialState = {
  users: []
}

type Action = FetchUserListActionType

export const UserListReducer = (state: UserListReducerType = initialState, action: Action) => {
  switch (action.type) {
    case "FETCH_USERS": {
      return {
        users: action.payload
      }
    }
    default: {
      return state
    }
  }
}
