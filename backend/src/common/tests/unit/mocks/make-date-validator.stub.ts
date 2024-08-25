import { DateValidator } from '@/common/domain/use-cases/gateway/date-validator.gateway'

export const makeDateValidator = (): DateValidator => {
  class DateValidatorStub implements DateValidator {
    public validate(date: Date): boolean {
      return true
    }
  }

  return new DateValidatorStub()
}
