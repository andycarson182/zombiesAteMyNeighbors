const { expect } = require('@playwright/test');

exports.CommonPageElements = class CommonPageElements {

    constructor(page) {
        this.page= page;
        this.switchBackgroundColor = page.locator('span.s__sbzCIpCki6YQQPcAH6cb');
        this.originField = page.locator('input#origin.autocomplete__input');
        this.destinationField = page.locator('input#destination.autocomplete__input');
        this.departureDateField = page.locator(' [data-test-id="departure-date-input"]');
        this.returnDateField = page.locator('[data-test-id="return-date-input"]');
        this.passengerAndClassLabel = page.locator('div.avia-form__field.--passengers > div > div > div.additional-fields__label');
        this.autocompleteSuggestion = page.locator ('.autocomplete__suggestion-info');
        this.searchFlightsButton = page.locator('button[type="submit"]');
        this.cheapestLabel = page.locator('div:nth-child(3) > div > div > strong > span[data-test-id="text"]:nth-child(1)');
    }

    async clickSwitchBackgroundButton() {
        await this.switchBackgroundColor.click();
    }

    async clickSearchFlightsButton() {
        await this.searchFlightsButton.click();
    }

    async checkNightBackgroundIsEnabled(isEnabled) {
        const mainPage = await this.page.locator('html');
        const attributeValue = await mainPage.getAttribute('class');

        if (isEnabled) {
            expect(attributeValue).toContain('--night');
        } else {
            expect(attributeValue).not.toContain('--night');
        }
    }
};