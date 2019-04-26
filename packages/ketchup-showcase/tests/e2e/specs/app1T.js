describe('Showcase e2e - sample test 1', () => {
    it('Visits the app root url 1', () => {
        cy.visit('/');
        cy.get('#app')
            .children()
            .first()
            .should('contain', 'Test');
    });
    it('Visits the app root url 1b', () => {
        cy.visit('/');
        cy.get('#app')
            .children()
            .first()
            .should('contain', 'Test');
    });
});
