import instance from './api'

export const sorteiosAdmin = (
    userId,
    authorization
) => {
    return instance.get(`sorteios-admin?userId=${userId}`, { headers: { Authorization: `Bearer ${authorization}`} })
}

export const sorteiosParticipante = (
    userId,
    authorization
) => {
    return instance.get(`sorteios-participante?userId=${userId}`, { headers: { Authorization: `Bearer ${authorization}`} })
}

export const cadastroSorteio = (
    sorteioData
) => {
    return instance.post('cadastro/sorteio', sorteioData)
}