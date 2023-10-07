const { expect } = require('@playwright/test');

exports.CommonPageElements = class CommonPageElements {

    constructor(page) {
        this.page= page;
        this.switchBackgroundColor = page.locator('span.s__sbzCIpCki6YQQPcAH6cb');
        this.fromInputField = page.locator('input#origin.autocomplete__input');
        this.toInputField = page.locator('input#destination.autocomplete__input');
        this.searchFlightsButton = page.locator('button[type="submit"]');
    }

    async clickSwitchBackgroundButton() {
        await this.switchBackgroundColor.click();
    }

    async clickSearchFlightsButton() {
        await this.searchFlightsButton.click();
    }
    
};