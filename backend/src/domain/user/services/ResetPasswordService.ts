import { isAfter, addHours } from "date-fns";
import HttpStatus from "http-status-codes";
import { injectable, inject } from "tsyringe";

import IHashProvider from "@domain/user/providers/hashProvider/models/IHashProvider";
import IUserRepository from "@domain/user/repositories/IUserRepository";
import IUserTokenRepository from "@domain/user/repositories/IUserTokenRepository";
import ExceptionBase from "@shared/exceptions/ExceptionBase";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject("UserRepository")
        private readonly usersepository: IUserRepository,

        @inject("UserTokenRepository")
        private readonly userTokenRepository: IUserTokenRepository,

        @inject("HashProvider")
        private readonly hashProvider: IHashProvider
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if (!userToken) {
            throw new ExceptionBase(
                HttpStatus.BAD_REQUEST,
                "User token does not exists"
            );
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new ExceptionBase(HttpStatus.BAD_REQUEST, "Token expired");
        }

        const user = await this.usersepository.findUserById(userToken.user_id);

        if (!user) {
            throw new ExceptionBase(
                HttpStatus.BAD_REQUEST,
                "User does not exists"
            );
        }

        user.password = await this.hashProvider.generateHash(password);
        await this.usersepository.update(user);
    }
}

export default ResetPasswordService;
