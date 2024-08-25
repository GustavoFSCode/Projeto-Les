import { UserEntity } from "../entities/user.entity";

export interface ChangeUserPassword {
    changeUserPassword(userId: number, password: string): Promise<UserEntity>
}