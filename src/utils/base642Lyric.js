import Lyric from 'lyric-parser'
import { Base64 } from 'js-base64'
import { map } from 'lodash'

export const base642Lyric = (str) => {
  const parse = Base64.decode(str)
  let lyric = new Lyric(parse)
  // lyric = map(lyric, )
  lyric.lines = map(lyric.lines, (item) => {
    return {
      ...item,
      time: item.time / 1000
    }
  })
  return lyric
}
