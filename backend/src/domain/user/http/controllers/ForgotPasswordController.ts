import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { container } from "tsyringe";

import { HEADER_EMAIL } from "@constants/application";
import * as messages from "@constants/messages";
import SendForgotPasswordEmailService from "@domain/user/services/SendForgotPasswordEmailService";
import ExceptionBase from "@shared/exceptions/ExceptionBase";

export default class ForgotPasswordController {
    public async createResetPasswordToken(
        request: Request,
        response: Response
    ): Promise<Response> {
        const sendForgotPasswordEmailService = container.resolve(
            SendForgotPasswordEmailService
        );

        const email = request.header(HEADER_EMAIL);

        if (!email) {
            throw new ExceptionBase(
                messages.USER_DOES_NOT_EXISTS_TYPE,
                messages.USER_DOES_NOT_EXISTS_TITLE,
                HttpStatus.BAD_REQUEST,
                messages.USER_DOES_NOT_EXISTS_DETAIL,
                messages.USER_INSTANCE
            );
        }

        await sendForgotPasswordEmailService.execute({ email });

        return response.status(HttpStatus.NO_CONTENT).json();
    }
}
