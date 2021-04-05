const Page = require('./page')
const Search = require('./search.page')

class Wishlist extends Page {

    get number_of_item_in_wishlist() {
        return $('//a[@href="/wishlist"]/span[2]')
    }
    get number_of_item_in_shopping_cart() {
        return $('//li[@id="topcartlink"]/a/span[@class="cart-qty"]')
    }
    get message_when_empty_wishlist() {
        return $('//div[@id="bar-notification"]/following-sibling::div[1]/div[3]/div/div/div/div[2]/div')
    }
    get message_when_unsuccessfully_add_to_cart() {
        return $('//div[@id="bar-notification"]/div/p')
    }
    get_detail_link(product_name) {
        return $('//h2[@class="product-title"]/a[text()="' + product_name + '"]')
    }
    get add_to_wishlist_button() {
        return $('//form[@id="product-details-form"]/div[2]/div/div[2]/div[@class="overview-buttons"]/div[1]/button[text()="Add to wishlist"]')
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
    get wishlist_table() {
        return $('//form[@method="post"]/div[@class="table-wrapper"]/table')
    }
    get wishlist_records() {
        return this.wishlist_table.$$('./tbody/tr')
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
    get_add_to_cart_checkbox(index) {
        return this.wishlist_records[index].$('./td[@class="add-to-cart"]/input')
    }
    get update_wishlist_button() {
        return $('//form[@method="post"]/div[@class="buttons"]/button[@name="updatecart"]')
    }
    get wishlist_URL() {
        return $('//form[@method="post"]/parent::div/following-sibling::div[@class="share-info"]/a')
    }
    get add_to_cart_button() {
        return $('//form[@method="post"]/div[@class="buttons"]/button[@name="addtocartbutton"]')
    }

    open_wishlist_page() {
        super.wishlist_tab.click()
    }

    add_item_to_wishlist(product_name) {
        Search.search(product_name)
        this.get_detail_link(product_name).waitForClickable({timeout: 5000})
        this.get_detail_link(product_name).click()
        this.add_to_wishlist_button.waitForClickable({timeout: 5000})
        this.add_to_wishlist_button.click()
        this.wishlist_notification_message.waitForDisplayed({timeout: 5000})
    }

    update_item_to_wishlist() {
        this.get_quantity_of_item(1).clearValue()
        this.get_quantity_of_item(1).addValue(10)
        this.update_wishlist_button.click()
    }

    add_item_to_cart(index) {
        for(var i = 0; i < index; i++) {
            this.get_add_to_cart_checkbox(i).click()
        }
        this.add_to_cart_button.click()
        super.wishlist_tab.click()
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