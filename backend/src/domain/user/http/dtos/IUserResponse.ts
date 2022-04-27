export default interface IUserResponse {
   id: string;
   name: string;
   created_at: Date
   updated_at: Date | null;
}

export class UserResponse implements IUserResponse{
    id: string;
    name: string;
    created_at: Date
    updated_at: Date | null;

    constructor(data: IUserResponse) {
        this.id = data.id;
        this.name = data.name;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
    }
 }