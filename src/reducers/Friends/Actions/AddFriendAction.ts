import User from "../../../types/User";

export type AddFriendActionType = {
  type: "ADD_FRIEND",
  payload: User
}

export type AddFriendActionCreator = (payload: User) => AddFriendActionType

export const AddFriendAction: AddFriendActionCreator = (payload: User) => {
  return {
    type: "ADD_FRIEND",
    payload
  } as const;
}
