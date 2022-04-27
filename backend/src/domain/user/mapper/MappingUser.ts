import { User } from "@prisma/client"
import IUserResponse, { UserResponse } from "../http/dtos/IUserResponse"

export const fromUser = (from: User): IUserResponse => {
    const userResponse = new UserResponse({
        id: from.id,
        name: from.name,
        created_at: from.created_at,
        updated_at: from.updated_at
    });

    return userResponse;
}