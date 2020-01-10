describe('App', () => {
	it('routing test home->login', () => {
		cy.visit('http://localhost:8080');
		cy.contains('Zaloguj').click();
		cy.url().should('include','http://localhost:8080/login')
	});
	it('routing test home->home', () => {
		cy.visit('http://localhost:8080');
		cy.contains('Home').click();
		cy.url().should('include','http://localhost:8080')
	});
	it('routing test home->users', () => {
		cy.visit('http://localhost:8080');
		cy.contains('Pokaż użytkowników systemu').click();
		cy.url().should('include','http://localhost:8080/users')
	});
	it('routing test login->users', () => {
		cy.visit('http://localhost:8080/login');
		cy.contains('Pokaż użytkowników systemu').click();
		cy.url().should('include','http://localhost:8080/users')
	});
	it('routing test login->home', () => {
		cy.visit('http://localhost:8080/home');
		cy.contains('Home').click();
		cy.url().should('include','http://localhost:8080')
	});
	it('routing test users->home', () => {
		cy.visit('http://localhost:8080/users');
		cy.contains('Home').click();
		cy.url().should('include','http://localhost:8080')
	});
	it('routing test users->users', () => {
		cy.visit('http://localhost:8080/users');
		cy.contains('Pokaż użytkowników systemu').click();
		cy.url().should('include','http://localhost:8080/users')
	});
	it('routing test users->login', () => {
		cy.visit('http://localhost:8080/users');
		cy.contains('Zaloguj').click();
		cy.url().should('include','http://localhost:8080/login')
	});
	it('routing test login->login', () => {
		cy.visit('http://localhost:8080/login');
		cy.contains('Zaloguj').click();
		cy.url().should('include','http://localhost:8080/login')
	});
});