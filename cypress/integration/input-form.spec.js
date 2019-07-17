describe('Input form', () => {
  beforeEach(() => {
    cy.seedAndVisit([]) // connect server and go to root route
  })

  it('focuses input on load', () => {
    cy.focused()
      .should('have.class', 'new-todo')
  })

  it('accepts input', () => {
    const typedText = 'test 123456'

    cy.get('.new-todo')
      .type(typedText)
      .should('have.value', typedText)
  })

  context('Form submission by keyboard and mouse', () => {
    beforeEach(() => {
      cy.server()
    })

    it('Adds a new todo on submit by keyboard', () => {
      const itemText = 'add note by keyboard'
      cy.route('POST', '/api/todos', {
        name: itemText,
        id: 1,
        isComplete: false
      })

      cy.get('.new-todo')
        .type(itemText)
        .type('{enter}')
        .should('have.value', '')

      cy.get('.todo-list li')
        .should('have.length', 1)
        .and('contain', itemText)
    })

    it('Adds a new todo on submit by mouse', () => {
      const itemText = 'add note by mouse'
      cy.route('POST', '/api/todos', {
        name: itemText,
        id: 1,
        isComplete: false
      })

      cy.get('.new-todo')
        .type(itemText)
        
      cy.get('button')
        .click()

      cy.get('.todo-list li')
        .should('have.length', 1)
        .and('contain', itemText)
    })

    it('Shows an error message on a failed submission', () => {
      cy.route({
        url: '/api/todos',
        method: 'POST',
        status: 500,
        response: {}
      })

      cy.get('.new-todo')
        .type('test{enter}')

      cy.get('.todo-list li')
        .should('not.exist')

      cy.get('.error')
        .should('be.visible')
    })
  })
})
