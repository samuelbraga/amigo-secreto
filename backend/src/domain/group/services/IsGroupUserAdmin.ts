import HttpStatus from "http-status-codes";
import { inject, injectable } from "tsyringe";

import { GROUP_REPOSITORY } from "@constants/application";
import * as messages from "@constants/messages";
import ExceptionBase from "@shared/exceptions/ExceptionBase";

import IGroupRepository from "../repositories/IGroupRepository";

@injectable()
class IsGroupUserAdmin {
    constructor(
        @inject(GROUP_REPOSITORY)
        private readonly repository: IGroupRepository
    ) {}

    public async execute(userId: string, groupId: string): Promise<boolean> {
        const group = await this.repository.getById(groupId);

        if (!group) {
            throw new ExceptionBase(
                messages.GROUP_NOT_EXISTS_TYPE,
                messages.GROUP_NOT_EXISTS_TITLE,
                HttpStatus.BAD_REQUEST,
                messages.GROUP_NOT_EXISTS_DETAIL,
                messages.GROUP_INSTANCE
            );
        }

        const user = await this.repository.getByUserAdmin(userId, groupId);
        return !!user;
    }
}

export default IsGroupUserAdmin;
