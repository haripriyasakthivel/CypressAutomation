describe("Sample cypress test", ()=>{
    let testdata;
    before(()=>{
        cy.fixture('example').then((data) => {
            testdata = data
        })
    })

    it.skip("first test case", ()=>{
        cy.visit("https://www.google.com/")
        cy.xpath("//div")
        cy.get('img[alt="Google"]').should('be.visible')
        cy.get('input[value="Google Search"]').should('be.visible')
        cy.get('textarea[name="q"]').type("Cypress")
        cy.contains('span', 'cypress').click()
        cy.contains('span', 'Cypress').should('be.visible').click()
        cy.log(testdata.name)
       
})
it("test all components", ()=>{
    cy.visit('https://www.zoho.com/au/books/accounting-software-demo/#/home/dashboard')
    cy.get('#quick-create').click()
    cy.get('a').contains('Customer').click()
    cy.get(`input[value='business']`).click()
    cy.get(`div [class*='ac-selected'] input[placeholder='Salutation']`).click()
   //     cy.get(`div [class*='ac-dropdown-menu']`).invoke('show')
        cy.contains("Mr.").click()
    cy.get('div button[class*="btn file-upload"] input').eq(0).selectFile("/Users/hari/Downloads/selenium.jpeg")
    cy.xpath(`//span[contains(text(), "Portal Language")]/parent::label/following-sibling::div`).click()
    cy.contains('italiano').click()

})
})