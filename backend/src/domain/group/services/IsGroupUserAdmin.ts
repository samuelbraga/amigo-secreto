import { inject, injectable } from "tsyringe";

import { GROUP_REPOSITORY } from "@constants/application";
import { Group } from "@prisma/client";

import IGroupRepository from "../repositories/IGroupRepository";

@injectable()
class IsGroupUserAdmin {
    constructor(
        @inject(GROUP_REPOSITORY)
        private readonly repository: IGroupRepository
    ) {}

    public async execute(userId: string, groupId: string): Promise<boolean> {
        const user = await this.repository.getByUserAdmin(userId, groupId);
        return !!user;
    }
}

export default IsGroupUserAdmin;
