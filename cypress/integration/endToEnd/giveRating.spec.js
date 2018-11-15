// Har en ganske lang wait time for å være sikker på at alt lastes inn i tide.
const waitTime = 2000;

describe('Give movie a rating', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
      .wait(waitTime);
  });

  it('Click the first movie and try to give a rating without a score', () => {
    // Trykker på den første filmen som kommer opp
    cy.get('.clickableMovieGridItem')
      .first()
      .click()
      .wait(waitTime);

    // Sjekker at vi ikke har gitt en rating før vi trykker på knappen
    cy.get('.myRating')
      .should('not.exist')

    // Trykker "Rate This Movie" knappen uten å gitt en score
    cy.get('.ratingButton')
      .click()

    // Teksten som sier hva vi har ratet filmen burde ikke eksistere
    cy.get('.myRating')
      .should('not.exist')
  });

  it('Click the first movie and give a rating with a score', () => {
    cy.get('.clickableMovieGridItem')
      .first()
      .click()
      .wait(waitTime);

    // Sjekker at vi ikke har gitt en rating før vi trykker på knappen
    cy.get('.myRating')
      .should('not.exist');

    // Velger 10 stjerner
    cy.get('.starRating10')
      .click()
      .wait(waitTime);

    // Trykker "Rate This Movie" knappen og sjekker at den forsvinner
    cy.get('.ratingButton')
      .click()
      .wait(waitTime)
      .should('not.exist');

    // Sjekker at ratingen har blitt registrert
    cy.get('.myRating')
      .invoke('text').then((text => {
        expect(text).to.eq('Your rating 10')
      }));
  });
});