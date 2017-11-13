const debug = process.env.NODE_ENV !== 'production'

export const get = (key) => {
  let value
  try {
    value = JSON.parse(window.localStorage.getItem(key))
  } catch (e) {
    if (debug) {
      throw new Error('浏览器不支持localStorage!')
    }
  }
  return value
}

export const set = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    if (debug) {
      throw new Error('浏览器不支持localStorage!')
    }
  }
}

export const remove = (key) => {
  try {
    window.localStorage.removeItem(key)
  } catch (e) {
    if (debug) {
      throw new Error('浏览器不支持localStorage!')
    }
  }
}
