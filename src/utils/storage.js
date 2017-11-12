const debug = process.env.NODE_ENV !== 'production'

export const getItem = (key) => {
  let value
  try {
    value = window.localStorage.getItem(key)
  } catch (e) {
    if (debug) {
      throw new Error('浏览器不支持localStorage!')
    }
  }
  return value
}

export const setItem = (key, value) => {
  try {
    window.localStorage.setItem(key, value)
  } catch (e) {
    if (debug) {
      throw new Error('浏览器不支持localStorage!')
    }
  }
}

export const removeItem = (key) => {
  try {
    window.localStorage.removeItem(key)
  } catch (e) {
    if (debug) {
      throw new Error('浏览器不支持localStorage!')
    }
  }
}