const Search = require('../nop-page-objects/search.engine')
const parameter = require('./parameter')
const assert = require('assert')

describe('Search engine', () => {
    before(() => {
        Search.open()
        Search.setFrame()
    })

    describe('Input valid keyword', () => {
        it('12. should show two apple\'s products', () => {
            Search.search('apple')
            assert.strictEqual(Search.list_of_products.length, 2)
            expect(Search.get_title_of_product(0)).toHaveText('Apple MacBook Pro 13-inch')
            expect(Search.get_title_of_product(1)).toHaveText('Apple iCam')
        })
    })

    describe('Input invalid keyword', () => {
        it('13. should return error message when inputting wrong keyword', () => {
            Search.search('jkhkakd')
            expect(Search.error_message).toHaveText('No products were found that matched your criteria.')
        })

        it('14. should return error message when inputting a keyword that is less than 3 characters', () => {
            Search.search('ab')
            expect(Search.error_message).toHaveText('Search term minimum length is 3 characters')
        })
    })

    afterEach(() => {
        Search.clear_keyword()
    })
})