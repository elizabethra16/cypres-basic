describe('User Can Create New User', () => {
  before(() => {
    cy.log("run once before all tests in the block")
  })
  after(() => {
    cy.log("runs once after all tests in the block")
  })
  afterEach(() => {
    cy.log("run after each test in the block")
  })
  
  beforeEach(() => {
    //arrange
    cy.visit('http://127.0.0.1:8000/')
    //reset database by calling php artisan
    cy.exec("cd ../demo-app-cypress-automation && php artisan migrate:fresh --seed", { timeout: 100000 });


    //act
    cy.get(':nth-child(2) > .form-control').type('superadmin@gmail.com');
    cy.get(':nth-child(3) > .form-control').type('password');
    cy.get('.btn').click();
    cy.visit('http://127.0.0.1:8000/user-management/user');
    cy.get('.card-header-action > .btn-icon').click();
  
  
  });
  //possitive
  it('user can create new user', () => {

    cy.get('#name').type('baru');
    cy.get('#email').type('baru@gmail.com');
    cy.get('#password').type('1234567890');
    cy.get('.btn-primary').click();
    //assert
    cy.get('p').should('be.visible');
    cy.get('p').should('have.text', 'Data Berhasil Ditambahkan');
    cy.get('.navbar-right > :nth-child(2) > .nav-link').click();
    cy.get('.text-danger').click();
  })

  //negative
  it('user cant create new user because invalid email', () => {
        
    cy.get('#name').type('baru');
    cy.get('#email').type('baru');
    cy.get('#password').type('1234567890');
    cy.get('.btn-primary').click();
    //assert
    cy.get('.invalid-feedback').should('be.visible');
    cy.get('.invalid-feedback').should('contain', 'The email must be a valid email address.');
    cy.get('.invalid-feedback').should('have.class', 'invalid-feedback');
    cy.get('.nav-link > .d-sm-none').click();
    cy.get('.text-danger').click();
      
    
  })

  it('user cant create new user because name is required', () => {

    cy.get('#email').type('baru@gmail.com');
    cy.get('#password').type('1234567890');
    cy.get('.btn-primary').click();
    //assert
    cy.get('.invalid-feedback').should('be.visible');
    cy.get('.invalid-feedback').should('contain', 'The name field is required.');
    cy.get('.invalid-feedback').should('have.class', 'invalid-feedback');
    cy.get('.nav-link > .d-sm-none').click();
    cy.get('.text-danger').click();
  
  })
})