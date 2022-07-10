export type AuthErrorActionType = {
  type: "AUTH_ERROR"
  payload: string
}

type AuthErrorActionCreator = (payload: string) => AuthErrorActionType

export const AuthErrorAction: AuthErrorActionCreator = (payload: string) => {
  return {
    type: "AUTH_ERROR",
    payload
  } as const
}
