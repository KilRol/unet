export type SetLoadingFalseActionType = {
  type: "SET_FALSE"
}

export type SetLoadingFalseActionCreator = () => SetLoadingFalseActionType

export const SetLoadingFalseAction: SetLoadingFalseActionCreator = () => {
  return {
    type: "SET_FALSE"
  }
}
