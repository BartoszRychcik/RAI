describe('App', () => {
	it('userslist test', () => {
		cy.request('GET','http://localhost:3000/api/userslist')
		.then((response) => {
			expect(response.status).to.eq(200);
			expect(response.headers['content-type']).to.eq('application/json; charset=utf-8');
			expect(response.body).to.not.be.null;
			cy.visit('http://localhost:8080/users');
			cy.get('.vgt-responsive').find('tr').should('have.length', response.body.length+1);
			});
		});			
});