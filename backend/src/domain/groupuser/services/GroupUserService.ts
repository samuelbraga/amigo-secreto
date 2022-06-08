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
import getUserIdFromToken from "@shared/session/session";

import IGroupParticipant from "../http/dtos/IGroupParticipant";
import ISelfGroupUser from "../http/dtos/ISelfGroupUser";
import IGroupUserRepository from "../repositories/IGroupUserRepository";

@injectable()
class GroupUserService {
    constructor(
        @inject(GROUP_USER_REPOSITORY)
        private readonly repository: IGroupUserRepository,

        @inject(GROUP_REPOSITORY)
        private readonly groupRepository: IGroupRepository
    ) {}

    public async shuffle(
        group_id: string,
        token: string
    ): Promise<GroupUser[]> {
        const token_user_id = getUserIdFromToken(token);

        if (!token_user_id) {
            throw this.createExceptionBase();
        }

        const group = this.groupRepository.getByUserAdmin(
            token_user_id,
            group_id
        );

        if (!group) {
            throw this.createUnauthorizedExceptionBase();
        }

        const groupUsers = await this.repository.getByGroup(group_id);

        const unselectedUsers = groupUsers.map(
            (groupUser) => groupUser.user.id
        );
        const selectedUsers = new Map(
            groupUsers.map((groupUser) => {
                const selectedUserId = unselectedUsers.pop();
                return [groupUser.user.id, selectedUserId || ""];
            })
        );

        return this.repository.saveSelected(group_id, selectedUsers);
    }

    public async getByUser(token: string): Promise<ISelfGroupUser[]> {
        const token_user_id = getUserIdFromToken(token);

        if (!token_user_id) {
            throw this.createExceptionBase();
        }
        return this.repository.getByUser(token_user_id);
    }

    public async getByGroup(
        group_id: string,
        token: string
    ): Promise<IGroupParticipant[]> {
        const token_user_id = getUserIdFromToken(token);

        if (!token_user_id) {
            throw this.createExceptionBase();
        }
        const groups = await this.repository.getByUser(token_user_id);

        if (!groups.map((group) => group.group_id).includes(group_id)) {
            return Promise.resolve([]);
        }

        return this.repository.getByGroup(group_id);
    }

    private createExceptionBase(): ExceptionBase {
        return new ExceptionBase(
            messages.USER_TOKEN_CREDENTIALS_DOES_NOT_EXISTS_TYPE,
            messages.USER_TOKEN_CREDENTIALS_DOES_NOT_EXISTS_TITLE,
            HttpStatus.BAD_REQUEST,
            messages.USER_TOKEN_CREDENTIALS_DOES_NOT_EXISTS_DETAIL,
            messages.USER_TOKEN_CREDENTIALS_DOES_NOT_EXISTS_DETAIL
        );
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

export default GroupUserService;
