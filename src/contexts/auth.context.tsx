import { ACCESS_TOKEN } from '@/constants/core/local-storage-keys.constant'
import { AuthStatus } from '@/enum/core/auth-status.enum'

import { JwtPayload } from '@/types/auth/jwt-payload.interface'
import { User } from '@/types/user/user.interface'
import {
  getFromLocalStorage,
  removeFromLocalStorage,
  saveToLocalStorage
} from '@/utils/local-storage.utl'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

type AuthContextType = {
  token: string | null
  authStatus: AuthStatus
  login: (token: string) => void
  logout: () => void
  user: User | null
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(null)
  const [authStatus, setAuthStatus] = useState<AuthStatus>(AuthStatus.PENDING)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedToken = getFromLocalStorage<string>(ACCESS_TOKEN)

    if (storedToken) {
      setToken(storedToken)
      const decoded = jwtDecode<JwtPayload>(storedToken)
      setUser({ id: decoded.id, username: decoded.username })
      setAuthStatus(AuthStatus.AUTHENTICATED)
      return
    }

    setAuthStatus(AuthStatus.UNAUTHENTICATED)
  }, [])

  const login = useCallback((token: string) => {
    saveToLocalStorage(ACCESS_TOKEN, token)
    setToken(token)
    const decoded = jwtDecode<JwtPayload>(token)
    setUser({ id: decoded.id, username: decoded.username })
    setAuthStatus(AuthStatus.AUTHENTICATED)
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }, [])

  const logout = useCallback(() => {
    removeFromLocalStorage(ACCESS_TOKEN)
    setToken(null)
    setUser(null)
    setAuthStatus(AuthStatus.UNAUTHENTICATED)
  }, [])

  const initialAuthContext = useMemo<AuthContextType>(
    () => ({
      token: token,
      authStatus: authStatus,
      user: user,
      login,
      logout
    }),
    [authStatus, login, logout, token, user]
  )

  return (
    <AuthContext.Provider value={initialAuthContext}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
