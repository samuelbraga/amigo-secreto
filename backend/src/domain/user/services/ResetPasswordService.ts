import { isAfter, addHours } from "date-fns";
import HttpStatus from "http-status-codes";
import { injectable, inject } from "tsyringe";

import {
    HASH_PROVIDER,
    USER_REPOSITORY,
    USER_TOKEN_REPOSITORY,
} from "@constants/application";
import * as messages from "@constants/messages";
import IHashProvider from "@domain/user/providers/hashProvider/models/IHashProvider";
import IUserRepository from "@domain/user/repositories/IUserRepository";
import IUserTokenRepository from "@domain/user/repositories/IUserTokenRepository";
import ExceptionBase from "@shared/exceptions/ExceptionBase";

import IResetPasswordRequest from "../http/dtos/IResetPasswordRequest";

@injectable()
class ResetPasswordService {
    constructor(
        @inject(USER_REPOSITORY)
        private readonly usersepository: IUserRepository,

        @inject(USER_TOKEN_REPOSITORY)
        private readonly userTokenRepository: IUserTokenRepository,

        @inject(HASH_PROVIDER)
        private readonly hashProvider: IHashProvider
    ) {}

    public async execute({
        token,
        password,
    }: IResetPasswordRequest): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if (!userToken) {
            throw new ExceptionBase(
                messages.USER_TOKEN_CREDENTIALS_DOES_NOT_EXISTS_TYPE,
                messages.USER_TOKEN_CREDENTIALS_DOES_NOT_EXISTS_TITLE,
                HttpStatus.BAD_REQUEST,
                messages.USER_TOKEN_CREDENTIALS_DOES_NOT_EXISTS_DETAIL,
                messages.USER_TOKEN_CREDENTIALS_INSTACE
            );
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new ExceptionBase(
                messages.USER_TOKEN_CREDENTIALS_EXPIRED_TYPE,
                messages.USER_TOKEN_CREDENTIALS_EXPIRED_TITLE,
                HttpStatus.BAD_REQUEST,
                messages.USER_TOKEN_CREDENTIALS_EXPIRED_DETAIL,
                messages.USER_TOKEN_CREDENTIALS_INSTACE
            );
        }

        const user = await this.usersepository.findUserById(userToken.user_id);

        if (!user) {
            throw new ExceptionBase(
                messages.USER_DOES_NOT_EXISTS_TYPE,
                messages.USER_DOES_NOT_EXISTS_TITLE,
                HttpStatus.BAD_REQUEST,
                messages.USER_DOES_NOT_EXISTS_DETAIL,
                messages.INCORRECT_CREDENTIALS_INSTACE
            );
        }

        user.password = await this.hashProvider.generateHash(password);
        await this.usersepository.update(user);
    }
}

export default ResetPasswordService;
