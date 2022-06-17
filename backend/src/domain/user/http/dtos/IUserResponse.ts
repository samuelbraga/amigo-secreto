export default interface IUserResponse {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date | null;
}

export class UserResponse implements IUserResponse {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date | null;

    constructor(data: IUserResponse) {
        Object.assign(this, data);
    }
}
