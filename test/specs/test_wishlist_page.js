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

    describe('Wishlist', () => {
        it('15. should be empty when wishlist has no item', () => {
            Wishlist.wishlist_tab.click()
            expect(Wishlist.number_of_item_in_wishlist).toHaveText('(0)')
            expect(Wishlist.message_when_empty_wishlist).toHaveText("The wishlist is empty!")
        })
    })
    describe('Add/Remove/Update', () => {
        beforeEach( () => {
            product_quantity = [0, 0];
            Wishlist.add_item_to_wishlist(products.products[0].name)
            product_quantity[0]++
            Wishlist.add_item_to_wishlist(products.products[1].name)
            product_quantity[1] +=2
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
                let total_of_product = product_quantity.reduce((a,b) => {return a+b})
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
    
        describe('Click update button', () => {
            it('18. should change the quantity of products when the quantity of products have been changed', () => {
                console.log('old_array: ' + product_quantity)
                Wishlist.update_item_to_wishlist(1)
                expect(Wishlist.get_quantity_of_item(1)).toHaveAttribute('value', 10)
            })
        })
    
        describe('Click add to cart button', () => {
            it('19. should not add any products into shopping cart when no product have been checked', () => {
                Wishlist.add_to_cart_button.click()
                expect(Wishlist.message_when_unsuccessfully_add_to_cart).toHaveText('No products selected to add to cart.')
                expect(Wishlist.number_of_item_in_shopping_cart).toHaveText("(0)")
            })
            it('20. should add checked products into shopping cart', () => {
                let item_indexes = []
                for(var i = 0; i < product_quantity.length; i++) {
                    item_indexes.push(i)
                }
                Wishlist.add_items_to_cart(item_indexes)
                Wishlist.wishlist_tab.click()
                expect(Wishlist.message_when_empty_wishlist).toHaveText("The wishlist is empty!")
                expect(Wishlist.number_of_item_in_shopping_cart).toHaveText("(3)")
            })
        })
    
        describe('Click remove button', () => {
            it('21. should remove item in the wishlist', () => {
                for (var i = 0; i < product_quantity.length; i++) {
                    Wishlist.remove_item_in_wishlist(i)
                }
                expect(Wishlist.number_of_item_in_wishlist).toHaveText('(0)')
                expect(Wishlist.message_when_empty_wishlist).toHaveText("The wishlist is empty!")
            })
        })

        describe('Wishlist URL', () => {
            it('22. should show correctly info of products', () => {
                Wishlist.wishlist_URL.click()
                let total_of_product = product_quantity.reduce((a,b) => {return a+b})
                expect(Wishlist.number_of_item_in_wishlist).toHaveText('(' + total_of_product + ')')
                assert(Wishlist.wishlist_records.length, product_quantity.length)
                for (var i = 0; i < product_quantity.length; i++) {
                    expect(Wishlist.get_sku_value(i)).toHaveText(products.products[i].sku)
                    expect(Wishlist.get_product_name(i)).toHaveText(products.products[i].name)
                    expect(Wishlist.get_price(i)).toHaveText(money_formatter.usd_format.format(products.products[i].price))
                    expect(Wishlist.get_total_value(i)).toHaveText(money_formatter.usd_format.format(products.products[i].price*product_quantity[i]))
                    expect(Wishlist.get_quantity_of_item_in_Wishlist_URL(i)).toHaveText('' + product_quantity[i] + '')
                }
            })
        })
    })
    afterEach(() => {
        Wishlist.deleteCookies()
    })
    
})