const LoginPage = require('../nop-page-objects/login.page')
const parameter = require('./parameter')

describe('Login page', () => {
    before(() => {
        LoginPage.open()
        LoginPage.setFrame()
    })
    describe('Valid info when login', () => {
        it('6. should login successfully when inputting valid information', () => {
            LoginPage.login(parameter.email, parameter.password)
            expect(LoginPage.logout_tab).toHaveText('Log out')
            LoginPage.logout_tab.click()
        })
    })
    
    describe('Invalid info when login', () => {
        it('7. should show error message when inputting invalid email', () => {
            LoginPage.login(parameter.invalid_value, parameter.password)
            expect(LoginPage.wrong_email_message).toHaveText('Wrong email')
        })

        it('8. should show error message when inputting wrong password', () => {
            LoginPage.login(parameter.email, parameter.invalid_value)
            expect(LoginPage.unsuccessful_login_message).toHaveText('The credentials provided are incorrect')
        })

        it('9. should show error message when email field is blank', () => {
            LoginPage.login(parameter.blank_value, parameter.blank_value)
            expect(LoginPage.wrong_email_message).toHaveText('Please enter your email')
        })
    })

    describe('Forgot password', () => {
        it('10. should sent email when inputting valid email', () => {
            LoginPage.forgot_password(parameter.email)
            expect(LoginPage.sent_email_message).toHaveText('Email with instructions has been sent to you.')
        })

        it('11. should show not found email message when inputting invalid email', () => {
            LoginPage.forgot_password(parameter.invalid_email)
            expect(LoginPage.sent_email_message).toHaveText('Email not found.')
        })
    })
})