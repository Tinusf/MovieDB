describe('Some sample tests', () =>{
    it('open site', () => {
        cy.visit('http://localhost:3000/')

        // Test attributes
        cy.get('.App-link').should('have.attr', 'target', '_blank')
        // Click
        cy.get('.App-link').click()

        // Test a search bar
        /* const keyword = 'Toy Story'
        cy.get('Search-bar')
        .type(keyword)
        .should('have.value', keyword)
        .clear()
        .should('have.value', '') */
    })

    it('assert - assert shape of an object', () => {
        const person = {
          name: 'Joe',
          age: 20,
        }
        assert.isObject(person, 'value is object')
      })
})