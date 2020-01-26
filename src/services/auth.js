export const isBrowser = () => typeof window !== 'undefined'

export const getUser = () =>
  isBrowser() && window.localStorage.getItem(`${process.env.STORAGE_PREFIX}.userSession`)
    ? JSON.parse(window.localStorage.getItem(`${process.env.STORAGE_PREFIX}.userSession`))
    : {}

export const getUserToken = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(`${process.env.STORAGE_PREFIX}.sessionToken`)
  }
}

export const setUserSession = user => {
  if (user === null) {
    return window.localStorage.removeItem(`${process.env.STORAGE_PREFIX}.userSession`)
  }

  window.localStorage.setItem(`${process.env.STORAGE_PREFIX}.userSession`, JSON.stringify(user))
}

export const setSessionToken = token => {
  if (token === null) {
    return window.localStorage.removeItem(`${process.env.STORAGE_PREFIX}.sessionToken`)
  }

  window.localStorage.setItem(`${process.env.STORAGE_PREFIX}.sessionToken`, token)
}

export const handleLogin = async (data) => {
  const response = await fetch(`${process.env.MSB_URL}/esquadraoQueroMais/v1/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  return await response.json();
}

export const isLoggedIn = () => {
  const userToken = getUserToken()
  return !!userToken
}

export const logout = callback => {
  setUserSession(null)
  setSessionToken(null)
  callback()
}