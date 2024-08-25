import { UserEntity } from '../entities/user.entity'

export interface ListUsers {
  listUsers(): Promise<Array<UserEntity>>
}
