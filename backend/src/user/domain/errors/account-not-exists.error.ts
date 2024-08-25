import { CustomError } from "@/common/domain/use-cases/errors/custom.error";

export class AccountNotExistsError extends CustomError {
    public constructor(id: number) {
        super(`Account not exists with id: ${id}`, 403);
        this.name = 'AccountNotExistsError'
    }
}