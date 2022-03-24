describe('Login e registro de usuarios alura pic', () => {
  //abrir uma suite de teste
  beforeEach(() => {
    //passo que acontece antes do teste em si
    cy.visit('https://alura-fotos.herokuapp.com/')
  })
  it('verifica mensagens validacao', () => {
    cy.registerClick()
    cy.contains('ap-vmessage', 'Email is required!').should('be.visible')
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Full name is required!').should('be.visible')
    cy.contains('ap-vmessage', 'User name is required!').should('be.visible')
    cy.contains('ap-vmessage', 'Password is required!').should('be.visible')
  })
  it('verifica mensagem de email invalido', () => {
    cy.registerClick()
    cy.get('input[formcontrolname="email"]').type('lucas')
    cy.contains('ap-vmessage', 'Invalid e-mail').should('be.visible')
  })
  it('verifica mensagem de username menor que 2 caracteres', () => {
    cy.registerClick()
    cy.get('input[formcontrolname="userName"]').type('a')
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Mininum length is 2').should('be.visible')
  })
  it('Inserir username com letras maiúsculas', () => {
    cy.registerClick()
    cy.get('input[formcontrolname="userName"]').type('LUCAS')
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Must be lower case').should('be.visible')
  })
  it('Inserir username já cadastrado', () => {
    cy.registerClick()
    cy.get('input[formcontrolname="userName"]').type('flavio')
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Username already taken').should('be.visible')
  })
  it('verifica mensagem de senha menor que 8 caracteres', () => {
    cy.registerClick()
    cy.get('input[formcontrolname="password"]').type('123')
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Mininum length is 8').should('be.visible')
  })
  it('Inserir username com ate 18 caracteres', () => {
    cy.registerClick()
    cy.get('input[formcontrolname="password"]').type('1234567890123')
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Maximun length is 18').should('not.exist')
  })
  it('Inserir username com mais 18 caracteres', () => {
    cy.registerClick()
    cy.get('input[formcontrolname="password"]').type('12345678901234567890')
    cy.contains('button', 'Register').click()
    cy.contains('ap-vmessage', 'Maximun length is 18').should('be.visible')
  })
  it('Fazer login de usuario valido', () => {
    cy.login('flavio', '123')
    cy.contains('a', '(Logout)').should('be.visible')
  })
  it('Fazer login de usuario invalido', () => {
    cy.login('lucas', '1234')
    cy.on('window:alert', str => {
      expect(str).to.equal('Invalid user name or password')
    })
  })
})
