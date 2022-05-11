import IUsersRepository from "@domain/user/repositories/IUserRepository";
import { User } from "@prisma/client";
import {v4} from 'uuid';

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

    public async save(user: User): Promise<User> {
        user.id = v4()
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
