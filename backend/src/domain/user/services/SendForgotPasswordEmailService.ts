import HttpStatus from "http-status-codes";
import path from "path";
import { injectable, inject } from "tsyringe";

import IUserRepository from "@domain/user/repositories/IUserRepository";
import IUserTokenRepository from "@domain/user/repositories/IUserTokenRepository";
import IMailProvider from "@shared/container/providers/mailProvider/models/IMailProvider";
import ExceptionBase from "@shared/exceptions/ExceptionBase";

import * as messages from "constants/messages";

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject("UserRepository")
        private readonly userRepository: IUserRepository,

        @inject("MailProvider")
        private readonly mailProvider: IMailProvider,

        @inject("UserTokenRepository")
        private readonly userTokenRepository: IUserTokenRepository
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.userRepository.findUserByEmail(email);

        if (!user) {
            throw new ExceptionBase(
                messages.USER_DOES_NOT_EXISTS_TYPE,
                messages.USER_DOES_NOT_EXISTS_TITLE,
                HttpStatus.BAD_REQUEST,
                messages.USER_DOES_NOT_EXISTS_DETAIL,
                messages.INCORRECT_CREDENTIALS_INSTACE
            );
        }

        const { token } = await this.userTokenRepository.generate(user.id);

        const forgotPasswordTemplate = path.resolve(
            __dirname,
            "..",
            "views",
            "forgot_password.hbs"
        );

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email,
            },
            subject: "[Amigo Oculto] Recuperação de senha",
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    token,
                    link: `${process.env.WEB_BASE_URL}/reset-password?token=${token}`,
                },
            },
        });
    }
}

export default SendForgotPasswordEmailService;
