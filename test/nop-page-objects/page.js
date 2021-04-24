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
        return $('//div[@id="bar-notification"]/following-sibling::div/div/div/div[2]/div/ul/li[3]/a/span[@class="wishlist-label"]')
    }
    

    open() {
        return browser.url('https://frontend.nopcommerce.com/')
    }
    get iframe() {return $('//iframe')}

    setFrame() {
        return browser.switchToFrame(this.iframe)
    }
    deleteCookies() {
        return browser.deleteCookies()
    }
    enterFullScreen() {
        return browser.fullscreenWindow()
    }

}