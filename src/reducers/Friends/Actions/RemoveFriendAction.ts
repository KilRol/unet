import User from "../../../types/User";

export type RemoveFriendActionType = {
  type: "REMOVE_FRIEND",
  payload: User
}

export type RemoveFriendActionCreator = (payload: User) => RemoveFriendActionType

export const RemoveFriendAction: RemoveFriendActionCreator = (payload: User) => {
  return {
    type: "REMOVE_FRIEND",
    payload
  } as const;
}
