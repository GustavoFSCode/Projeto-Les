import { EmailValidator } from '@/common/domain/use-cases/gateway/email-validator.gateway'

export const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    public validate(email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}
