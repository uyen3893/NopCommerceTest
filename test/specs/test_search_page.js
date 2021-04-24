const Search = require('../nop-page-objects/search.page')
const parameter = require('../data/parameter')
const assert = require('assert')
const products = require('../data/products')

describe('Search engine', () => {
    before(() => {
        Search.open()
        Search.setFrame()
    })

    describe('Input valid keyword', () => {
        it('12. should show two apple\'s products', () => {
            Search.search(parameter.search_keyword)
            assert.strictEqual(Search.list_of_products.length, 2)
            expect(Search.get_title_of_product(0)).toHaveText(products.products[0].name)
            expect(Search.get_title_of_product(1)).toHaveText(products.products[2].name)
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