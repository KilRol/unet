export type UserRegisterFailedActionType = {
  type: "USER_REGISTER_FAILED"
  payload: string
}

type UserRegisterFailedActionCreator = (payload: string) => UserRegisterFailedActionType

export const UserRegisterFailedAction: UserRegisterFailedActionCreator = (payload: string) => {
  return {
    type: "USER_REGISTER_FAILED",
    payload
  } as const
}
