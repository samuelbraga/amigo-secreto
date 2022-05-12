import { inject, injectable } from "tsyringe";

import { PRIMA_CLIENT } from "@constants/application";
import { PrismaClient, User } from "@prisma/client";

import ICreateUserRequest from "../http/dtos/ICreateUserRequest";
import IUserRepository from "../repositories/IUserRepository";

@injectable()
class UserRepository implements IUserRepository {
    constructor(
        @inject(PRIMA_CLIENT)
        private readonly prisma: PrismaClient
    ) {}

    public async save(data: ICreateUserRequest): Promise<User> {
        const { name, password, email } = data;

        const user = await this.prisma.user.create({
            data: {
                name,
                password,
                email,
            },
        });

        return user;
    }

    public async update(data: User): Promise<User> {
        const { id, name, password, email } = data;

        const user = await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                name,
                email,
                password,
                updated_at: new Date(Date.now()).toISOString(),
            },
        });

        return user;
    }

    public async findUserById(user_id: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({
            where: {
                id: user_id,
            },
        });

        return user;
    }

    public async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.prisma.user.findFirst({
            where: {
                email,
            },
        });

        return user;
    }
}

export default UserRepository;
