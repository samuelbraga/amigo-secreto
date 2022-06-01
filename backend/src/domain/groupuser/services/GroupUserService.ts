import HttpStatus from "http-status-codes";
import { inject, injectable } from "tsyringe";

import {
    GROUP_REPOSITORY,
    GROUP_USER_REPOSITORY,
    USER_TOKEN_REPOSITORY,
} from "@constants/application";
import * as messages from "@constants/messages";
import IGroupRepository from "@domain/group/repositories/IGroupRepository";
import IUserTokenRepository from "@domain/user/repositories/IUserTokenRepository";
import { GroupUser } from "@prisma/client";
import ExceptionBase from "@shared/exceptions/ExceptionBase";

import IGroupUserRepository from "../repositories/IGroupUserRepository";

@injectable()
class GroupUserService {
    constructor(
        @inject(GROUP_USER_REPOSITORY)
        private readonly repository: IGroupUserRepository,

        @inject(GROUP_REPOSITORY)
        private readonly groupRepository: IGroupRepository,

        @inject(USER_TOKEN_REPOSITORY)
        private readonly userTokenRepository: IUserTokenRepository
    ) {}

    public async invite(
        group_id: string,
        user_id: string,
        token: string
    ): Promise<GroupUser> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if (!userToken) {
            throw this.createExceptionBase();
        }

        const group = this.groupRepository.getByUserAdmin(
            userToken.user_id,
            group_id
        );

        if (!group) {
            throw this.createUnauthorizedExceptionBase();
        }

        return this.repository.invite(group_id, user_id);
    }

    public async shuffle(
        group_id: string,
        token: string
    ): Promise<GroupUser[]> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if (!userToken) {
            throw this.createExceptionBase();
        }

        const group = this.groupRepository.getByUserAdmin(
            userToken.user_id,
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

    public async getByUser(token: string): Promise<GroupUser[]> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if (!userToken) {
            throw this.createExceptionBase();
        }
        return this.repository.getByUser(userToken.user_id);
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
