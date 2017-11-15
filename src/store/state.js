import { playMode, constant } from '@/config'
import { storage } from '@/utils'

export default {
  playList: [],
  playIndex: -1,
  playMode: playMode.order,
  playScreen: false,
  nominalList: [],
  playing: false,
  playListChecking: false,
  searchHistory: storage.get(constant.searchHistoryStorageKey) || [],
  collectHistory: storage.get(constant.collectHistoryStorageKey) || [],
  playHistory: storage.get(constant.playHistoryStorageKey) || []
}
