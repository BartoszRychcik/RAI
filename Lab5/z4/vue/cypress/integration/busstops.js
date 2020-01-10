describe('App', () => {
	it('check correctness display busstops', () => {
		cy.request({
			method: 'POST',
			url: 'http://localhost:3000/api/userslist',
			body: {
				login: "test",
				password: "test",
				busstops: ["2007","2018"]
				}
		});
		
		cy.visit('http://localhost:8080/login');
		cy.get('input[type="text"]').type('test').should('have.value','test')
		cy.get('input[type="password"]').type('test').should('have.value','test')
		cy.contains('Login').click();
		cy.contains('Następna stacja').click();
		var l
		cy.request('GET','http://localhost:3000/api/busstop/2007')
		.then((response) => {
			cy.log(response.body.length);
			cy.get('.vgt-responsive').last().find('tr').its('length').should('be.gte', 1);
		});
		cy.contains('Następna stacja').click();
		cy.request('GET','http://localhost:3000/api/busstop/2018')
		.then((response) => {
			cy.log(response.body.length);
			cy.get('.vgt-responsive').last().find('tr').its('length').should('be.gte', 1);
		});
		cy.contains('Następna stacja').click();
		cy.request('GET','http://localhost:3000/api/busstop/2007')
		.then((response) => {
			cy.log(response.body.length);
			cy.get('.vgt-responsive').last().find('tr').its('length').should('be.gte', 1);
		});
		
		cy.request('DELETE','http://localhost:3000/api/userslist/test')
	});			
	
	
});