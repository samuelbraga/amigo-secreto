import { User } from "@prisma/client";

export default interface IUserRepository {
    save(name: string, email: string): Promise<User>
}