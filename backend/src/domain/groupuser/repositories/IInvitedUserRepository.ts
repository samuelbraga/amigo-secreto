import { InvitedUser } from "@prisma/client";

export default interface IInvitedUserRepository {
    create(email: string, group_id: string): Promise<InvitedUser>;
}
