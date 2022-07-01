import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { container } from "tsyringe";

import { HEADER_EMAIL } from "@constants/application";
import * as messages from "@constants/messages";
import GetGroupsByUserService from "@domain/groupuser/services/GetGroupsByUserService";
import ExceptionBase from "@shared/exceptions/ExceptionBase";

import GroupUserService from "../../services/GroupUserService";
import InviteUserToGroupSerive from "../../services/InviteUserToGroupSerive";

export default class GroupUserController {
    public async inviteUser(
        request: Request,
        response: Response
    ): Promise<Response> {
        const inviteUserToGroupSerive = container.resolve(
            InviteUserToGroupSerive
        );

        const groupId = request.params.id;
        const email = request.header(HEADER_EMAIL);

        if (!email) {
            throw new ExceptionBase(
                messages.USER_DOES_NOT_EXISTS_TYPE,
                messages.USER_DOES_NOT_EXISTS_TITLE,
                HttpStatus.BAD_REQUEST,
                messages.USER_DOES_NOT_EXISTS_DETAIL,
                messages.USER_INSTANCE
            );
        }

        await inviteUserToGroupSerive.execute(groupId, email);

        return response.status(HttpStatus.NO_CONTENT).json();
    }

    public async shuffle(
        request: Request,
        response: Response
    ): Promise<Response> {
        const groupUserService = container.resolve(GroupUserService);

        const { group_id, token } = request.body;

        await groupUserService.shuffle(group_id, token);

        return response.status(HttpStatus.CREATED);
    }

    public async getByUser(
        request: Request,
        response: Response
    ): Promise<Response> {
        const getGroupsByUserService = container.resolve(
            GetGroupsByUserService
        );

        const user_id = request.user.id;

        const userGroups = await getGroupsByUserService.execute(user_id);

        return response.status(HttpStatus.OK).json(userGroups);
    }

    public async getByGroup(
        request: Request,
        response: Response
    ): Promise<Response> {
        const groupUserService = container.resolve(GroupUserService);

        const { group_id, token } = request.body;

        const participants = await groupUserService.getByGroup(group_id, token);

        return response.status(HttpStatus.OK).json(participants);
    }
}
