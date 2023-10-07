const { expect } = require('@playwright/test');
const { HomePage } = require('./HomePage');
const { text } = require('stream/consumers');
const { CommonPageElements } = require('./CommonPageElements');

exports.SearchPage = class SearchPage extends CommonPageElements  {
   
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);
        this.page= page;
        this.currentDepartedCalendarDate = page.locator('[data-test-id="departure-date-input"]');
        this.currentReturnedCalendarDate = page.locator('[data-test-id="return-date-input"]');
        this.currentPassengerAndClassLabel = page.locator('[data-test-id="passengers-field"]');
        this.ticketPriceValue = page.locator('div.ticket-desktop__side-content > div > div.ticket-desktop__price');
        this.showMoreTicketsButton = page.locator ('button.show-more-tickets__button');
        this.loadSpinnerForShowMoreTicketsButton = page.locator(' svg > circle.h__xYftpkyUVALid3ylFA8M');
        this.loadSpinnerForSearchPage = page.locator('svg.spinner__svg');
        this.loadSpinnerForStripes =page.locator('div.loader__stripes');
        this.cheapestWithConvenientLayoverLabel = page.locator('span',{hasText:"Cheapest with a convenient layover"});
    }   


    async displayAllTickets(){
        while(true){
            try{
                await expect(this.loadSpinnerForSearchPage).not.toBeVisible({timeout:20000});
                await expect(this.loadSpinnerForStripes).not.toBeDisabled({timeout:20000});
                await this.page.waitForLoadState("load", {timeout:20000});
                await this.showMoreTicketsButton.isVisible({timeout:20000});
                await this.showMoreTicketsButton.isEnabled({timeout:20000});
                await expect(this.loadSpinnerForShowMoreTicketsButton).not.toBeVisible({timeout:20000});
                await this.showMoreTicketsButton.click({timeout:20000});
                await this.page.waitForLoadState("load", {timeout:20000});
            }catch(error){
                console.log('Button disappeared', error);
                break;
            }
        }

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
        await expect(this.currentPassengerAndClassLabel).toContainText(expectedPassengerAndClass);
    }
    
};