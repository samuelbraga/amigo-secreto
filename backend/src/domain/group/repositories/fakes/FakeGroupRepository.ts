import { v4 } from "uuid";

import ICreateGroupRequest from "@domain/group/http/dtos/ICreateGroupRequest";
import IUpdateGroupRequest from "@domain/group/http/dtos/IUpdateGroupRequest";
import IGroupRepository from "@domain/group/repositories/IGroupRepository";
import { Group, GroupUser, InviteStatus } from "@prisma/client";

class FakeGroupRepository implements IGroupRepository {
    private groups: Group[] = [];
    private group_users: GroupUser[] = [];

    public async getByUser(user_id: string): Promise<Group[]> {
        const group_users = this.group_users.filter(
            (group) => group.user_id === user_id
        );
        const groups = this.groups.filter((group) =>
            group_users.find((gu) => gu.group_id === group.id)
        );
        return groups || [];
    }

    public async getByUserAdmin(
        user_id: string,
        group_id: string
    ): Promise<Group | null> {
        const group = this.groups.find(
            (group) => group.created_by === user_id && group.id === group_id
        );
        if (!group) return null;
        return {
            ...group,
        };
    }

    public async getById(id: string): Promise<Group | null> {
        return this.groups.find((group) => group.id === id) || null;
    }

    public async save(
        data: ICreateGroupRequest,
        created_by: string
    ): Promise<Group> {
        const g: Group = {
            ...data,
            created_by,
            id: v4(),
            event_date: data.event_date ? new Date(data.event_date) : null,
            gift_value: data.gift_value ? data.gift_value : null,
            cep: data.cep ? data.cep : null,
            street: data.street ? data.street : null,
            state: data.state ? data.state : null,
            neighborhood: data.neighborhood ? data.neighborhood : null,
            city: data.city ? data.city : null,
            complement: data.complement ? data.complement : null,
            description: data.description ? data.description : null,
            created_at: new Date(Date.now()),
            updated_at: null,
        };
        const gu: GroupUser = {
            status: InviteStatus.ACCEPTED,
            group_id: g.id,
            user_id: created_by,
            selected_user_id: null,
            created_at: new Date(Date.now()),
            updated_at: null,
        };
        this.groups.push(g);
        this.group_users.push(gu);
        return g;
    }

    public async update(data: IUpdateGroupRequest): Promise<Group> {
        const findIndex = this.groups.findIndex((g) => g.id === data.id);

        this.groups[findIndex] = {
            ...this.groups[findIndex],
            name: data.name,
            event_date: data.event_date ? new Date(data.event_date) : null,
            gift_value: data.gift_value ? data.gift_value : null,
            cep: data.cep ? data.cep : null,
            street: data.street ? data.street : null,
            state: data.state ? data.state : null,
            neighborhood: data.neighborhood ? data.neighborhood : null,
            city: data.city ? data.city : null,
            complement: data.complement ? data.complement : null,
            description: data.description ? data.description : null,
            updated_at: new Date(Date.now()),
        };

        return this.groups[findIndex];
    }
}

export default FakeGroupRepository;
