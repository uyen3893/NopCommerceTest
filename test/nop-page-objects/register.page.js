const Page = require('./page')

class RegisterPage extends Page {
    get first_name() {
        return $('#FirstName')
    }
    get last_name() {
        return $('#LastName')
    }
    get email() {
        return $('#Email')
    }
    get password() {
        return $('#Password')
    }
    get confirm_password() {
        return $('#ConfirmPassword')
    }
    get register_tab() {
        return $('a=Register')
    }
    get register_button() {
        return $('//input[@id="register-button"]')
    }

    get successful_register_message() {
        return $('//div[text()="Your registration completed"]')
    }

    get firstname_message() {
        return $('#FirstName-error')
    }

    get lastname_message() {
        return $('#LastName-error')
    }

    get email_message() {
        return $('#Email-error')
    }

    get password_message() {
        return $('#Password-error')
    }

    get confirm_password_message() {
        return $('#ConfirmPassword-error')
    }

    get logout_tab() {
        return $('.ico-logout')
    }

    get wrong_password_message() {
        return $('//span[@id="Password-error"]/ul/li')
    }

    get email_exists_message() {
        return $('//li[text()="The specified email already exists"]')
    }

    register(firstname, lastname, email, password) {
        this.register_tab.click()
        this.first_name.addValue(firstname)
        this.last_name.addValue(lastname)
        this.email.addValue(email)
        this.password.addValue(password)
        this.confirm_password.addValue(password)
        this.register_button.click()
    }

    open() {
        return super.open()
    }

    setFrame() {
        return super.setFrame()
    }

}

module.exports = new RegisterPage()