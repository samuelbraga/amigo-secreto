import { User } from "@prisma/client";
import ICreateUserRequest from "../http/dtos/ICreateUserRequest";

export default interface IUserRepository {
    save(data: ICreateUserRequest): Promise<User>
    update(data: User): Promise<User>
    findUserById(user_id: string): Promise<User | null>
    findUserByEmail(email: string): Promise<User | null>
}