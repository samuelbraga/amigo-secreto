import { v4 } from "uuid";

import IUsersRepository from "@domain/user/repositories/IUserRepository";
import { User } from "@prisma/client";

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async findUserByEmail(email: string): Promise<User | null> {
        const findUser = this.users.find((user) => user.email === email);
        if (!findUser) return null;
        return findUser;
    }

    public async findUserById(user_id: string): Promise<User | null> {
        const findUser = this.users.find((user) => user.id === user_id);
        if (!findUser) return null;
        return findUser;
    }

    public async save({ name, email, password }: User): Promise<User> {
        const user: User = {
            id: v4(),
            name,
            email,
            password,
            created_at: new Date(Date.now()),
            updated_at: new Date(Date.now()),
        };
        this.users.push(user);
        return user;
    }

    public async update(data: User): Promise<User> {
        const findIndex = this.users.findIndex(
            (findUser) => findUser.id === data.id
        );

        this.users[findIndex] = data;

        return data;
    }
}

export default FakeUsersRepository;
