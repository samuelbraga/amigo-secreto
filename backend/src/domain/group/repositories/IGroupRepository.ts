import { Group } from "@prisma/client";

import ICreateGroupRequest from "../http/dtos/ICreateGroupRequest";
import IUpdateGroupRequest from "../http/dtos/IUpdateGroupRequest";

export default interface IGroupRepository {
    save(data: ICreateGroupRequest, created_by: string): Promise<Group>;
    getById(group_id: string): Promise<Group | null>;
    update(data: IUpdateGroupRequest, user_id: string): Promise<Group | null>;
    getByUser(user_id: string): Promise<Group[]>;
    getByUserAdmin(user_id: string, group_id: string): Promise<Group | null>;
}
