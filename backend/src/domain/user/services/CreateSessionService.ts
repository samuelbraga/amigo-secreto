import * as messages from "constants/messages";
import HttpStatus from "http-status-codes";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import authConfig from "@config/auth";
import { User } from "@prisma/client";
import ExceptionBase from "@shared/exceptions/ExceptionBase";

import ICreateSessionRequest from "../http/dtos/ICreateSessionRequest";
import ISessionResponse from "../http/dtos/ISessionResponse";
import { fromUser } from "../mapper/MappingUser";
import IHashProvider from "../providers/hashProvider/models/IHashProvider";
import IUserRepository from "../repositories/IUserRepository";

@injectable()
class CreateSessionService {
    constructor(
        @inject("UserRepository")
        private readonly userRepository: IUserRepository,

        @inject("HashProvider")
        private readonly hashProvider: IHashProvider
    ) {}

    public async execute({
        email,
        password,
    }: ICreateSessionRequest): Promise<ISessionResponse> {
        const user = await this.verifyEmailExist(email);

        await this.verifyPasswordIsCorrect(password, user.password);

        const { secret, expiresIn } = authConfig;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        const userResponse = fromUser(user);

        return { user: userResponse, token };
    }

    private async verifyEmailExist(email: string): Promise<User> {
        const user = await this.userRepository.findUserByEmail(email);

        if (!user) {
            throw this.createExceptionBase();
        }

        return user;
    }

    private async verifyPasswordIsCorrect(
        password: string,
        userPassword: string
    ): Promise<boolean> {
        const passwordMatched = await this.hashProvider.compareHash(
            password,
            userPassword
        );

        if (!passwordMatched) {
            throw this.createExceptionBase();
        }

        return passwordMatched;
    }

    private createExceptionBase(): ExceptionBase {
        return new ExceptionBase(
            messages.INCORRECT_CREDENTIALS_TYPE,
            messages.INCORRECT_CREDENTIALS_TITLE,
            HttpStatus.UNAUTHORIZED,
            messages.INCORRECT_CREDENTIALS_DETAIL,
            messages.INCORRECT_CREDENTIALS_INSTACE
        );
    }
}

export default CreateSessionService;
