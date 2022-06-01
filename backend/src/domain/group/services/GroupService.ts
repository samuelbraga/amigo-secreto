import HttpStatus from "http-status-codes";
import { inject, injectable } from "tsyringe";

import {
    GROUP_REPOSITORY,
    USER_TOKEN_REPOSITORY,
} from "@constants/application";
import * as messages from "@constants/messages";
import IUserTokenRepository from "@domain/user/repositories/IUserTokenRepository";
import { Group } from "@prisma/client";
import ExceptionBase from "@shared/exceptions/ExceptionBase";

import ICreateGroupRequest from "../http/dtos/ICreateGroupRequest";
import IUpdateGroupRequest from "../http/dtos/IUpdateGroupRequest";
import IGroupRepository from "../repositories/IGroupRepository";

@injectable()
class GroupService {
    constructor(
        @inject(GROUP_REPOSITORY)
        private readonly repository: IGroupRepository,

        @inject(USER_TOKEN_REPOSITORY)
        private readonly userTokenRepository: IUserTokenRepository
    ) {}

    public async create(
        { name, gift_value, event_date }: ICreateGroupRequest,
        token: string
    ): Promise<Group> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if (!userToken) {
            throw this.createExceptionBase();
        }

        return this.repository.save(
            {
                name,
                gift_value,
                event_date,
            },
            userToken.user_id
        );
    }

    public async update(
        group: IUpdateGroupRequest,
        token: string
    ): Promise<Group | null> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if (!userToken) {
            throw this.createExceptionBase();
        }

        return this.repository.update(group, userToken.user_id);
    }

    public async getByUser(token: string): Promise<Group[]> {
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
}

export default GroupService;
