import { Request, Response } from "express";
import HttpStatus from "http-status-codes";
import { container } from "tsyringe";

import GroupService from "../../services/GroupService";
import ICreateGroupRequest from "../dtos/ICreateGroupRequest";
import IUpdateGroupRequest from "../dtos/IUpdateGroupRequest";

export default class GroupController {
    public async createGroup(
        request: Request,
        response: Response
    ): Promise<Response> {
        const groupService = container.resolve(GroupService);

        const requestModel: ICreateGroupRequest = request.body;

        // requestModel.created_by = loggeduserid

        const group = await groupService.create(requestModel);

        return response.status(HttpStatus.CREATED).json(group);
    }

    public async updateGroup(
        request: Request,
        response: Response
    ): Promise<Response> {
        const groupService = container.resolve(GroupService);

        const requestModel: IUpdateGroupRequest = request.body;
        
        // requestModel.created_by = loggeduserid

        const group = await groupService.update(requestModel);

        return response.status(HttpStatus.CREATED).json(group);
    }
}
