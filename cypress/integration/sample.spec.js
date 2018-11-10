describe('Some sample tests', () => {
  /*   beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
    it('open site', () => {
      // Test attributes
      cy.get('.App-link').should('have.attr', 'target', '_blank')
      // Click
      cy.get('.App-link').click() */

  // Test a search bar
  /* const keyword = 'Toy Story'
  cy.get('Search-bar')
  .type(keyword)
  .should('have.value', keyword)
  .clear()
  .should('have.value', '') 
  
})
  */

  it('assert - assert shape of an object', () => {
    const person = {
      name: 'Joe',
      age: 20,
    }
    assert.isObject(person, 'value is object')
  })
})

const myFunc = (a, b) => {
  return a - b
}

describe('Some simple unit tests', () => {
  it('Test correct sum', () => {
    expect(2 + 2).to.equal(4)
  })
  it('Test wrong sum', () => {
    expect(1).to.not.equal(4)
  })
  it('Test myFunc', () => {
    expect(myFunc(2, 1)).to.equal(1)
  })
})