import HttpStatus from "http-status-codes";
import { inject, injectable } from "tsyringe";

import { GROUP_REPOSITORY } from "@constants/application";
import * as messages from "@constants/messages";
import { Group } from "@prisma/client";
import ExceptionBase from "@shared/exceptions/ExceptionBase";
import getUserIdFromToken from "@shared/session/session";

import ICreateGroupRequest from "../http/dtos/ICreateGroupRequest";
import IUpdateGroupRequest from "../http/dtos/IUpdateGroupRequest";
import IGroupRepository from "../repositories/IGroupRepository";

@injectable()
class GroupService {
    constructor(
        @inject(GROUP_REPOSITORY)
        private readonly repository: IGroupRepository
    ) {}

    public async create(
        groupData: ICreateGroupRequest,
        token: string
    ): Promise<Group> {
        const user_id = getUserIdFromToken(token);

        if (!user_id) {
            throw this.createExceptionBase();
        }

        return this.repository.save(
            groupData,
            user_id
        );
    }

    public async update(
        group: IUpdateGroupRequest,
        token: string
    ): Promise<Group | null> {
        const user_id = getUserIdFromToken(token);

        if (!user_id) {
            throw this.createExceptionBase();
        }

        return this.repository.update(group, user_id);
    }

    public async getByUser(token: string): Promise<Group[]> {
        const user_id = getUserIdFromToken(token);

        if (!user_id) {
            throw this.createExceptionBase();
        }

        return this.repository.getByUser(user_id);
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
}

export default GroupService;
