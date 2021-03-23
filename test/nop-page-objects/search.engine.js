const Page = require('./page')

class Search extends Page {
    get search_bar() {
        return $('#small-searchterms')
    }
    get search_button() {
        return $('//button[@type="submit"]')
    }
        
    get list_of_products() {
        return $$('//div[@class="item-box"]')
    }   
    
    get error_message() {
        return $('//div[@id="bar-notification"]/following-sibling::*/div[3]/div/div[2]/div/div[2]/div[2]/div/div[2]/div')
    }
        
    get_title_of_product(index) {
        return this.list_of_products[index].$('./div/div[2]/h2/a')
    }


    search(keyword) {
        this.search_bar.addValue(keyword)
        this.search_button.click()
    }
    
    clear_keyword() {
        this.search_bar.clearValue()
    }

    open() {
        return super.open()
    }

    setFrame() {
        return super.setFrame()
    }
}

module.exports = new Search()