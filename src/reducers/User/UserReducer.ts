import {FetchUserActionType} from "./Actions/FetchUserAction";
import User from "../../types/User";

export type UserReducerType = {
  user: User;
}

const initialState = {
  user: {
    about: "",
    email: "",
    id: "",
    name: "",
    image: "",
    userId: ""
  }
}

type Action = FetchUserActionType

export const UserReducer = (state: UserReducerType = initialState, action: Action) => {
  switch (action.type) {
    case "FETCH_USER": {
      return {user: action.payload}
    }
    default: {
      return state;
    }
  }
}
