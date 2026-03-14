/// <reference types="cypress" />

describe('Formulário de Cadastro', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/cadastro');
    })

    it('Deve cadastrar com sucesso e redirecionar para página de login', () => {
        cy.get('[data-testid="select-perfil"]').select("Aluno");
        cy.get('[data-testid="input-nome"]').type('Gustavo Mendes');
        cy.get('[data-testid="input-email"]').type("gustavo@email.com");
        cy.get('[data-testid="input-matricula"]').type('1234567890');
        cy.get('[data-testid="input-senha"]').type('Test12345');
        cy.get('[data-testid="input-confirmar-senha"]').type('Test12345');
        cy.get('[data-testid="btn-cadastrar"]').click();

        cy.url().should('include', '/login');
    })

    it('Deve cadastrar com sucesso preenchendo campos opcionais e redirecionar para página de login', () => {
        cy.get('[data-testid="select-perfil"]').select("Aluno");
        cy.get('[data-testid="input-nome"]').type('Gustavo Mendes');
        cy.get('[data-testid="input-email"]').type("gustavo@email.com");
        cy.get('[data-testid="input-matricula"]').type('1234567890');
        cy.get('[data-testid="input-senha"]').type('Test12345');
        cy.get('[data-testid="input-confirmar-senha"]').type('Test12345');
        cy.get('[data-testid="input-telefone"]').type('(32) 99999-8888');
        cy.get('[data-testid="input-data-nascimento"]').type('2005-04-20');
        cy.get('[data-testid="btn-cadastrar"]').click();

        cy.url().should('include', '/login');
    })

    it('Deve manter o botão desabilitado com formulário incompleto', () => {
        cy.get('[data-testid="btn-cadastrar"]').should('be.disabled');
    })

    it('Deve exibir erro ao digitar nome com menos de 3 caracteres', () => {
        cy.get('[data-testid="input-nome"]').type('ab');
        cy.get('[data-testid="erro-nome"]').should('be.visible');
    })

    it('Deve exibir erro ao digitar e-mail sem formatação correta', () => {
        cy.get('[data-testid="input-email"]').type('teste.com');
        cy.get('[data-testid="erro-email"]').should('be.visible');
    })

    it('Deve exibir erro ao digitar matrícula com menos de 5 caracteres', () => {
        cy.get('[data-testid="input-matricula"]').type('1234');
        cy.get('[data-testid="erro-matricula"]').should('be.visible');
    })

    it('Deve exibir erro ao digitar senha sem formatação correta', () => {
        cy.get('[data-testid="input-senha"]').type('12345678');
        cy.get('[data-testid="erro-senha"]').should('be.visible');
    })

    it('Deve exibir erro ao digitar confirmação de senha diferente de senha', () => {
        cy.get('[data-testid="input-senha"]').type('Teste12345');
        cy.get('[data-testid="input-confirmar-senha"]').type('Teste12346');
        cy.get('[data-testid="erro-confirmar-senha"]').should('be.visible');
    })

    it('Deve exibir erro ao digitar telefone sem formatação correta', () => {
        cy.get('[data-testid="input-telefone"]').type('00999998888');
        cy.get('[data-testid="erro-telefone"]').should('be.visible');
    })


})