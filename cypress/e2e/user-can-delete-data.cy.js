describe('template spec', () => {

    beforeEach(()=> {
  
      //reset database
      cy.exec("cd ../demo-app-cypress-automation && php artisan migrate:fresh --seed", { timeout: 100000 });
      //php artisan migrate:fresh --seed
  
      //arrange
      cy.visit('http://127.0.0.1:8000/');
  
      
      //act
      cy.get(':nth-child(2) > .form-control').type('superadmin@gmail.com');
      cy.get(':nth-child(3) > .form-control').type('password');
      cy.get('.btn').click();
      cy.visit('http://127.0.0.1:8000/user-management/user');
      
      
    });
    
    it('User can delete data', () => {
      // cy.get(".table td").contains("user").next().next().next().contains("Delete").click();
      // cy.get(".table td").contains("user").nextAll().contains("Delete").click();
      cy.get(".table td").contains("user").parent().find("button").contains("Delete").click();
  
      //make sure sweet alert
      cy.get(".swal-button-container").find("button").contains("OK").click();
  
      // /* ==== Generated with Cypress Studio ==== */
      // cy.get(':nth-child(3) > .text-right > .d-flex > .ml-2 > .btn').click();
      // cy.get(':nth-child(2) > .swal-button').click();
      // cy.get('p').should('be.visible');
      cy.get('.alert').should('contain', 'User Deleted Successfully');
      cy.get(".table").should("not.contain","user")
  
      /* ==== End Cypress Studio ==== */
    })
  
    it.only('User can cancel delete data', () => {
      //arrange
  
      //act
  
      cy.get(".table td").contains("user").parent().find("button").contains("Delete").click();
  
      //make sure sweet alert
      cy.get(".swal-button-container").find("button").contains("Cancel").click();
      
      cy.get(".table td").contains("user").should("be.visible");
  
      // cy.get(':nth-child(3) > .text-right > .d-flex > .ml-2 > .btn').click();
  
      // /* ==== Generated with Cypress Studio ==== */
      // cy.get(':nth-child(1) > .swal-button').click();
      // /* ==== End Cypress Studio ==== */
      // /* ==== Generated with Cypress Studio ==== */
      // cy.get('.table > tbody > :nth-child(3) > :nth-child(2)').should('contain', 'user');
      // /* ==== End Cypress Studio ==== */
    })
  
    //negative test case
  
    it('dummy test', () => {
      
    })
  
  
  
  })