const Page = require('./page')

class LoginPage extends Page {
    
    get login_tab () {return $('.ico-login')}
    get input_email() {return $('#Email')}
    get input_pass() {return $('#Password')}
    get logout_tab() {return $('.ico-logout')}
    get login_button() {return $('//input[@value="Log in"]')}
    get successful_login_message() {
        return $('//h2[text()="Welcome to our store"]')
    }

    get wrong_email_message() {
        return $('//span[@id="Email-error"]')
    }

    get unsuccessful_login_message() {
        return $('//form[@novalidate="novalidate"]/div/ul/li')
    }

    get forgot_password_button() {
        return $('//a[@href="/passwordrecovery"]')
    }

    get email_when_forgot_password() {
        return $('//input[@id="Email"]')
    }

    get recover_button() {
        return $('//input[@name="send-email"]')
    }

    get sent_email_message() {
        return $('//div[@id="bar-notification"]/../div[6]/div[3]/div/div/div/div/div')
    }
    
    login(username, password) {
        this.login_tab.click()
        this.input_email.addValue(username)
        this.input_pass.addValue(password)
        this.login_button.click()
    }

    forgot_password(email) {
        this.login_tab.click()
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