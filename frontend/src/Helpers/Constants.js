export const initialCadastroUsuario = {
  email: '',
  password: '',
  name: '',
  giftList: '',
  birthdayData: null,
}

export const initialFormValues = {
  name: '',
  event_date: null,
  gift_value: '',
  cep: '',
  street: '',
  neighborhood: '',
  city: '',
  state: '',
  complement: '',
  description: '',
  token: '',
}

export const formatSorteioData = (sorteioData, authorization) => {
  return {
    name: sorteioData.name,
    event_date: sorteioData.event_date,
    gift_value: parseInt(sorteioData.gift_value),
    cep: parseInt(sorteioData.cep),
    street: sorteioData.street,
    neighborhood: sorteioData.neighborhood,
    city: sorteioData.city,
    state: sorteioData.state,
    complement: sorteioData.complement,
    description: sorteioData.description,
    token: authorization
  }
}