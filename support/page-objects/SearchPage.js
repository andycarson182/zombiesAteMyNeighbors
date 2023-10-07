const { expect } = require('@playwright/test');
const { HomePage } = require('./HomePage');

exports.SearchPage = class SearchPage  {
   
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.fromInputField = page.locator('input#origin.autocomplete__input');
        this.toInputField = page.locator('input#destination.autocomplete__input');
        this.currentDepartedCalendarDate = page.locator('[data-test-id="departure-date-input"]');
        this.currentReturnedCalendarDate = page.locator('[data-test-id="return-date-input"]');
        this.currentPassengerAndClassLabel = page.locator('[data-test-id="passengers-field"]');
    }

    async checkNewSearchPageisOpen(){
        await this.page.waitForLoadState("load", {timeout:10000});
        (await this.page.title()).match('New York → Berlin, 30.10.23 - Aviasales.com')
    }
    
    async checkValuesOnFilterForm(expectedFromInputValue, expectedToInputValue, expectedDepartedDate, expectedReturnedDate, expectedPassengerAndClass) {
        await expect(this.fromInputField).toHaveValue(expectedFromInputValue);
        await expect(this.toInputField).toHaveValue(expectedToInputValue);
        await expect(this.currentDepartedCalendarDate).toHaveValue(expectedDepartedDate);
        if (expectedReturnedDate == null) {
            await expect(this.currentReturnedCalendarDate).toHaveValue('');
        } else {
            await expect(this.currentReturnedCalendarDate).toHaveValue(expectedReturnedDate);
        }
        await expect(this.currentPassengerAndClassLabel).toContainText(expectedPassengerAndClass)
    }
    
};