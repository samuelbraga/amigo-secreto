import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { container } from "tsyringe";

import SendForgotPasswordEmailService from "@domain/user/services/SendForgotPasswordEmailService";

export default class ForgotPasswordController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const sendForgotPasswordEmailService = container.resolve(
            SendForgotPasswordEmailService
        );

        const { email } = request.body;

        await sendForgotPasswordEmailService.execute({ email });

        return response.status(HttpStatus.NO_CONTENT).json();
    }
}
