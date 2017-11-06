import * as types from './types'

export const play = ({commit, state}, {list, index}) => {
  commit(types.SET_PLAY_LIST, list)
  commit(types.SET_PLAY_INDEX, index)
  commit(types.SET_PLAY_SCREEN, true)
}

export const changeScreen = ({commit, state}, bool) => {
  commit(types.SET_PLAY_SCREEN, bool)
}
