import { shuffle, findIndex } from 'lodash'
import * as types from './types'
import { playMode } from '@/config'

export const play = ({commit, state}, {list, index, mode = state.playMode}) => {
  let newList = list
  let newIndex = index
  if (mode === playMode.random){
    newList = shuffle(list)
    const nowPlay = list[index]
    newIndex = findIndex(newList, {songid: nowPlay.songid})
  }
  (mode !== state.playMode) && commit(types.SET_PLAY_MODE, mode)
  commit(types.SET_PLAY_LIST, newList)
  commit(types.SET_NOMINAL_LIST, list)
  commit(types.SET_PLAY_INDEX, newIndex)
  commit(types.SET_PLAY_SCREEN, true)
  commit(types.SET_PLAYING, true)
}

export const setScreen = ({commit, state}, bool) => {
  commit(types.SET_PLAY_SCREEN, bool)
}

export const setPlaying = ({commit, state}, bool) => {
  commit(types.SET_PLAYING, bool)
}

export const setPlayIndex = ({commit, state}, index) => {
  commit(types.SET_PLAY_INDEX, index)
}

export const setPlayMode = ({commit, state}, {mode, index = 0, list = state.nominalList}) => {
  let newList = list
  let newIndex = index
  if (mode === playMode.random){
    // 打乱数组
    newList = shuffle(list)
  }
  const nowPlay = state.playList[index]
  // 重新找到正在播放的歌曲
  newIndex = findIndex(newList, {songid: nowPlay.songid})
  commit(types.SET_PLAY_MODE, mode)
  commit(types.SET_PLAY_INDEX, newIndex)
  commit(types.SET_PLAY_LIST, newList)
}
