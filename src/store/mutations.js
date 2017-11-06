import * as types from './types'

export default {
  [types.SET_PLAY_LIST](state, playList) {
    state.playList = playList
  },
  [types.SET_PLAY_INDEX](state, index) {
    state.playIndex = index
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.playMode = mode
  },
  [types.SET_PLAY_SCREEN](state, bool) {
    state.playScreen = bool
  },
  [types.SET_FORMAT_LIST](state, list) {
    state.formatList = list
  },
  [types.SET_PLAYING](state, bool) {
    state.playing = bool
  }
}
