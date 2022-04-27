import IUserResponse from "./IUserResponse";

export default interface ISessionResponse {
    user: IUserResponse;
    token: string;
}