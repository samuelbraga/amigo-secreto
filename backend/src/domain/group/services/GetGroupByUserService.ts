import { inject, injectable } from "tsyringe";

import { GROUP_REPOSITORY } from "@constants/application";

import IGroupResponse from "../http/dtos/IGroupResponse";
import IGroupRepository from "../repositories/IGroupRepository";

@injectable()
class GetGroupByUserService {
    constructor(
        @inject(GROUP_REPOSITORY)
        private readonly repository: IGroupRepository
    ) {}

    public async execute(userId: string): Promise<IGroupResponse[]> {
        return this.repository.getByUser(userId);
    }
}

export default GetGroupByUserService;
