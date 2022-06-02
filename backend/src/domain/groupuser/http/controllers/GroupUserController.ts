import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { container } from "tsyringe";

import GroupUserService from "../../services/GroupUserService";

export default class GroupUserController {
    public async invite(
        request: Request,
        response: Response
    ): Promise<Response> {
        const groupUserService = container.resolve(GroupUserService);

        const { user_id, group_id, token } = request.body;

        const group = await groupUserService.invite(group_id, user_id, token);

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
        const groupUserService = container.resolve(GroupUserService);

        const { token } = request.body;

        const userGroups = await groupUserService.getByUser(token);

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
