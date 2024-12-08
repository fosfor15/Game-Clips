
describe('Clip test', () => {
    it('should play clip', () => {
        cy.visit('/');
        cy.get('app-clips-list > .grid a:first-child').click();
        cy.wait(2e3);
        cy.get('.video-js .vjs-big-play-button').click();
        cy.wait(5e3);
        cy.get('.video-js video').click();
        cy.get('.vjs-play-progress').invoke('width').should('gte', 0);
    });
});
