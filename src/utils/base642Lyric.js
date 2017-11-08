import Lyric from 'lyric-parser'
import {Base64} from 'js-base64'

export const base642Lyric = (str) => {
  const parse = Base64.decode(str)
  let lyric = new Lyric(parse)
  return lyric
}
