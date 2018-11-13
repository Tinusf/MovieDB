// Jeg er litt usikker på hva vi burde sette denne til. Om det er flere som bruker nettsiden så blir databasen treig og vi må vente mer mellom hvert step, men om du er eneste så er den ganske kjapp.
const waitTime = 2000;

describe('Regular working search and MovieView.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  });
  it('Search for Toy Story and click it.', () => {
    // Test attributes
    // cy.get('.App-link').should('have.attr', 'target', '_blank')
    // // Click
    // cy.get('.App-link').click()

    // Test a search bar
    const keyword = 'Toy Story'
    cy.get('.searchInputField').children()
      .type(keyword)
      .should('have.value', keyword)
      .wait(waitTime);

    cy.get('.clickableMovieGridItem')
      .first()
      .click()
      .wait(waitTime);

    cy.get('.title')
      .invoke('text').then((text => {
        expect(text).to.eq('Toy Story1995-10-30')
      }));

    cy.get('.overView')
      .invoke('text').then((text => {
        expect(text).to.eq(`Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences.`)
      }));

    cy.get('img')
      .should('have.attr', 'src', "https://image.tmdb.org/t/p/w1280//rhIRbceoE9lR4veEXuwCC2wARtG.jpg");
  });
});