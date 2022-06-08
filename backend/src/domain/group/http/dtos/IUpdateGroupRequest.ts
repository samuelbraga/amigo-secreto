export default interface ICreateGroupRequest {
    id: string;
    name: string;
    event_date: string;
    gift_value: number;
    cep: number;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    complement: string;
    description: string;
    user_id: string;
}
