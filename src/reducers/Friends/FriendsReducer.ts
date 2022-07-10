import {AddFriendActionType} from "./Actions/AddFriendAction";
import {FetchFriendsActionType} from "./Actions/FetchFriendsAction";
import User from "../../types/User";
import {RemoveFriendActionType} from "./Actions/RemoveFriendAction";
import {SubscribeUserActionType} from "./Actions/SubscribeUserAction";

export type FriendReducerType = {
  users: User[]
}

type Action = AddFriendActionType | FetchFriendsActionType | RemoveFriendActionType | SubscribeUserActionType

const initialState = {
  users: []
}

export const FriendsReducer = (state: FriendReducerType = initialState, action: Action) => {
  switch (action.type) {
    case "ADD_FRIEND": {
      return {
        ...state,
        users: [...state.users].filter(user => user.id !== action.payload.id)
      }
    }
    case "REMOVE_FRIEND": {
      return {
        ...state,
        users: [...state.users].filter(user => user.id !== action.payload.id),
      }
    }
    case "FETCH_FRIENDS": {
      return {
        ...state,
        users: action.payload
      }
    }
    case "SUBSCRIBE_USER": {
      return {
        ...state,
        users: [...state.users].filter(user => user.id !== action.payload.id)
      }
    }
    default: {
      return state
    }
  }
}
