import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { container } from "tsyringe";

import GetGroupsByUserService from "@domain/groupuser/services/GetGroupsByUserService";

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

        const { user_id: inveted_user_id, group_id } = request.body;
        const user_id = request.user.id;

        const group = await inviteUserToGroupSerive.execute(
            group_id,
            inveted_user_id,
            user_id
        );

        return response.status(HttpStatus.CREATED).json(group);
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
