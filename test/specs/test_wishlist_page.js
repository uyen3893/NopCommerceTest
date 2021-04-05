const Wishlist = require('../nop-page-objects/wishlist.page')
const products = require('../data/products')
const money_formatter = require('../formatters/money.formatter')
const assert = require('assert')

var product_quantity = [0, 0]
describe('Test the wishlist', () => {
    before(() => {
        Wishlist.open()
        Wishlist.setFrame()
        Wishlist.enterFullScreen()
    })

    describe('Check status of the wishlist', () => {
        it('15. should be empty when wishlist has no item', () => {
            Wishlist.wishlist_tab.click()
            expect(Wishlist.number_of_item_in_wishlist).toHaveText('(0)')
            expect(Wishlist.message_when_empty_wishlist).toHaveText("The wishlist is empty!")
        })
    })
    describe('Add/Remove/Update', () => {
        beforeEach( () => {
            product_quantity.pop()
            product_quantity = [0, 0];
            Wishlist.add_item_to_wishlist(products.products[0].name)
            product_quantity[0]++
            Wishlist.add_item_to_wishlist(products.products[1].name)
            product_quantity[1] = product_quantity[1] + 2
            Wishlist.open_wishlist_page()
        })
    
        describe('Add same products to wishlist', () => {
            it('16. should products are showed correctly in wishlist', () => {
                Wishlist.add_item_to_wishlist(products.products[1].name)
                product_quantity[1] = product_quantity[1] + 2
                expect(Wishlist.wishlist_notification_message).toHaveText("The product has been added to your wishlist")
                Wishlist.wishlist_notification_close_icon.click()
                Wishlist.open_wishlist_page()
                expect(Wishlist.number_of_item_in_wishlist).toHaveText('(' + (product_quantity[1] + product_quantity[0]) + ')')
                expect(Wishlist.get_sku_value(1)).toHaveText(products.products[1].sku)
                expect(Wishlist.get_product_name(1)).toHaveText(products.products[1].name)
                expect(Wishlist.get_price(1)).toHaveText(money_formatter.usd_format.format(products.products[1].price))
                expect(Wishlist.get_total_value(1)).toHaveText(money_formatter.usd_format.format(products.products[1].price*product_quantity[1]))
                expect(Wishlist.get_quantity_of_item(1)).toHaveAttribute('value', product_quantity[1])
            })
        })
    
        describe('Add different products to wishlist', () => {
            it('17. should new products are showed correctly in wishlist', () => {
                Wishlist.add_item_to_wishlist(products.products[2].name)
                product_quantity.push(1)
                expect(Wishlist.wishlist_notification_message).toHaveText("The product has been added to your wishlist")
                Wishlist.wishlist_notification_close_icon.click()
                Wishlist.open_wishlist_page()
                let total_of_product = 0
                for (var i = 0; i < product_quantity.length; i++) {
                    total_of_product += product_quantity[i]
                }
                expect(Wishlist.number_of_item_in_wishlist).toHaveText('(' + total_of_product + ')')
                assert(Wishlist.wishlist_records.length, product_quantity.length)
                for (var i = 0; i < product_quantity.length; i++) {
                    expect(Wishlist.get_sku_value(i)).toHaveText(products.products[i].sku)
                    expect(Wishlist.get_product_name(i)).toHaveText(products.products[i].name)
                    expect(Wishlist.get_price(i)).toHaveText(money_formatter.usd_format.format(products.products[i].price))
                    expect(Wishlist.get_total_value(i)).toHaveText(money_formatter.usd_format.format(products.products[i].price*product_quantity[i]))
                    expect(Wishlist.get_quantity_of_item(i)).toHaveAttribute('value', product_quantity[i])
                }
            })
        })
    
        describe('Update quantity of product in wishlist page', () => {
            it('18. should change quantity of product when clicking on update wishlist button', () => {
                Wishlist.update_item_to_wishlist()
                expect(Wishlist.get_quantity_of_item(1)).toHaveAttribute('value', 10)
            })
        })
    
        describe('Add to cart', () => {
            it('19. should not add any products into shopping cart when unclick on the checkbox', () => {
                Wishlist.add_to_cart_button.click()
                expect(Wishlist.message_when_unsuccessfully_add_to_cart).toHaveText('No products selected to add to cart.')
            })
            it('20. should add any products into shopping cart when click on the checkbox', () => {
                Wishlist.add_item_to_cart(2)
                expect(Wishlist.message_when_empty_wishlist).toHaveText("The wishlist is empty!")
                expect(Wishlist.number_of_item_in_shopping_cart).toHaveText("(3)")
            })
        })
    
        describe('Remove item in the wishlist', () => {
            it('21. should remove item in the wishlist', () => {
                for (var i = 0; i < product_quantity.length; i++) {
                    Wishlist.remove_item_in_wishlist(i)
                }
                expect(Wishlist.number_of_item_in_wishlist).toHaveText('(0)')
                expect(Wishlist.message_when_empty_wishlist).toHaveText("The wishlist is empty!")
            })
        })

        describe('Show exact info in the wishlist URL', () => {
            it('22. should show correctly info of products', () => {
                Wishlist.wishlist_URL.click()
                let total_of_product = 0
                for (var i = 0; i < product_quantity.length; i++) {
                    total_of_product += product_quantity[i]
                }
                expect(Wishlist.number_of_item_in_wishlist).toHaveText('(' + total_of_product + ')')
                assert(Wishlist.wishlist_records.length, product_quantity.length)
                for (var i = 0; i < product_quantity.length; i++) {
                    expect(Wishlist.get_sku_value(i)).toHaveText(products.products[i].sku)
                    expect(Wishlist.get_product_name(i)).toHaveText(products.products[i].name)
                    expect(Wishlist.get_price(i)).toHaveText(money_formatter.usd_format.format(products.products[i].price))
                    expect(Wishlist.get_total_value(i)).toHaveText(money_formatter.usd_format.format(products.products[i].price*product_quantity[i]))
                    expect(Wishlist.get_quantity_of_item(i)).toHaveAttribute('value', product_quantity[i])
                }
            })
        })
    })
    afterEach(() => {
        Wishlist.deleteCookies()
    })
    
})