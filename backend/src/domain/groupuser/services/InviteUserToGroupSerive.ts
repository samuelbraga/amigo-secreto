import { inject, injectable } from "tsyringe";

import {
    GROUP_USER_REPOSITORY,
    INVITED_USER_REPOSITORY,
    USER_REPOSITORY,
} from "@constants/application";
import IUserRepository from "@domain/user/repositories/IUserRepository";

import IGroupUserRepository from "../repositories/IGroupUserRepository";
import IInvitedUserRepository from "../repositories/IInvitedUserRepository";

@injectable()
class InviteUserToGroupSerive {
    constructor(
        @inject(USER_REPOSITORY)
        private readonly userRepository: IUserRepository,

        @inject(GROUP_USER_REPOSITORY)
        private readonly groupUserRepository: IGroupUserRepository,

        @inject(INVITED_USER_REPOSITORY)
        private readonly invitedUserRepository: IInvitedUserRepository
    ) {}

    public async execute(groupId: string, email: string): Promise<void> {
        const user = await this.userRepository.findUserByEmail(email);

        // if (!user) {
        //     // await this.invitedUserRepository.create(email, groupId);
        //     // send Email
        //     return;
        // }

        // await this.groupUserRepository.invite(groupId, user.id);
        // send Email
    }
}

export default InviteUserToGroupSerive;
