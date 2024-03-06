export const getData: any = (key: string) => {
  let session: any = sessionStorage.getItem(key) || null;
  try {
    session = JSON.parse(session)
  } catch(e) {
    console.log(e)
  }
  return session
}

export const setData: any = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value))
}

export const removeData: any = (key: string) => {
  sessionStorage.removeItem(key)
}

export const getStorage: any = (key: string) => {
  let session: any = localStorage.getItem(key) || null;
  try {
    session = JSON.parse(session)
  } catch(e) {
    console.log(e)
  }
  return session
}

export const setStorage: any = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeStorage: any = (key: string) => {
  localStorage.removeItem(key)
}

export const clearData = () => {
  sessionStorage.clear()
}

export const clearStorage = () => {
  sessionStorage.clear()
}