module.exports = class Page {
    open() {
        return browser.url('https://frontend.nopcommerce.com/')
    }
    get iframe() {return $('//iframe')}

    setFrame() {
        return browser.switchToFrame(this.iframe)
    }
}