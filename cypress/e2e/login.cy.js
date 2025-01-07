import loginpage from "../pages/loginpage";

describe("Automate the Login Scenario For Pizza Ordering Apllication", () => {

    let testdata;

    before(()=>{
        cy.visit('https://snowy-water-49894.pktriot.net')
        //get the test data from fixtures
        cy.fixture('testdata').then((data)=>{
            testdata = data
        })
    })
    it("Verify Login functionality in Pizza Ordering Application TC_Login_001", () => {
        loginpage.getSignupBtn().click()
        cy.contains('PizzaHQ Members Login').should('be.visible')
        cy.contains('a', 'Sign Up').click()
        //verify field validations - mandatory check
        cy.xpath(`//button/span[contains(text(), "Sign Up")]`).click()
        cy.get('#username-err').should('be.visible').then((element => {
            expect(element.text()).to.eq("Username is required")
        }))
        cy.get('#password-err').should('be.visible').then((element => {
            expect(element.text()).to.eq("Password is required")
        }))
        cy.get('#confirm-err').should('be.visible').then((element => {
            expect(element.text()).to.eq("Please confirm your password")
        }))
       //verify field validations - invalid inputs
       cy.xpath(`//label[contains(text(),"Username")]/following-sibling::input[contains(@id, "input")]`).type(testdata.invalidcreds.username)
       cy.get(`input[type="Password"]`).eq(0).type(testdata.invalidcreds.password, {force:true})
       cy.get(`input[type="Password"]`).eq(1).type(testdata.invalidcreds.confirmpassword, {force:true})
       cy.xpath(`//button/span[contains(text(), "Sign Up")]`).click()
       cy.get('#username-err').should('be.visible').then((element => {
        expect(element.text()).to.eq("Username must be minimum of 6 characters")
        }))
        cy.get('#password-err').should('be.visible').then((element => {
            expect(element.text()).to.eq("Password must be minimum of 8 characters")
        }))
        cy.get('#confirm-err').should('be.visible').then((element => {
            expect(element.text()).to.eq("Please confirm your password")
        }))
        //verify field validation - already exisitng user
        cy.xpath(`//label[contains(text(),"Username")]/following-sibling::input[contains(@id, "input")]`).clear().type(testdata.existingusercreds.username)
        cy.xpath(`//button/span[contains(text(), "Sign Up")]`).click()
        cy.get('#username-err').should('be.visible').then((element => {
         expect(element.text()).to.eq("Username already exists")
         }))
        //verify login with valid credentials
        cy.xpath(`//label[contains(text(),"Username")]/following-sibling::input[contains(@id, "input")]`).clear().type(testdata.validcreds.username)
        cy.get(`input[type="Password"][id*=input]`).eq(0).clear().type(testdata.validcreds.password, {force:true})
        cy.get(`input[type="Password"][id*=input]`).eq(1).clear().type(testdata.validcreds.confirmpassword, {force:true})
        cy.xpath(`//button/span[contains(text(), "Sign Up")]`).click()
        //validate the success login message
        cy.get(`div[class*='popup-message']`).then((element)=>{
        expect(element.text()).to.eq("Thanks robinhood, you can now login.")
        })
        // //validate the error messages are not present
        // cy.get('#username-err').then((element => {
        //     cy.wrap(element).should('not.be.visible')
        // }))
        // cy.get('#password-err').then((element => {
        //     cy.wrap(element).should('not.exist')
        // }))
        // cy.get('#confirm-err').then((element => {
        //     cy.wrap(element).should('not.exist')
        // }))
    })
})