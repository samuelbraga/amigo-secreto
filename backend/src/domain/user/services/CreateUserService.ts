import { User } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import ICreateUserRequest from "../http/dto/ICreateUserRequest";
import IUserRepository from "../repositories/IUserRepository";

@injectable()
class CreateUserService {

    constructor(
        @inject('UserRepository')
        private readonly repository: IUserRepository
    ) {}

    public async execute(data: ICreateUserRequest): Promise<User> {
        const user = await this.repository.save(data);
        
        return user;
    }

}

export default CreateUserService;