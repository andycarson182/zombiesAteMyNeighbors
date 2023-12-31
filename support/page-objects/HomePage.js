const { expect } = require('@playwright/test');
const { CommonPageElements } = require('./CommonPageElements');

const uiProcessingDelay = 5000;
exports.HomePage = class HomePage extends CommonPageElements {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        super(page);
        this.calendarDayDateFrom = page.locator('div:nth-child(1) > div.calendar__weeks-body > div > div > div > div > div.calendar-day__date');
        this.calendarMonthCaptionFrom = page.locator('div:nth-child(1) > div.calendar-caption > div > select');
        this.calendarMonthCaptionTo = page.locator('div:nth-child(2) > div.calendar-caption > div > select');
        this.dontNeedReturnTicketButton = page.locator('button.trip-duration__cancel-departure');
        this.passengerAndClassDropdown = page.locator('div.additional-fields');
        this.classRadioOption = page.locator('div.custom-radio__caption');
        this.openBookinginANewTabCheckbox = page.locator('label.of_input_checkbox__label');
    }

    async clickOpenBookingInANewTabCheckbox() {
        await this.openBookinginANewTabCheckbox.click()
    }

    async clickIDontNeedReturnTicketButton() {
        await this.dontNeedReturnTicketButton.click()
    }

    async fillOriginField(origin) {
        //This make sure if there is any pre default info is cleared and just fill the field with the new data
        await this.originField.press("Meta+A");
        await this.originField.press("Backspace");
        await this.originField.fill(origin);
        await this.autocompleteSuggestion.first().click();
    }

    async fillDestinationField(destination) {
        //This make sure if there is any pre default info is cleared and just fill the field with the new data
        await this.destinationField.press("Meta+A");
        await this.destinationField.press("Backspace");
        await this.destinationField.fill(destination);
        await this.autocompleteSuggestion.first().click();
    }

    async expandCalendarModal() {
        await this.departureDateField.click();
    }


    async selectCalendarDate(fromMonth, date) {
        await this.page.route('/date_Picker_prices?*', (route) => {
            route.fulfill({
                status: 200,
                contentType: 'application/json'
            });
        });
        await this.page.selectOption('div:nth-child(1) > div.calendar-caption > div > select', fromMonth);
        await this.calendarDayDateFrom.getByText(date).click();

    }

    async expandPassengetAndClassDropdownMenu() {
        await this.passengerAndClassDropdown.click();
    }
    async selectPassengerClass(option) {
        await this.classRadioOption.getByText(option, { exact: true }).click()
    }

    async getplusButtonPosition(position) {
        return await this.page.locator(`div:nth-child(${position}) > div.additional-fields__passenger-control-wrap > div:nth-child(3)`).click();
    }

    async getDecrementButtonPosition(position) {
        return await this.page.locator(`div:nth-child(${position}) > div.additional-fields__passenger-control-wrap > div:nth-child(1)`)
    }
    async getCurrentPassengerValue(position) {
        return await this.page.locator(`div:nth-child(${position}) > div.additional-fields__passenger-control-wrap > span`).innerText();
    }
    async selectPassengerTypeAndAddPassengers(passengerType, numberOfPassengers) {
        await this.expandPassengetAndClassDropdownMenu();
        switch (passengerType) {
            case 'Adults':
                // this current count makes sure if there is any default number pre set up, start to count from the current passenger value for each passenger Type
                const currentCountAdults = await this.getCurrentPassengerValue(1);
                for (let i = 1; i <= numberOfPassengers - currentCountAdults; i++) {
                    await this.getplusButtonPosition(1);
                }
                break;
            case 'Children':
                // this current count makes sure if there is any default number pre set up, start to count from the current passenger value for each passenger Type
                const currentCountChildren = await this.getCurrentPassengerValue(2);
                for (let i = 1; i <= numberOfPassengers - currentCountChildren; i++) {
                    await this.getplusButtonPosition(2);
                }
                break;
            case 'Infants':
                // this current count makes sure if there is any default number pre set up, start to count from the current passenger value for each passenger Type
                const currentCountInfants = await this.getCurrentPassengerValue(3);
                for (let i = 1; i <= numberOfPassengers - currentCountInfants; i++) {
                    await this.getplusButtonPosition(3);
                }
                break;
            default:
                console.log('No match with any passenger type');
        }
        await this.expandPassengetAndClassDropdownMenu();
    }


    async goToAviasalesHomePage() {
        await this.page.goto('https://www.aviasales.com/');
        await expect(this.page).toHaveTitle('Cheap Flights, Airline Tickets & Airfares - Find Deals on Flights at Aviasales.com');
    }

};