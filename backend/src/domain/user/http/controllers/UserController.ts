import { Request, Response } from "express";
import { container } from "tsyringe";
import HttpStatus from 'http-status-codes'

import CreateUserService from "../../services/CreateUserService";
import ICreateUserRequest from "../dto/ICreateUserRequest";
import IUserResponse from "../dto/IUserResponse";
import { fromUser } from "@domain/user/mapper/MappingUser";

export default class UserController {
    public async createUser(request: Request, response: Response): Promise<Response> {
        const createUserService = container.resolve(CreateUserService);
        
        const requestModel: ICreateUserRequest = request.body;
        
        const user = await createUserService.execute(requestModel);

        const userResponse: IUserResponse = fromUser(user);

        return response.status(HttpStatus.CREATED).json(userResponse);
    }
}