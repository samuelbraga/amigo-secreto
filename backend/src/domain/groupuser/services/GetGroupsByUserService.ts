import { inject, injectable } from "tsyringe";

import { GROUP_USER_REPOSITORY } from "@constants/application";

import ISelfGroupUser from "../http/dtos/ISelfGroupUser";
import IGroupUserRepository from "../repositories/IGroupUserRepository";

@injectable()
class GetGroupsByUserService {
    constructor(
        @inject(GROUP_USER_REPOSITORY)
        private readonly repository: IGroupUserRepository
    ) {}

    public async execute(user_id: string): Promise<ISelfGroupUser[]> {
        const selfGroups = await this.repository.getByUser(user_id);
        return selfGroups;
    }
}

export default GetGroupsByUserService;
