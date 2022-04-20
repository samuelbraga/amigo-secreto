import { PrismaClient, User } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import IUserRepository from "../repositories/IUserRepository";

@injectable()
class UserRepository implements IUserRepository{

    constructor(
        @inject('PrismaClient')
        private readonly prisma: PrismaClient
    ) {}
    
    public async save(name: string, email: string): Promise<User> {
        const user = await this.prisma.user.create({
            data: {
                name,
                email
            }
        });

        return user;
    }

    
}

export default UserRepository;