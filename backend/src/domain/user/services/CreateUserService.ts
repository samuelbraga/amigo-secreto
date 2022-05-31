import HttpStatus from "http-status-codes";
import { inject, injectable } from "tsyringe";

import { HASH_PROVIDER, USER_REPOSITORY } from "@constants/application";
import * as messages from "@constants/messages";
import { User } from "@prisma/client";
import ExceptionBase from "@shared/exceptions/ExceptionBase";

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
        await this.checkUserEmailExists(email);

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.repository.save({
            name,
            email,
            password: hashedPassword,
        });

        return user;
    }

    private async checkUserEmailExists(email: string): Promise<void> {
        const user = await this.repository.findUserByEmail(email);

        if (user) {
            throw new ExceptionBase(
                messages.USER_EMAIL_EXISTS_TYPE,
                messages.USER_EMAIL_EXISTS_TITLE,
                HttpStatus.BAD_REQUEST,
                messages.USER_EMAIL_EXISTS_DETAIL,
                messages.USER_INSTANCE
            );
        }
    }
}

export default CreateUserService;
