import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { container } from "tsyringe";

import ResetPasswordService from "@domain/user/services/ResetPasswordService";

import IResetPasswordRequest from "../dtos/IResetPasswordRequest";

export default class ResetPasswordController {
    public async resetPassword(
        request: Request,
        response: Response
    ): Promise<Response> {
        const resetPasswordService = container.resolve(ResetPasswordService);

        const { token, password }: IResetPasswordRequest = request.body;

        await resetPasswordService.execute({ token, password });

        return response.status(HttpStatus.NO_CONTENT).json();
    }
}
