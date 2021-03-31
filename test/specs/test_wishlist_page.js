const Wishlist = require('../nop-page-objects/wishlist.page')
const parameter = require('../data/parameter')
const products = require('../data/products')
const money_formatter = require('../formatters/money.formatter')
const assert = require('assert')

const product_quantity = [4, 1]

describe('Test the wishlist', () => {
    before(() => {
        Wishlist.open()
        Wishlist.setFrame()
    })

    describe('Check status of the wishlist', () => {
        it('15. should be empty when wishlist has no item', () => {
            Wishlist.wishlist_tab.click()
            expect(Wishlist.number_of_item_in_wishlist).toHaveText('(0)')
            expect(Wishlist.message_when_empty_wishlist).toHaveText("The wishlist is empty!")
        })
    })

    describe.only('Add products to wishlist', () => {
        it.only('16. should products are showed correctly in wishlist', () => {
            Wishlist.add_item_to_wishlist(products.products[0].name)
            expect(Wishlist.wishlist_notification_message).toHaveText("The product has been added to your wishlist")
            Wishlist.wishlist_notification_close_icon.click()
            Wishlist.wishlist_tab.click()
            console.log("uyen1:" + JSON.stringify(Wishlist.wishlist_records))
            expect(Wishlist.number_of_item_in_wishlist).toHaveText('(2)')
            expect(Wishlist.get_sku_value(0)).toHaveText(products.products[0].sku)
            expect(Wishlist.get_product_name(0)).toHaveText(products.products[0].name)
            expect(Wishlist.get_price(0)).toHaveText(money_formatter.usd_format.format(products.products[0].price))
            expect(Wishlist.get_total_value(0)).toHaveText(money_formatter.usd_format.format(products.products[0].price*2))
            expect(Wishlist.get_quantity_of_item(0)).toHaveAttribute('value','2')
        })

    })

    describe('Add same products to wishlist', () => {
        it('17. should products are showed correctly in wishlist', () => {
            Wishlist.add_item_to_wishlist(products.products[0].name)
            expect(Wishlist.wishlist_notification_message).toHaveText("The product has been added to your wishlist")
            Wishlist.wishlist_notification_close_icon.click()
            Wishlist.open_wishlist_page()
            expect(Wishlist.number_of_item_in_wishlist).toHaveText('(' + product_quantity[0] + ')')
            expect(Wishlist.get_sku_value(0)).toHaveText(products.products[0].sku)
            expect(Wishlist.get_product_name(0)).toHaveText(products.products[0].name)
            expect(Wishlist.get_price(0)).toHaveText(money_formatter.usd_format.format(products.products[0].price))
            expect(Wishlist.get_total_value(0)).toHaveText(money_formatter.usd_format.format(products.products[0].price*product_quantity[0]))
            expect(Wishlist.get_quantity_of_item(0)).toHaveAttribute('value', product_quantity[0])
        })
    })

    describe('Add different products to wishlist', () => {
        it('18. should new products are showed correctly in wishlist', () => {
            Wishlist.add_item_to_wishlist(products.products[1].name)
            expect(Wishlist.wishlist_notification_message).toHaveText("The product has been added to your wishlist")
            Wishlist.wishlist_notification_close_icon.click()
            Wishlist.open_wishlist_page()
            let number_of_product = product_quantity.reduce((a,b) => {
                a + b
            })
            expect(Wishlist.number_of_item_in_wishlist).toHaveText('(' + number_of_product.toString() + ')')
            assert(Wishlist.wishlist_records.length, product_quantity.length)
            for (var i = 0; i < product_quantity.length; i++) {
                expect(Wishlist.get_sku_value(i)).toHaveText(products.products[i].sku_value)
                expect(Wishlist.get_product_name(i)).toHaveText(products.products[i].name)
                expect(Wishlist.get_price(i)).toHaveText(money_formatter.usd_format.format(products.products[i].price))
                expect(Wishlist.get_total_value(i)).toHaveText(money_formatter.usd_format.format(products.products[i].price*product_quantity[i]))
                expect(Wishlist.get_quantity_of_item(i)).toHaveAttribute('value', product_quantity[i])
            }
        })
    })

    describe('Remove item in the wishlist', () => {
        it('19. should remove item in the wishlist', () => {
            Wishlist.wishlist_tab.click()
            for (var i = 1; i < product_quantity.length; i++) {
                Wishlist.remove_item_in_wishlist(i)
            }
            expect(Wishlist.number_of_item_in_wishlist).toHaveText('(0)')
            expect(Wishlist.message_when_empty_wishlist).toHaveText("The wishlist is empty!")
        })
    })
})