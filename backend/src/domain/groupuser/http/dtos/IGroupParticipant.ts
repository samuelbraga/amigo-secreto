export default interface IGroupParticipant {
    group_id: string;
    user: {
        id: string;
        name: string;
    };
}
