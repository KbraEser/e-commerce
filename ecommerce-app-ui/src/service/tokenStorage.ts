const TOKEN_KEY = 'token'

export const saveToken = (token: string, rememberMe: boolean) => {
  clearToken()

  if (rememberMe) {
    localStorage.setItem(TOKEN_KEY, token)
  } else {
    sessionStorage.setItem(TOKEN_KEY, token)
  }
}

export const getToken = (): { token: string; rememberMe: boolean } | null => {
  const localToken = localStorage.getItem(TOKEN_KEY)
  if (localToken) {
    return { token: localToken, rememberMe: true }
  }

  const sessionToken = sessionStorage.getItem(TOKEN_KEY)
  if (sessionToken) {
    return { token: sessionToken, rememberMe: false }
  }

  return null
}

export const renewToken = (token: string, rememberMe: boolean) => {
  if (rememberMe) {
    localStorage.setItem(TOKEN_KEY, token)
    sessionStorage.removeItem(TOKEN_KEY)
  } else {
    sessionStorage.setItem(TOKEN_KEY, token)
    localStorage.removeItem(TOKEN_KEY)
  }
}

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(TOKEN_KEY)
}
