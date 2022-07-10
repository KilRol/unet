export type AuthStatusInitActionType = {
  type: "AUTH_STATUS_INIT"
}

type AuthStatusInitActionCreator = () => AuthStatusInitActionType

export const AuthStatusInitAction: AuthStatusInitActionCreator = () => {
  return {
    type: "AUTH_STATUS_INIT",
  } as const
}
