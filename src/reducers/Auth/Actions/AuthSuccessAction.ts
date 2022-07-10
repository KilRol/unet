export type AuthSuccessActionType = {
  type: "AUTH_SUCCESS"
}

type AuthSuccessActionCreator = () => AuthSuccessActionType

export const AuthSuccessAction: AuthSuccessActionCreator = () => {
  return {
    type: "AUTH_SUCCESS",
  } as const
}
