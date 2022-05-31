import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { container } from "tsyringe";

import CreateSessionService from "@domain/user/services/CreateSessionService";

export default class SessionsController {
    public async createToken(
        request: Request,
        response: Response
    ): Promise<Response> {
        const createSessionService = container.resolve(CreateSessionService);

        const { email, password } = request.body;

        const responseSession = await createSessionService.execute({
            email,
            password,
        });

        return response.status(HttpStatus.CREATED).json(responseSession);
    }
}
