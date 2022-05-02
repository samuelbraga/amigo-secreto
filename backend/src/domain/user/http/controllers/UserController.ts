import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { container } from "tsyringe";

import { fromUser } from "@domain/user/mapper/MappingUser";

import CreateUserService from "../../services/CreateUserService";
import ICreateUserRequest from "../dtos/ICreateUserRequest";

export default class UserController {
    public async createUser(
        request: Request,
        response: Response
    ): Promise<Response> {
        const createUserService = container.resolve(CreateUserService);

        const requestModel: ICreateUserRequest = request.body;

        const user = await createUserService.execute(requestModel);

        const userResponse = fromUser(user);

        return response.status(HttpStatus.CREATED).json(userResponse);
    }
}
