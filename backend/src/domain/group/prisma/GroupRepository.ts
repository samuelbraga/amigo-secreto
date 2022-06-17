import { inject, injectable } from "tsyringe";

import { PRISMA_CLIENT } from "@constants/application";
import { PrismaClient, Group, InviteStatus } from "@prisma/client";

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
        const group = await this.prisma.group.create({
            data: { ...data, created_by },
        });

        await this.prisma.groupUser.create({
            data: {
                status: InviteStatus.ACCEPTED,
                group_id: group.id,
                user_id: created_by,
            },
        });

        return group;
    }

    public async update(
        data: IUpdateGroupRequest,
        user_id: string
    ): Promise<Group | null> {
        await this.prisma.group.updateMany({
            where: {
                id: data.id,
                user: {
                    id: user_id,
                },
            },
            data: {
                ...data,
                updated_at: new Date(Date.now()).toISOString(),
            },
        });

        return this.prisma.group.findUnique({
            where: {
                id: data.id,
            },
        });
    }

    public async getByUser(user_id: string): Promise<Group[]> {
        return this.prisma.group.findMany({
            where: {
                GroupUser: {
                    every: {
                        user_id,
                    },
                },
            },
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
