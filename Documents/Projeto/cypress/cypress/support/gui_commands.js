Cypress.Commands.add('registerClick', () => {
  cy.contains('a', 'Register now').click()
  cy.contains('button', 'Register').click()
})

Cypress.Commands.add('login', (nome, senha) => {
  cy.get('input[formcontrolname="userName"]').type(nome)
  cy.get('input[formcontrolname="password"]').type(senha)
  cy.get('button[type="submit"]').click()
})
