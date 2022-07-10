export type SetLoadingTrueActionType = {
  type: "SET_TRUE"
}

export type SetLoadingTrueActionCreator = () => SetLoadingTrueActionType

export const SetLoadingTrueAction: SetLoadingTrueActionCreator = () => {
  return {
    type: "SET_TRUE",
  } as const
}
