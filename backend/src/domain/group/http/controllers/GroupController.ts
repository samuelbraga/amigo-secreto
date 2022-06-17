import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { container } from "tsyringe";

import CreateGroupService from "@domain/group/services/CreateGroupService";
import GetGroupByUserService from "@domain/group/services/GetGroupByUserService";
import UpdateGroupService from "@domain/group/services/UpdateGroupService";

import ICreateGroupRequest from "../dtos/ICreateGroupRequest";
import IUpdateGroupRequest from "../dtos/IUpdateGroupRequest";

export default class GroupController {
    public async createGroup(
        request: Request,
        response: Response
    ): Promise<Response> {
        const createGroupService = container.resolve(CreateGroupService);

        const requestModel: ICreateGroupRequest = request.body;
        const userId = request.user.id;

        const group = await createGroupService.execute(requestModel, userId);

        return response.status(HttpStatus.CREATED).json(group);
    }

    public async updateGroup(
        request: Request,
        response: Response
    ): Promise<Response> {
        const updateGroupService = container.resolve(UpdateGroupService);

        const requestModel: IUpdateGroupRequest = request.body;
        const groupId = request.params.id;
        requestModel.id = groupId;
        const userId = request.user.id;

        const group = await updateGroupService.execute(requestModel, userId);

        return response.status(HttpStatus.CREATED).json(group);
    }

    public async getUserGroups(
        request: Request,
        response: Response
    ): Promise<Response> {
        const getGroupByUserService = container.resolve(GetGroupByUserService);

        const userId = request.user.id;

        const groups = await getGroupByUserService.execute(userId);

        return response.status(HttpStatus.OK).json(groups);
    }
}
