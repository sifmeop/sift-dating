import { API_URL } from '~/shared/constants'
import { API } from '~/shared/lib/api'
import { IUser } from '~/shared/types'
import { TypeForgotPasswordSchema, TypeLoginSchema, TypeRegisterSchema, TypeResetPasswordSchema } from '../schemas'

class AuthService {
  async register(data: TypeRegisterSchema) {
    const response = await API.post<IUser>('/auth/register', data)
    return response.data
  }

  async login(data: TypeLoginSchema) {
    const response = await API.post<IUser>('/auth/login', data)
    return response.data
  }

  async oauthByProvider(provider: 'google' | 'github') {
    window.location.href = `${API_URL}/auth/oauth/${provider}`
  }

  async forgotPassword(data: TypeForgotPasswordSchema) {
    const response = await API.post<{ token: string }>('/auth/forgot-password', data)
    return response.data
  }

  async resetPassword(data: TypeResetPasswordSchema) {
    const response = await API.post('/auth/reset-password', data)
    return response.data
  }

  async logout() {
    const response = await API.post('/auth/logout')
    return response.data
  }
}

export const authService = new AuthService()
