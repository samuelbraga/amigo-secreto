import { HASH_PROVIDER, USER_REPOSITORY } from "constants/application";
import { inject, injectable } from "tsyringe";

import { User } from "@prisma/client";

import ICreateUserRequest from "../http/dtos/ICreateUserRequest";
import IHashProvider from "../providers/hashProvider/models/IHashProvider";
import IUserRepository from "../repositories/IUserRepository";

@injectable()
class CreateUserService {
    constructor(
        @inject(USER_REPOSITORY)
        private readonly repository: IUserRepository,

        @inject(HASH_PROVIDER)
        private readonly hashProvider: IHashProvider
    ) {}

    public async execute({
        name,
        password,
        email,
    }: ICreateUserRequest): Promise<User> {
        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.repository.save({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }
}

export default CreateUserService;
