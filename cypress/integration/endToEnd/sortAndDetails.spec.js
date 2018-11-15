// Har en ganske lang wait time for å være sikker på at alt lastes inn i tide.
const waitTime = 4000;

// Disse testene tester sortering av filmer
describe('Regular sorting.', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
      .wait(waitTime);
  });
  // Først sorterer vi alfabetisk på tittel
  it('Sort by title', () => {
    // Trykker på sorteringsknappen
    cy.get('.sortButton')
      .click()

    // Trykker på menuItem'et som sorterer alfabetisk og sjekker at teksten er riktig
    cy.get('.sortTitle')
      .click()
      .invoke('text').then((text => {
        expect(text).to.eq('Alphabetical')
      })).wait;

    // Trykker på knappen ved siden av som endrer ordering fra desc til asc
    cy.get(".sortIcon")
      .click()
      .wait(waitTime);

    // Trykker på den første filmen
    cy.get('.clickableMovieGridItem')
      .first()
      .click()
      .wait(waitTime);

    // Tester at vi har trykket filmen vi forventer å trykke
    cy.get('.title')
      .invoke('text').then((text => {
        expect(text).to.eq('!Women Art Revolution2010-01-01')
      }));

    cy.get('img')
      .should('have.attr', 'src', "https://image.tmdb.org/t/p/w1280//hfkqKt23CvBxHSNsCeLM6bbYC6M.jpg")
  });

  // Denne testen sorterer vi på revenue
  // Ellers fungerer den akkurat som den forrige utenom å endre ordering
  it('Sort by Revenue', () => {
    cy.get('.sortButton')
      .click()

    cy.get('.sortRevenue')
      .click()
      .invoke('text').then((text => {
        expect(text).to.eq('Revenue')
      })).wait(waitTime);

    cy.get('.clickableMovieGridItem')
      .first()
      .click()
      .wait(waitTime);

    cy.get('.title')
      .invoke('text').then((text => {
        expect(text).to.eq('Avatar2009-12-10')
      }));

    cy.get('img')
      .should('have.attr', 'src', "https://image.tmdb.org/t/p/w1280//kmcqlZGaSh20zpTbuoF0Cdn07dT.jpg")
  });
});