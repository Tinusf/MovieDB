const waitTime = 4000

describe('snapshot testing', () => {
  beforeEach(() => {
    // hard-coder tiden til å være 13. nov 16:37 slik at klassenavnene blir like og snapshotsene funker uansett når du kjører de.
    cy.clock(1542123354);
    cy.visit('http://localhost:3000/')
      .wait(waitTime)
  });

  it('MovieGrid AKA root Snapshot', () => {
    cy.get('#root').snapshot({
      name: 'root snapshot',
      json: true
    })
  });

  it('Search results and MovieView Snapshot', () => {
    // Denne testen vil faile om noen andre har rated denne filmen, så helst ikke gjør det.

    cy.get('.searchInputField').children()
      .type("María (y los demás)")
      .should('have.value', "María (y los demás)")
      .wait(waitTime);
    // Ta snapshot av hele siden slik den er nå. Altså resultat siden. 
    cy.get('#root')
      .snapshot({
        name: 'Search result snapshot',
        json: true
      });

    cy.get('.clickableMovieGridItem')
      .first()
      .click()
      .wait(waitTime);
    // Ta snapshot av movieView altså detaljerte siden om filmen María (y los demás).
    cy.get('#root')
      .snapshot({
        name: 'MovieView snapshot',
        json: true
      });
  })
})