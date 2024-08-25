import { AddUserEntity } from '@/user/domain/entities/add-user.entity'
import { UserEntity } from '@/user/domain/entities/user.entity'
import { AddUser } from '@/user/domain/gateway/add-user.gateway'

export const makeAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    public async addUser(userEntity: AddUserEntity): Promise<UserEntity> {
      return new UserEntity({
        id: 1,
        name: 'valid_name',
        email: 'valid_email',
        password: 'valid_password',
        cpf: 'valid_cpf',
        phoneNumber: 'valid_phone_number',
        gender: 'valid_gender',
        birthDate: new Date()
      })
    }
  }

  return new AddUserStub()
}
