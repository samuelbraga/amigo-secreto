import { GroupUser } from "@prisma/client";

import IGroupParticipant from "../http/dtos/IGroupParticipant";
import ISelfGroupUser from "../http/dtos/ISelfGroupUser";

export default interface IGroupUserRepository {
    invite(group_id: string, user_id: string): Promise<GroupUser>;
    saveSelected(
        group_id: string,
        user_selection_map: Map<string, string>
    ): Promise<GroupUser[]>;
    getByUser(user_id: string): Promise<ISelfGroupUser[]>;
    getByGroup(group_id: string): Promise<IGroupParticipant[]>;
}
