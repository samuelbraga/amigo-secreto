/// <reference types="cypress" />

describe('Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it.only('Should be able to login', () => {
    cy.contains('Entrar').click()
    cy.get('[data-testid="email"]').type('teste@teste.com')
    cy.get('[data-testid="password"]').type('123456qwer')
    cy.get('[data-testid="login"]').click()
    cy.wait(500);
    cy.contains('Meus Amigos Secretos').should('be.visible')
    cy.contains('Amigos Secretos que Participo').should('be.visible')
  })
})
