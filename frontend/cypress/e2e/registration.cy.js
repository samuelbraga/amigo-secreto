/// <reference types="cypress" />

describe('Register Secret Santa', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
    cy.contains('Entrar').click()
    cy.get('[data-testid="email"]').type('teste@teste.com')
    cy.get('[data-testid="password"]').type('123456qwer')
    cy.get('[data-testid="login"]').click()
    cy.wait(2000);
    cy.contains('Meus Amigos Secretos').should('be.visible')
    cy.contains('Amigos Secretos que Participo').should('be.visible')
    cy.visit('http://localhost:3000/novo-amigo-secreto')
  })

  it.skip('Should be able to register a secret', () => {
    cy.contains('Cadastre o seu Amigo Secreto!').should('be.visible')
    cy.get('[data-testid="name"]').type('Festa da firma')
    cy.get('[data-testid="date"]').type('07/09/2022 12:00 am')
    cy.get('[data-testid="amount"]').type('100')
    cy.get('[data-testid="cep"]').type('31840220')
    cy.get('[data-testid="street"]').type('Rua Dos Otoni')
    cy.get('[data-testid="number"]').type('570')
    cy.get('[data-testid="complement"]').type('Apto 901')
    cy.get('[data-testid="city"]').type('Belo Horizonte')
    cy.get('[data-testid="state"]').type('Minas Gerais')
    cy.get('[data-testid="description"]').type('Amigo secreto da Firma de Devs')
    cy.contains('Cadastrar').click()
  })
})
