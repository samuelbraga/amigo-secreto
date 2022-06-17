export default interface IGroupResponse {
    id: string;
    name: string;
    event_date: Date | null;
    gift_value: number | null;
    cep: number | null;
    street: string | null;
    neighborhood: string | null;
    city: string | null;
    state: string | null;
    complement: string | null;
    description: string | null;
    created_by: string;
    created_at: Date;
    updated_at: Date | null;
}
