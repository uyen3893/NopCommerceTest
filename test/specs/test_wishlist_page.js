const Wishlist = require('../nop-page-objects/wishlist.page')
const parameter = require('./parameter')

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

    describe('Add more item in the wishlist', () => {
        it('16. should add item in the wishlist', () => {
            Wishlist.add_item_in_wishlist()
            expect(Wishlist.wishlist_notification_message).toHaveText("The product has been added to your wishlist")
            Wishlist.wishlist_notification_close_icon.click()
            Wishlist.open_wishlist_page()
            expect(Wishlist.number_of_item_in_wishlist).toHaveText('(2)')
            console.log('uyen' + JSON.stringify(Wishlist.quantity_of_item))
            expect(Wishlist.quantity_of_item).toHaveAttribute('value','2')
        })

        it('17. should add more item in the wishlist', () => {
            Wishlist.add_item_in_wishlist()
            expect(Wishlist.wishlist_notification_message).toHaveText("The product has been added to your wishlist")
            Wishlist.wishlist_notification_close_icon.click()
            Wishlist.open_wishlist_page()
            expect(Wishlist.number_of_item_in_wishlist).toHaveText('(4)')
            console.log('uyen' + JSON.stringify(Wishlist.quantity_of_item))
            expect(Wishlist.quantity_of_item).toHaveAttribute('value','4')
        })
    })

    describe('Remove item in the wishlist', () => {
        it('18. should remove item in the wishlist', () => {
            Wishlist.remove_item_in_wishlist()
            expect(Wishlist.number_of_item_in_wishlist).toHaveText('(0)')
            expect(Wishlist.message_when_empty_wishlist).toHaveText("The wishlist is empty!")
        })
    })
})