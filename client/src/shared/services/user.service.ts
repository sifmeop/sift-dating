import { API } from '~/shared/lib/api'
import { IUser } from '~/shared/types'

class UserService {
  async getUser() {
    const response = await API.get<IUser>('/users/profile')
    return response.data
  }
}

export const userService = new UserService()
