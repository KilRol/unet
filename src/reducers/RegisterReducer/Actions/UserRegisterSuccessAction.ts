export type UserRegisterSuccessActionType = {
  type: "USER_REGISTER_SUCCESS"
}

type UserRegisterSuccessActionCreator = () => UserRegisterSuccessActionType

export const UserRegisterSuccessAction: UserRegisterSuccessActionCreator = () => {
  return {
    type: "USER_REGISTER_SUCCESS",
  } as const
}
