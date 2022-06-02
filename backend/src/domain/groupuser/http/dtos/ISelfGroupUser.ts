export default interface ISelfGroupUser {
    group_id: string;
    status: string;
    selected_user: {
        id: string;
        name: string;
    } | null;
}
