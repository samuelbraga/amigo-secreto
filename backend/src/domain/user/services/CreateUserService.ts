import { User } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import IUserRepository from "../repositories/IUserRepository";

interface IRequest {
    name: string;
    email: string;
}

@injectable()
class CreateUserService {

    constructor(
        @inject('UserRepository')
        private readonly repository: IUserRepository
    ) {}

    public async execute({ name, email }: IRequest): Promise<User> {
        const user = await this.repository.save(name, email);
        return user;
    }

}

export default CreateUserService;