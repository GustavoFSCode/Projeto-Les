import { CpfValidator } from '@/common/domain/use-cases/gateway/cpf-validator.gateway'

export const makeCpfValidator = (): CpfValidator => {
  class CpfValidatorStub implements CpfValidator {
    validate(cpf: string): boolean {
      return true
    }
  }

  return new CpfValidatorStub()
}
