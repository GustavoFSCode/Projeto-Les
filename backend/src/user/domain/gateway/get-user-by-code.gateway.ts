import { UserEntity } from '../entities/user.entity'

export interface GetUserByCode {
  getUserByCode(id: number): Promise<UserEntity | null>
}
