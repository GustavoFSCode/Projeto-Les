import { AddUserEntity } from '../entities/add-user.entity'
import { UserEntity } from '../entities/user.entity'

export interface AddUser {
  addUser(userEntity: AddUserEntity): Promise<UserEntity>
}
