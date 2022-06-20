import { inject, injectable } from "tsyringe";

import {
    GROUP_REPOSITORY,
    GROUP_USER_REPOSITORY,
} from "@constants/application";
import IGroupRepository from "@domain/group/repositories/IGroupRepository";

import IGroupUserResponse from "../http/dtos/IGroupUserResponse";
import IGroupUserRepository from "../repositories/IGroupUserRepository";

@injectable()
class InviteUserToGroupSerive {
    constructor(
        @inject(GROUP_USER_REPOSITORY)
        private readonly repository: IGroupUserRepository,

        @inject(GROUP_REPOSITORY)
        private readonly groupRepository: IGroupRepository
    ) {}

    public async execute(
        groupId: string,
        invetedUserId: string
    ): Promise<IGroupUserResponse> {
        const groupUser = await this.repository.invite(groupId, invetedUserId);

        return groupUser;
    }
}

export default InviteUserToGroupSerive;
