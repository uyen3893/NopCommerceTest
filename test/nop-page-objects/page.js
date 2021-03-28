module.exports = class Page {
    get login_tab () {return $('//a[text()="Log in"]')}
    get logout_tab() {return $('//a[@href="/logout"]')}
    get register_tab() {
        return $('//a[@href="/register?returnUrl=%2F"]')
    }
    get search_bar() {
        return $('#small-searchterms')
    }
    get search_button() {
        return $('//button[@type="submit"]')
    }
    get wishlist_tab() {
        return $('//a[@href="/wishlist"]')
    }
    get wishlist_notification_message() {
        return $('//div[@id="bar-notification"]/div/p')
    }
    get wishlist_notification_close_icon() {
        return $('//div[@id="bar-notification"]/div/span')
    }

    open() {
        return browser.url('https://frontend.nopcommerce.com/')
    }
    get iframe() {return $('//iframe')}

    setFrame() {
        return browser.switchToFrame(this.iframe)
    }
}