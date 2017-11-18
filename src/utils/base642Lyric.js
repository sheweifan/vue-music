import Lyric from 'lyric-parser'
import { Base64 } from 'js-base64'
import _map from 'lodash/map'

export const base642Lyric = (str) => {
  const parse = Base64.decode(str)
  let lyric = new Lyric(parse)
  // lyric = map(lyric, )
  lyric.lines = _map(lyric.lines, (item) => {
    return {
      ...item,
      time: item.time / 1000
    }
  })
  return lyric
}
