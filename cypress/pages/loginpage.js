class loginpage {

   elements = {
    signupbtn : () => cy.get(`a[class*='login-signup']`)
   }

   getSignupBtn(){
    return this.elements.signupbtn()
   }
}
export default new loginpage();