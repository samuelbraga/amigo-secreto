import { inject, injectable } from "tsyringe";

import { GROUP_REPOSITORY } from "@constants/application";

import IGroupResponse from "../http/dtos/IGroupResponse";
import IUpdateGroupRequest from "../http/dtos/IUpdateGroupRequest";
import IGroupRepository from "../repositories/IGroupRepository";

@injectable()
class UpdateGroupService {
    constructor(
        @inject(GROUP_REPOSITORY)
        private readonly repository: IGroupRepository
    ) {}

    public async execute(
        group: IUpdateGroupRequest,
        userId: string
    ): Promise<IGroupResponse | null> {
        return this.repository.update(group, userId);
    }
}

export default UpdateGroupService;
