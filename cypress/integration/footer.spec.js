describe('Footer', () => {
  context('with a single note', () => {
    it('displays 0 note in count', () => {
      cy.seedAndVisit([])
      cy.get('.todo-count')
        .should('contain', 'no')
    })


    it('displays 1 note in count', () => {
      cy.seedAndVisit([{id: 1, name: 'Note 1', isComplete: false}])
      cy.get('.todo-count')
        .should('contain', '1 note')
    })
  })

  context('with multiple notes', () => {
    beforeEach(() => {
      cy.seedAndVisit()
    })

    it('displays multiple todos in count', () => {
      cy.get('.todo-count')
        .should('contain', 'notes')
    })

    
  })
})
