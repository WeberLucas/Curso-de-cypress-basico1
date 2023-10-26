Cypress.Commands.add('fillManatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('weber lucas')
    cy.get('#lastName').type('laube luiz')
    cy.get('#email').type('weber13lucas@gmail.com')
    cy.get('#open-text-area').type('laube luiz')
    cy.contains('.button', 'Enviar').click()
})