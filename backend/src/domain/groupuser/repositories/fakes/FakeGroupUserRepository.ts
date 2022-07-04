import IGroupParticipant from "@domain/groupuser/http/dtos/IGroupParticipant";
import ISelfGroupUser from "@domain/groupuser/http/dtos/ISelfGroupUser";
import IGroupUserRepository from "@domain/groupuser/repositories/IGroupUserRepository";
import { Group, GroupUser, InviteStatus } from "@prisma/client";

class FakeGroupRepository implements IGroupUserRepository {
    private groups: Group[] = [];
    private group_users: GroupUser[] = [];

    public async getByUser(user_id: string): Promise<ISelfGroupUser[]> {
        const group_users = this.group_users.filter(
            (group) => group.user_id === user_id
        );
        return (
            group_users?.map((gu) => {
                return {
                    group_id: gu.group_id,
                    status: gu.status,
                    selected_user: null,
                };
            }) || []
        );
    }

    public async getByGroup(group_id: string): Promise<IGroupParticipant[]> {
        const group_users = this.group_users.filter(
            (group) => group.group_id === group_id
        );
        return (
            group_users?.map((gu) => {
                return {
                    group_id: gu.group_id,
                    user: {
                        id: gu.user_id,
                        name: "",
                    },
                };
            }) || []
        );
    }

    public async getById(id: string): Promise<Group | null> {
        return this.groups.find((group) => group.id === id) || null;
    }

    public async saveSelected(): Promise<GroupUser[]> {
        return [];
    }

    public async invite(group_id: string, user_id: string): Promise<GroupUser> {
        const findIndex = this.group_users.findIndex(
            (gu) => gu.group_id === group_id && gu.user_id === user_id
        );
        if (findIndex === -1) {
            const gu: GroupUser = {
                group_id,
                user_id,
                status: InviteStatus.PENDING,
                selected_user_id: null,
                created_at: new Date(Date.now()),
                updated_at: null,
            };
            this.group_users.push(gu);
            return gu;
        }
        this.group_users[findIndex] = {
            group_id,
            user_id,
            status: InviteStatus.PENDING,
            selected_user_id: null,
            created_at: new Date(Date.now()),
            updated_at: null,
        };

        return this.group_users[findIndex];
    }
}

export default FakeGroupRepository;
