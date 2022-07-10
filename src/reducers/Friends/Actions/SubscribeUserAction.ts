import User from "../../../types/User";

export type SubscribeUserActionType = {
  type: "SUBSCRIBE_USER",
  payload: User
}

export type SubscribeUserActionCreator = (payload: User) => SubscribeUserActionType

export const SubscribeUserAction: SubscribeUserActionCreator = (payload: User) => {
  return {
    type: "SUBSCRIBE_USER",
    payload
  } as const;
}
