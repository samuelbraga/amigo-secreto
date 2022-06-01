import { inject, injectable } from "tsyringe";

import { PRISMA_CLIENT } from "@constants/application";
import { PrismaClient, Group } from "@prisma/client";

import ICreateGroupRequest from "../http/dtos/ICreateGroupRequest";
import IUpdateGroupRequest from "../http/dtos/IUpdateGroupRequest";
import IGroupRepository from "../repositories/IGroupRepository";

@injectable()
class GroupRepository implements IGroupRepository {
    constructor(
        @inject(PRISMA_CLIENT)
        private readonly prisma: PrismaClient
    ) {}

    public async save(
        data: ICreateGroupRequest,
        created_by: string
    ): Promise<Group> {
        const { name, event_date, gift_value } = data;

        const group = await this.prisma.group.create({
            data: {
                name,
                event_date,
                gift_value,
                created_by,
            },
        });

        return group;
    }

    public async update(
        data: IUpdateGroupRequest,
        user_id: string
    ): Promise<Group | null> {
        const { id, name, event_date, gift_value } = data;

        await this.prisma.group.updateMany({
            where: {
                id,
                user: {
                    id: user_id,
                },
            },
            data: {
                name,
                event_date,
                gift_value,
                updated_at: new Date(Date.now()).toISOString(),
            },
        });

        return this.prisma.group.findUnique({
            where: {
                id,
            },
        });
    }

    public async getByUser(user_id: string): Promise<Group[]> {
        return this.prisma.group.findMany({
            include: {
                GroupUser: {
                    where: {
                        user_id,
                    },
                },
            },
        });
    }

    public async getByUserAdmin(
        user_id: string,
        group_id: string
    ): Promise<Group | null> {
        return this.prisma.group.findFirst({
            where: {
                id: group_id,
                created_by: user_id,
            },
        });
    }
}

export default GroupRepository;
