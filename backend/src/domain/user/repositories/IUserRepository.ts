import { User } from "@prisma/client";
import ICreateUserRequest from "../http/dto/ICreateUserRequest";

export default interface IUserRepository {
    save(data: ICreateUserRequest): Promise<User>
}