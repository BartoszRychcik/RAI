describe('App', () => {
	it('login test', () => {
		cy.visit('http://localhost:8080');
		cy.contains('Zaloguj').click();
		cy.url().should('include','http://localhost:8080/login')
		cy.get('input[type="text"]').type('admin').should('have.value','admin')
		cy.get('input[type="password"]').type('admin').should('have.value','admin')
		cy.contains('Login').click();
		
		cy.contains('Zalogowano pomyślnie.')
	});
});