const Page = require('./page')
const Search = require('./search.page')

class Wishlist extends Page {

    get number_of_item_in_wishlist() {
        return $('//a[@href="/wishlist"]/span[2]')
    }
    get message_when_empty_wishlist() {
        return $('//div[@id="bar-notification"]/following-sibling::div[1]/div[3]/div/div/div/div[2]/div')
    }
    get item() {
        return $('//h2[@class="product-title"]/a[@href="/apple-macbook-pro-13-inch"]')
    }
    get add_to_wishlist() {
        return $('#add-to-wishlist-button-4')
    }
    
    get remove_button() {
        return $('//form[@action="/wishlist"]/div/table/tbody/tr/td[@class="remove-from-cart"]/button')
    }
    get quantity_of_item() {
        return $('//form[@action="/wishlist"]/div/table/tbody/tr/td[@class="quantity"]/input')
    }

    open_wishlist_page() {
        super.wishlist_tab.click()
    }

    add_item_in_wishlist() {
        Search.search('apple')
        this.item.click()
        this.add_to_wishlist.click()
    }

    remove_item_in_wishlist() {
        super.wishlist_tab.click()
        this.remove_button.click()
    }

    open() {
        return super.open()
    }

    setFrame() {
        return super.setFrame()
    }
}

module.exports = new Wishlist()