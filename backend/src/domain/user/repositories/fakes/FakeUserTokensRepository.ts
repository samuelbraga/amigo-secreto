import { v4 } from "uuid";

import { UserToken } from "@prisma/client";

import IUserTokenRepository from "../IUserTokenRepository";

class FakeUserTokenRepository implements IUserTokenRepository {
    private userTokens: UserToken[] = [];

    public async generate(user_id: string): Promise<UserToken> {
        const userToken: UserToken = {
            id: v4(),
            token: v4(),
            user_id,
            created_at: new Date(),
            updated_at: new Date(),
        };

        this.userTokens.push(userToken);

        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | null> {
        const userToken = this.userTokens.find(
            (findToken) => findToken.token === token
        );

        if (!userToken) return null;

        return userToken;
    }
}

export default FakeUserTokenRepository;
