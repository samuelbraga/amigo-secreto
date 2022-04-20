import { Request, Response } from "express";
import { container } from "tsyringe";
import HttpStatus from 'http-status-codes'

import CreateUserService from "../services/CreateUserService";

export default class UserController {
    public async createUser(request: Request, response: Response): Promise<Response> {
        const createUserService = container.resolve(CreateUserService);
        
        const { name, email } = request.body;
        
        const user = await createUserService.execute({ name, email })

        return response.status(HttpStatus.CREATED).json(user);
    }
}