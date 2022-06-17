import { inject, injectable } from "tsyringe";

import { GROUP_REPOSITORY } from "@constants/application";

import ICreateGroupRequest from "../http/dtos/ICreateGroupRequest";
import IGroupResponse from "../http/dtos/IGroupResponse";
import IGroupRepository from "../repositories/IGroupRepository";

@injectable()
class CreateGroupService {
    constructor(
        @inject(GROUP_REPOSITORY)
        private readonly repository: IGroupRepository
    ) {}

    public async execute(
        group: ICreateGroupRequest,
        userId: string
    ): Promise<IGroupResponse> {
        return this.repository.save(group, userId);
    }
}

export default CreateGroupService;
