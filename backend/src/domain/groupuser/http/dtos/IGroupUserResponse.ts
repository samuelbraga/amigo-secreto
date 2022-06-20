import { InviteStatus } from "@prisma/client";

export default interface IGroupUserResponse {
    group_id: string;
    user_id: string;
    status: InviteStatus;
    selected_user_id: string | null;
    created_at: Date;
}
