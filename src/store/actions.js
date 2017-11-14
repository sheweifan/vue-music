import _shuffle from 'lodash/shuffle'
import _findIndex from 'lodash/findIndex'
import _clone from 'lodash/clone'
import _isObject from 'lodash/isObject'
import _uniqBy from 'lodash/uniqBy'
import _filter from 'lodash/filter'
import _concat from 'lodash/concat'
import _isNumber from 'lodash/isNumber'
import _take from 'lodash/take'

import { storage } from '@/utils'
import { playMode, constant } from '@/config'
import * as types from './types'

// 播放音乐
export const play = ({commit, state}, {list, index, mode = state.playMode}) => {
  let newList = list
  let newIndex = index
  if (mode === playMode.random){
    newList = _shuffle(list)
    const nowPlay = list[index]
    newIndex = _findIndex(newList, {songid: nowPlay.songid})
  }
  (mode !== state.playMode) && commit(types.SET_PLAY_MODE, mode)
  commit(types.SET_PLAY_LIST, newList)
  commit(types.SET_NOMINAL_LIST, list)
  commit(types.SET_PLAY_INDEX, newIndex)
  commit(types.SET_PLAY_SCREEN, true)
  commit(types.SET_PLAYING, true)
}

export const addPlayList = ({commit, state}, {list, index}) => {
  let newList = _concat(list, state.playList)
  newList = _uniqBy(newList, 'songid')
  commit(types.SET_PLAY_LIST, newList)
  commit(types.SET_NOMINAL_LIST, newList)
  _isNumber(index) && commit(types.SET_PLAY_INDEX, index)
  commit(types.SET_PLAY_SCREEN, true)
  commit(types.SET_PLAYING, true)
}

// 设置是否全屏
export const setScreen = ({commit, state}, bool) => {
  commit(types.SET_PLAY_SCREEN, bool)
}

// 播放暂停
export const setPlaying = ({commit, state}, bool) => {
  commit(types.SET_PLAYING, bool)
}

// 播放歌曲index
export const setPlayIndex = ({commit, state}, index) => {
  commit(types.SET_PLAY_INDEX, index)
}

// 设置播放模式
export const setPlayMode = ({commit, state}, {mode, index = 0, list = state.nominalList}) => {
  let newList = list
  let newIndex = index
  if (mode === playMode.random){
    // 打乱数组
    newList = _shuffle(list)
  }
  const nowPlay = state.playList[index]
  // 重新找到正在播放的歌曲
  newIndex = _findIndex(newList, {songid: nowPlay.songid})
  commit(types.SET_PLAY_MODE, mode)
  commit(types.SET_PLAY_INDEX, newIndex)
  commit(types.SET_PLAY_LIST, newList)
}

// 搜索历史
export const getSearchHistory = ({commit, state}) => {
  const list = storage.get(constant.searchHistoryStorageKey)
  commit(types.SET_SEARCH_HISTORY, list)
}

export const addSearchHistory = ({commit, state}, data) => {
  let list = _clone(state.searchHistory)
  list = [data].concat(list)
  list = _uniqBy(list, 'text')
  list = _take(list, 10)
  storage.set(constant.searchHistoryStorageKey, list)
  commit(types.SET_SEARCH_HISTORY, list)
}

export const removeSearchHistory = ({commit, state}, data) => {
  let list = _clone(state.searchHistory)
  if (_isObject(data)){
    list = _filter(list, ({text}) => text !== data.text)
  } else {
    list = []
  }
  storage.set(constant.searchHistoryStorageKey, list)
  commit(types.SET_SEARCH_HISTORY, list)
}
