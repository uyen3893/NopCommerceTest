const Page = require('./page')
const Search = require('./search.page')

class Wishlist extends Page {

    get number_of_item_in_wishlist() {
        return $('//a[@href="/wishlist"]/span[2]')
    }
    get message_when_empty_wishlist() {
        return $('//div[@id="bar-notification"]/following-sibling::div[1]/div[3]/div/div/div/div[2]/div')
    }
    get_detail_link(product_name) {
        return $('//h2[@class="product-title"]/a[text()="' + product_name + '"]')
    }
    get add_to_wishlist_button() {
        return $('//form[@id="product-details-form"]/div[2]/div/div[2]/div[@class="overview-buttons"]/div[@class="add-to-wishlist"]/button[@type="button"]')
    }
    get wishlist_notification_message() {
        return $('//div[@id="bar-notification"]/div[@class="bar-notification success"]/p')
    }
    get wishlist_name(){
        return $('//div[@id="bar-notification"]/div/p/a')
    }
    get wishlist_notification_close_icon() {
        return $('//div[@id="bar-notification"]/div/span[@class="close"]')
    }
    get wishlist_records() {
        return $$('//form[@method="post"]/div[@class="table-wrapper"]/table/tbody/tr')
    }
    get_remove_button(index) {
        return this.wishlist_records[index].$('./td[@class="remove-from-cart"]/button')
    }
    get_quantity_of_item(index) {
        return this.wishlist_records[index].$('./td[@class="quantity"]/input')
    }
    get_sku_value(index) {
        return this.wishlist_records[index].$('./td[@class="sku"]/span')
    }
    get_product_name(index) {
        return this.wishlist_records[index].$('./td[@class="product"]/a')
    }
    get_price(index) {
        return this.wishlist_records[index].$('./td[@class="unit-price"]/span')
    }
    get_total_value(index) {
        return this.wishlist_records[index].$('./td[@class="subtotal"]/span')
    }

    open_wishlist_page() {
        super.wishlist_tab.click()
    }

    add_item_to_wishlist(product_name) {
        Search.search(product_name)
        this.get_detail_link(product_name).click()
        this.add_to_wishlist_button.click()
    }

    remove_item_in_wishlist(index) {
        this.get_remove_button(index).click()
    }

    open() {
        return super.open()
    }

    setFrame() {
        return super.setFrame()
    }
}

module.exports = new Wishlist()