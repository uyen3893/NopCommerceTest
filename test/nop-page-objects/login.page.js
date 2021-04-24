const Page = require('./page')

class LoginPage extends Page {
    
    get input_email() {return $('#Email')}
    get input_pass() {return $('#Password')}
    get login_button() {return $('//button[text()="Log in"]')}
    get successful_login_message() {
        return $('//h2[text()="Welcome to our store"]')
    }

    get wrong_email_message() {
        return $('#Email-error')
    }

    get unsuccessful_login_message() {
        return $('//li[text()="The credentials provided are incorrect"]')
    }

    get forgot_password_button() {
        return $('//a[@href="/passwordrecovery"]')
    }

    get email_when_forgot_password() {
        return $('#Email')
    }

    get recover_button() {
        return $('//button[text()="Recover"]')
    }

    get sent_email_message() {
        return $('.result')
    }
    
    login(username, password) {
        super.login_tab.click()
        this.input_email.addValue(username)
        this.input_pass.addValue(password)
        this.login_button.click()
    }

    forgot_password(email) {
        super.login_tab.click()
        this.forgot_password_button.click()
        this.email_when_forgot_password.addValue(email)
        this.recover_button.click()
    }
    
    open() {
        return super.open()
    }

    setFrame() {
        return super.setFrame()
    }
    
}

module.exports = new LoginPage()