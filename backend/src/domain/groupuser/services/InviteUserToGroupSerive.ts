import HttpStatus from "http-status-codes";
import { inject, injectable } from "tsyringe";

import {
    GROUP_REPOSITORY,
    GROUP_USER_REPOSITORY,
} from "@constants/application";
import * as messages from "@constants/messages";
import IGroupRepository from "@domain/group/repositories/IGroupRepository";
import { GroupUser } from "@prisma/client";
import ExceptionBase from "@shared/exceptions/ExceptionBase";

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
        group_id: string,
        inveted_user_id: string,
        user_id: string
    ): Promise<GroupUser> {
        const group = await this.groupRepository.getByUserAdmin(
            user_id,
            group_id
        );

        if (!group) {
            throw this.createUnauthorizedExceptionBase();
        }

        const groupUser = await this.repository.invite(
            group_id,
            inveted_user_id
        );

        return groupUser;
    }

    private createUnauthorizedExceptionBase(): ExceptionBase {
        return new ExceptionBase(
            messages.USER_UNAUTHORIZED_TYPE,
            messages.USER_UNAUTHORIZED_TITLE,
            HttpStatus.UNAUTHORIZED,
            messages.USER_UNAUTHORIZED_DETAIL,
            messages.USER_UNAUTHORIZED_DETAIL
        );
    }
}

export default InviteUserToGroupSerive;
