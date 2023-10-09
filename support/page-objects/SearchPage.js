const { expect } = require('@playwright/test');
const { CommonPageElements } = require('./CommonPageElements');

const { chromium } = require('playwright');
exports.SearchPage = class SearchPage extends CommonPageElements {

    /**
     * @param {import('@playwright/test').Page} page
     */

    async checkNewSearchPageisOpen() {
        //await this.page.waitForLoadState("load", { timeout: 10000 });
        const browser = await chromium.launch();
        const browserPage = await browser.newPage();
        const currentUrl = await this.page.url();
        await expect(currentUrl).toContain('https://www.aviasales.com/search/');
        await expect(this.cheapestLabel).toBeVisible({ timeout: 30000 });
        await browserPage.waitForLoadState('domcontentloaded');
       
    }

    async getPassengerAndClassLabelFormatted() {
        // Select an element with the text you want to retrieve
        const passengerCount = await this.page.locator('div.avia-form__field.--passengers > div > div > div:nth-child(2)')
        const passengerClass = await this.page.locator('div.avia-form__field.--passengers > div > div > div:nth-child(3)')
        // Get the text content of the selected element
        const passengerCountLabel = await passengerCount.textContent();
        const passengerClassLabel = await passengerClass.textContent()
        //Join the parts with a space in between
        const resultString = `${passengerCountLabel} ${passengerClassLabel}`
        return resultString
    }

    async checkValuesOnFilterForm(expectedFromInputValue, expectedToInputValue, expectedDepartedDate, expectedReturnedDate, expectedPassengerAndClass) {
        await expect(this.originField).toHaveValue(expectedFromInputValue);
        await expect(this.destinationField).toHaveValue(expectedToInputValue);
        await expect(this.departureDateField).toHaveValue(expectedDepartedDate);
        if (expectedReturnedDate == null) {
            await expect(this.returnDateField).toHaveValue('');
        } else {
            await expect(this.returnDateField).toHaveValue(expectedReturnedDate);
        }
        const formattedExpectedPassengerAndClassLabel = await this.getPassengerAndClassLabelFormatted()
           await expect(formattedExpectedPassengerAndClassLabel).toEqual(expectedPassengerAndClass);
    }

};