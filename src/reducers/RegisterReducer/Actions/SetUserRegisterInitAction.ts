export type UserRegisterInitActionType = {
  type: "USER_REGISTER_INIT"
}

type UserRegisterInitActionCreator = () => UserRegisterInitActionType

export const UserRegisterInitAction: UserRegisterInitActionCreator = () => {
  return {
    type: "USER_REGISTER_INIT",
  } as const
}
