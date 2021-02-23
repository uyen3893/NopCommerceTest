const RegisterPage = require('../nop-page-objects/register.page')
const parameter = require('./parameter')

describe('Register page', () => {
    before(() => {
        RegisterPage.open()
        RegisterPage.setFrame()
    })

    describe('Valid info when register', () => {
        it('1. should register new account when inputting valid information', () => {
            RegisterPage.register(parameter.firstname, parameter.lastname, parameter.email, parameter.password)
            expect(RegisterPage.successful_register_message).toHaveText('Your registration completed')
            RegisterPage.logout_tab.click()
        })
    })
    
    describe('Invalid info when register', () => {
        it('2. should show error message when firstname, lastname, email and password are blank', () => {
            RegisterPage.register(parameter.blank_value, parameter.blank_value, parameter.blank_value, parameter.blank_value)
            expect(RegisterPage.firstname_message).toHaveText('First name is required.')
            expect(RegisterPage.lastname_message).toHaveText('Last name is required.')
            expect(RegisterPage.email_message).toHaveText('Email is required.')
            expect(RegisterPage.password_message).toHaveText('Password is required.')
            expect(RegisterPage.confirm_password_message).toHaveText('Password is required.')
    
        })
    
        it('3. should show error message when inputting invalid email', () => {
            RegisterPage.register(parameter.blank_value, parameter.blank_value, parameter.invalid_value, parameter.blank_value)
            expect(RegisterPage.email_message).toHaveText('Wrong email')
        })
    
        it('4. should show error message when inputting password equal or less than 5 characters', () => {
            var character = 'a'
            RegisterPage.register(parameter.blank_value, parameter.blank_value, parameter.invalid_value, character)
            expect(RegisterPage.wrong_password_message).toHaveText('must have at least 6 characters')
            
        })
    
        it('5. should show error message when inputting a registered email', () => {
            RegisterPage.register(parameter.firstname, parameter.lastname, parameter.email, parameter.password)
            expect(RegisterPage.email_exists_message).toHaveText('The specified email already exists')
        })
    })

    
})

