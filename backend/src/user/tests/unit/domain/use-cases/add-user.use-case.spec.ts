import { CpfValidator } from '@/common/domain/use-cases/gateway/cpf-validator.gateway'
import { DateValidator } from '@/common/domain/use-cases/gateway/date-validator.gateway'
import { EmailValidator } from '@/common/domain/use-cases/gateway/email-validator.gateway'
import { makeCpfValidator } from '@/common/tests/unit/mocks/make-cpf-validator.stub'
import { makeDateValidator } from '@/common/tests/unit/mocks/make-date-validator.stub'
import { makeEmailValidator } from '@/common/tests/unit/mocks/make-email-validator.stub'
import { AddUser } from '@/user/domain/gateway/add-user.gateway'
import { AddUserUseCase } from '@/user/domain/use-cases/add-user.use-case'
import { makeAddUser } from '../../mocks/make-add-user.stub'
import { MissingParamError } from '@/common/domain/use-cases/errors/missing-param.error'
import { InvalidParamError } from '@/common/domain/use-cases/errors/invalid-param.error'

global.Date.now = jest.fn().mockImplementation(() => {
  return 14664224490000
})

interface SutTypes {
  sut: AddUserUseCase
  emailValidator: EmailValidator
  cpfValidator: CpfValidator
  dateValidator: DateValidator
  addUser: AddUser
}

const makeSut = (): SutTypes => {
  const emailValidator = makeEmailValidator()
  const cpfValidator = makeCpfValidator()
  const dateValidator = makeDateValidator()
  const addUser = makeAddUser()

  const sut = new AddUserUseCase(
    emailValidator,
    cpfValidator,
    dateValidator,
    addUser
  )

  return {
    sut,
    emailValidator,
    cpfValidator,
    dateValidator,
    addUser
  }
}

describe('AddUserUseCase Tests', () => {
  test('should throw MissingParamError if no name was provided', async () => {
    const { sut } = makeSut()

    const input = {
      name: '',
      gender: '',
      cpf: '',
      birthDate: new Date(),
      email: '',
      password: '',
      passwordConfirmation: '',
      phoneNumber: ''
    }

    try {
      await sut.execute(input)
    } catch (e: any) {
      expect(e).toBeInstanceOf(MissingParamError)
      expect(e.message).toBe(new MissingParamError('name').message)
    }
  })

  test('should throw MissingParamError if no gender was provided', async () => {
    const { sut } = makeSut()

    const input = {
      name: 'valid_name',
      gender: '',
      cpf: '',
      birthDate: new Date(),
      email: '',
      password: '',
      passwordConfirmation: '',
      phoneNumber: ''
    }

    try {
      await sut.execute(input)
    } catch (e: any) {
      expect(e).toBeInstanceOf(MissingParamError)
      expect(e.message).toBe(new MissingParamError('gender').message)
    }
  })

  test('should throw MissingParamError if no cpf was provided', async () => {
    const { sut } = makeSut()

    const input = {
      name: 'valid_name',
      gender: 'valid_gender',
      cpf: '',
      birthDate: new Date(),
      email: '',
      password: '',
      passwordConfirmation: '',
      phoneNumber: ''
    }

    try {
      await sut.execute(input)
    } catch (e: any) {
      expect(e).toBeInstanceOf(MissingParamError)
      expect(e.message).toBe(new MissingParamError('cpf').message)
    }
  })

  test('should throw MissingParamError if no birthDate was provided', async () => {
    const { sut } = makeSut()

    const input = {
      name: 'valid_name',
      gender: 'valid_gender',
      cpf: 'valid_cpf',
      birthDate: null,
      email: '',
      password: '',
      passwordConfirmation: '',
      phoneNumber: ''
    }

    try {
      await sut.execute(input)
    } catch (e: any) {
      expect(e).toBeInstanceOf(MissingParamError)
      expect(e.message).toBe(new MissingParamError('birthDate').message)
    }
  })

  test('should throw MissingParamError if no email was provided', async () => {
    const { sut } = makeSut()

    const input = {
      name: 'valid_name',
      gender: 'valid_gender',
      cpf: 'valid_cpf',
      birthDate: new Date(),
      email: '',
      password: '',
      passwordConfirmation: '',
      phoneNumber: ''
    }

    try {
      await sut.execute(input)
    } catch (e: any) {
      expect(e).toBeInstanceOf(MissingParamError)
      expect(e.message).toBe(new MissingParamError('email').message)
    }
  })

  test('should throw MissingParamError if no password was provided', async () => {
    const { sut } = makeSut()

    const input = {
      name: 'valid_name',
      gender: 'valid_gender',
      cpf: 'valid_cpf',
      birthDate: new Date(),
      email: 'valid_email@email.com',
      password: '',
      passwordConfirmation: '',
      phoneNumber: ''
    }

    try {
      await sut.execute(input)
    } catch (e: any) {
      expect(e).toBeInstanceOf(MissingParamError)
      expect(e.message).toBe(new MissingParamError('password').message)
    }
  })

  test('should throw MissingParamError if no passwordConfirmation was provided', async () => {
    const { sut } = makeSut()

    const input = {
      name: 'valid_name',
      gender: 'valid_gender',
      cpf: 'valid_cpf',
      birthDate: new Date(),
      email: 'valid_email@email.com',
      password: 'valid_password',
      passwordConfirmation: '',
      phoneNumber: ''
    }

    try {
      await sut.execute(input)
    } catch (e: any) {
      expect(e).toBeInstanceOf(MissingParamError)
      expect(e.message).toBe(
        new MissingParamError('passwordConfirmation').message
      )
    }
  })

  test('should throw MissingParamError if no phoneNumber was provided', async () => {
    const { sut } = makeSut()

    const input = {
      name: 'valid_name',
      gender: 'valid_gender',
      cpf: 'valid_cpf',
      birthDate: new Date(),
      email: 'valid_email@email.com',
      password: 'valid_password',
      passwordConfirmation: 'valid_password',
      phoneNumber: 'valid_phone_number'
    }

    try {
      await sut.execute(input)
    } catch (e: any) {
      expect(e).toBeInstanceOf(MissingParamError)
      expect(e.message).toBe(new MissingParamError('phoneNumber').message)
    }
  })

  test('should throw InvalidParamError if no invalid passwordConfirmation was provided', async () => {
    const { sut } = makeSut()

    const input = {
      name: 'valid_name',
      gender: 'valid_gender',
      cpf: 'valid_cpf',
      birthDate: new Date(),
      email: 'valid_email@email.com',
      password: 'valid_password',
      passwordConfirmation: 'invalid_password',
      phoneNumber: 'valid_phone_number'
    }

    try {
      await sut.execute(input)
    } catch (e: any) {
      expect(e).toBeInstanceOf(InvalidParamError)
      expect(e.message).toBe(
        new InvalidParamError('passwordConfirmation').message
      )
    }
  })
})
