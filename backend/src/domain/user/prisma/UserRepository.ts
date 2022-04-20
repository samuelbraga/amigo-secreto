import { PrismaClient, User } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import ICreateUserRequest from "../http/dto/ICreateUserRequest";
import IUserRepository from "../repositories/IUserRepository";

@injectable()
class UserRepository implements IUserRepository{

    constructor(
        @inject('PrismaClient')
        private readonly prisma: PrismaClient
    ) {}
    
    public async save(data: ICreateUserRequest): Promise<User> {
        const { name, email } = data;
        
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