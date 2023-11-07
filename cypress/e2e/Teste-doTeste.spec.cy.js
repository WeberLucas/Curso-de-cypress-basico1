// <reference type="Cypress"/>

const { wrap } = require("lodash");

describe('Central de Atendimento ao Cliente TAT',function () {
    beforeEach(function() {
      cy.visit('./src/index.html')

    })
  it('verifica o título', function() {
      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')

  });
  it('preenche os campos obrigatórios e vnia o formulário', function() {
    const longText = 'teste,teste,testeteste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,testteste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,testteste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,test,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,'
    cy.get('#firstName').type('weber lucas')
    cy.get('#lastName').type('laube luiz')
    cy.get('#email').type('weber13lucas@gmail.com')
    cy.get('#open-text-area').type(longText,{ delay : 0 })
    cy.contains('.button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  });

  it('exibe mensagem de erro ao submeter o formeulatório com email formatado incorreto', function() {
    cy.get('#firstName').type('weber lucas')
    cy.get('#lastName').type('laube luiz')
    cy.get('#email').type('weber13lucas.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('.button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  });
it('compo telefone continua vazio quando preenchido com valor não númerico', function(){

cy.get('#phone')
.type('aaa')
.should('have.value','');
})
it('exibe mensagem de erro quando telefone for obrigatório mas não estiver preenchido ', function(){
  cy.get('#firstName').type('neyde regina')
  cy.get('#lastName').type('laube luiz')
  cy.get('#email').type('weber13lucas@gmail.com')
  cy.get('#phone-checkbox').check()
  cy.get('#open-text-area').type('teste')
  cy.contains('.button', 'Enviar').click()

  cy.get('.error').should('be.visible')
})
it('preenche e limpa os campos',function(){
  cy.get('#firstName')
  .type('weber')
  .should('have.value','weber')
  .clear()
  .should('have.value','')
  cy.get('#lastName')
  .type('lucas')
  .should('have.value','lucas')
  .clear()
  .should('have.value','')
  cy.get('#email')
  .type('weber13lucas@gmail.com')
  .should('have.value','weber13lucas@gmail.com')
  .clear()
  .should('have.value','')
  cy.get('#phone')
  .type('123467899')
  .should('have.value','123467899') 
  .clear()
  .should('have.value','')

})

it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function() {
  cy.contains('.button', 'Enviar').click()
  cy.get('.error').should('be.visible')
})

it('envia o formuário com sucesso usando um comando customizado', function() {
cy.fillManatoryFieldsAndSubmit()

cy.get('.success').should('be.visible')
});

it('seleciona um produto (YouTube) por seu texto',function(){ 

cy.get('#product')
//também posso  passar select por ser o unico da tela
.select('YouTube')
.should('have.value','youtube')
})

it('seleciona um produto (Mentoria) por seu valor (value)',function(){ 
  cy.get('#product')
  .select('Mentoria')
 .should('have.value','mentoria')
})
it('seleciona um produto (Blog) por seu índice`',function(){ 
  cy.get('#product')
  .select(1)
  .should('have.value','blog')
})

it('marca o tipo de atendimento "Feedback', function(){

  cy.get('input[type="radio"][value="feedback"]')
  .check()
  .should('have.value', 'feedback')
})
it('  marca cada tipo de atendimento',function() {
  cy.get('input[type="radio"]')
  .should('have.length',3)
  .each(function($radio) {
    cy.wrap($radio).check()
    cy.wrap($radio).should('be.checked')
  })
})

it('marca ambos checkboxes, depois desmarca o último',function() {
  cy.get('input[type="checkbox"]')
  .check()
  .should('have.length',2)
  .should('to.be.checked')
  .last()
  .uncheck()
  .should('not.be.checked')
})
it('seleciona um arquivo da pasta fixtures', function(){
cy.get('input[type="file"]')
.should('not.have.value')
.selectFile('/home/tagplus/Área de Trabalho/weber-testes/cypress/fixtures/example.json')
.should(function($input ) {
 expect ($input[0].files[0].name).to.equal('example.json')
})

})
it('seleciona um arquivo simulando um drag-and-drop', function() {
  cy.get('input[type="file"]')
  .should('not.have.value')
  //.selectFile('/home/tagplus/Área de Trabalho/weber-testes/cypress/fixtures/example.json', {action: 'drag-drop'})
  .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})

  .should(function($input ) {
   expect ($input[0].files[0].name).to.equal('example.json')


})
})
it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
  cy.fixture('example.json').as('sampleFile')
  cy.get('input[type="file"]')
  .selectFile('@sampleFile')
  .should(function($input) {
  expect($input[0].files[0].name).to.equal('example.json')
  })
})
it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
  cy.get('#privacy a').should('have.attr','target','_blank')
})
it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
  cy.get('#privacy a')
  .invoke('removeAttr', 'target')
  .click()
  cy.contains('Talking About Testing').should('be.visible')
})

});
