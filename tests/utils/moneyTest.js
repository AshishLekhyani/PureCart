import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suit: formatCurrency', () => {
    it('converts cents into dollar', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    describe('rounds up to the nearest cent', () => {
        it('case1: greater then equal to 0.5', () => {
            expect(formatCurrency(2000.5)).toEqual('20.01');
        });

        it('case2:less then 0.5', () => {
            expect(formatCurrency(2000.4)).toEqual('20.00');
        });
    });

    it('works with negative values', () => {
        expect(formatCurrency(-1090)).toEqual('-10.90');
    });
});