import { formatSorteioData } from '../Helpers/Constants'
import instance from './api'

export const cadastroSorteio = (
    sorteioData,
    authorization
) => {
    return instance.post('/group', formatSorteioData(sorteioData, authorization))
}

export const sorteiosParticipante = (
    userId,
    authorization
) => {
    return instance.get(`sorteios-participante?userId=${userId}`, { headers: { Authorization: `Bearer ${authorization}`} })
}
