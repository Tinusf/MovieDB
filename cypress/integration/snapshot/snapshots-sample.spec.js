describe('snapshot testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
            .wait(2000)
    })
    it('create snapshot?', () => {
        console.log('first snapshot...')
        cy.wrap({ foo: 42 }).snapshot()
        console.log('second snapshot...')
        cy.wrap({ yeet: 11, gigia: "pipizza" }).snapshot()
        console.log('third snapshot...')
        cy.get('#root').snapshot({
            name: 'root snapshot',
            json: false
        })
    })
})