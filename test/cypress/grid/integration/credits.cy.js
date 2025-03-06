describe('Credits.', () => {
    it('Grid Lite - credits are default and not configurable.', () => {
        cy.visit('/grid-lite/cypress/credits/');
        cy.get('.hcg-credits')
            .should('not.contain', 'overwriteText')
            .find('img').should('exist'); // Default Highcharts icon

        cy.window().its('Grid').then((grid) => {
            grid.grids[0].update({
                credits: {
                    enabled: false
                }
            });

            cy.get('.hcg-credits')
                .find('img').should('exist'); // Default Highcharts icon
        });
    });

    it('Grid Pro - credits can be configurable.', () => {
        cy.visit('/grid-pro/cypress/credits-pro/');
        cy.get('.highcharts-datagrid-credits')
            .should('contain', 'overwriteText')
            .find('img').should('not.exist'); // Default Highcharts icon

        cy.window().its('Grid').then((grid) => {
            grid.grids[0].update({
                credits: {
                    enabled: false
                }
            });
        });

        cy.get('.highcharts-datagrid-credits').should('not.exist');
    });
});
