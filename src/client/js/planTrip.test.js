// Test suite to check the function for date validity
import { isValidDate } from './date';

describe("Date function", () => {
	test("checks for validity of date", () => {
		expect(isValidDate('22/10/2020')).toEqual(true);
		expect(isValidDate('22/13/2020')).toEqual(false);
		expect(isValidDate('32/02/2010')).toEqual(false);
		expect(isValidDate('08/07/2022')).toEqual(true);
	});
});
