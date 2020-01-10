describe('App', () => {
	it('create new user', () => {
		let l1
		cy.request('GET','http://localhost:3000/api/userslist')
		.then((response) => {l1=response.body.length;});
		
		cy.request({
			method: 'POST',
			url: 'http://localhost:3000/api/userslist',
			body: {
				login: "test",
				password: "test",
				busstops: ["2007"]
				}
		});
		
		cy.request('GET','http://localhost:3000/api/userslist')
		.then((response) => {expect(response.body.length).to.eql(l1+1)});
	});			
	
	it('delete user', () => {
		let l1
		cy.request('GET','http://localhost:3000/api/userslist')
		.then((response) => {l1=response.body.length;});
		
		cy.request('DELETE','http://localhost:3000/api/userslist/test')
		
		cy.request('GET','http://localhost:3000/api/userslist')
		.then((response) => {expect(response.body.length).to.eql(l1-1)});
	});	
	
	it('update user', () => {
		cy.request({
			method: 'POST',
			url: 'http://localhost:3000/api/userslist',
			body: {
				login: "test",
				password: "test",
				busstops: ["2007"]
				}
		});
		
		cy.request({
			method: 'PUT',
			url: 'http://localhost:3000/api/userslist/test',
			body: {
				login: "test",
				password: "test2",
				busstops: ["2007"]
				}
		});
		
		cy.request('GET','http://localhost:3000/api/userslist')
		.then((response) => {expect(response.body[response.body.length-1].password).to.eql("test2")});
		
		cy.request('DELETE','http://localhost:3000/api/userslist/test')
	});	
});