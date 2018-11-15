// Jeg er litt usikker på hva vi burde sette denne til. Om det er flere som bruker nettsiden så blir databasen treig 
// og vi må vente mer mellom hvert step, men om du er eneste så er den ganske kjapp.
const waitTime = 2000;

// Denne testen tester søkebaren og informasjon til en film
describe('Regular working search and MovieView.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
      .wait(waitTime);
  });

  // Denne testen søker vi ette Toy Story
  it('Search for Toy Story and click it.', () => {
    const keyword = 'Toy Story'
    // Skriver Toy Story i søkefeltet og sjekker at det blir skrevet riktig
    cy.get('.searchInputField').children()
      .type(keyword)
      .should('have.value', keyword)
      .wait(waitTime);

    // Trykker på den første filmen som kommer opp
    cy.get('.clickableMovieGridItem')
      .first()
      .click()
      .wait(waitTime);

    // Tester at at vi har trykker på den forventede filmen
    cy.get('.title')
      .invoke('text').then((text => {
        expect(text).to.eq('Toy Story1995-10-30')
      }));

    // Tester at overview er riktig
    cy.get('.overView')
      .invoke('text').then((text => {
        expect(text).to.eq(`Led by Woody, Andy's toys live happily in his room until Andy's birthday brings Buzz Lightyear onto the scene. Afraid of losing his place in Andy's heart, Woody plots against Buzz. But when circumstances separate Buzz and Woody from their owner, the duo eventually learns to put aside their differences.`)
      }));

    // Tester at bildet er riktig
    cy.get('img')
      .should('have.attr', 'src', "https://image.tmdb.org/t/p/w1280//rhIRbceoE9lR4veEXuwCC2wARtG.jpg");
  });

  // Denne testen søker vi etter Harry potter
  // Alt blir testet på samme måte som forrige test
  it('Search for Harry Potter and click it.', () => {
    const keyword = 'Harry Potter'
    cy.get('.searchInputField').children()
      .type(keyword)
      .should('have.value', keyword)
      .wait(waitTime);

    // Velger denne gangen den tredje filmen
    cy.get('.clickableMovieGridItem')
      .eq(2)
      .click()
      .wait(waitTime);

    cy.get('.title')
      .invoke('text').then((text => {
        expect(text).to.eq('Harry Potter and the Prisoner of Azkaban2004-05-31')
      }));

    cy.get('.overView')
      .invoke('text').then((text => {
        expect(text).to.eq(`Harry, Ron and Hermione return to Hogwarts for another magic-filled year. Harry comes face to face with danger yet again, this time in the form of escaped convict, Sirius Black – and turns to sympathetic Professor Lupin for help.`)
      }));

    cy.get('img')
      .should('have.attr', 'src', "https://image.tmdb.org/t/p/w1280//jUFjMoLh8T2CWzHUSjKCojI5SHu.jpg");
  });

  it('Search for something that will give us no results.', () => {
    const keyword = 'fjkdjfkdfjdkfjslkfjdslkfjljweolfjdoithwo'

    // Søker etter noe som vil gi null film resultater
    cy.get('.searchInputField').children()
      .type(keyword)
      .should('have.value', keyword)
      .wait(waitTime);

    // Sjekker at søkeresultet ikke har noen filmer
    cy.get('.movieTitle')
      .first()
      .invoke('text').then((text => {
        expect(text).to.eq('')
      }));
  });
});