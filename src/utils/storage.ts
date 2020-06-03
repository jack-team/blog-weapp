export const clear = () => (
  new Promise(resolve => (
    resolve(wx.clearStorageSync())
  ))
)

export const getItem = (key: string) => (
  new Promise(resolve => (
    resolve(wx.getStorageSync(key))
  ))
)

export const removeItem = (key: string) => (
  new Promise(resolve => (
    resolve(wx.removeStorageSync(key))
  ))
)

export const setItem = (key: string, value: any) => (
  new Promise(resolve => (
    resolve(wx.setStorageSync(key, value))
  ))
)


