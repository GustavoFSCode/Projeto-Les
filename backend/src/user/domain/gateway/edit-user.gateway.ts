import { EditUserEntity } from '../entities/edit-user.entity'
import { UserEntity } from '../entities/user.entity'

export interface EditUser {
  editUser(editUserEntity: EditUserEntity): Promise<UserEntity>
}
