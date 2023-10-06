const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.switchBackgroundColor = page.locator('span.s__sbzCIpCki6YQQPcAH6cb');
        this.fromInputField = page.locator('input#origin.autocomplete__input');
        this.toInputField = page.locator('input#destination.autocomplete__input');
        this.departureDateField = page.locator('div.trip-duration__field.--departure');
        this.returnDatefield = page.locator('div.trip-duration__field.--return');
        this.calendarDayDateFrom = page.locator('div.calendar__month:nth-child(1) > div.calendar__weeks-body > div> div > div > div.calendar-day__date');
        this.calendarMonthCaptionFrom = 'div:nth-child(1) > div.calendar-caption > div > select';
        this.calendarMonthCaptionTo = page.locator('div:nth-child(2) > div.calendar-caption');
        this.dontNeedReturnTicketButton = page.locator('.div.trip-duration__content-head > button');
        this.passengerAndClassDropdown = page.locator('div.additional-fields');
        this.classRadioOption = page.locator('div.custom-radio__caption');
        this.searchFlightsButton = page.locator('button[data-test-id="form-submit"]');



        this.getStartedLink = page.locator('a', { hasText: 'Get started' });
        this.gettingStartedHeader = page.locator('h1', { hasText: 'Installation' });
        this.pomLink = page.locator('li', {
            hasText: 'Guides',
        }).locator('a', {
            hasText: 'Page Object Model',
        });
        this.tocList = page.locator('article div.markdown ul > li > a');
    }

    async enterFromField(origin) {
        await this.fromInputField.clear();
        await this.fromInputField.fill(origin);
    }

    async enterToField(destination) {
        await this.toInputField.clear();
        await this.toInputField.fill(destination);
    }
    async expandCalendarModal() {
        await this.departureDateField.click();
    }

    async clickSearchFlightsButton() {
        await this.searchFlightsButton.click();
    }
    async selectCalendarDate(fromMonth, date) {
        await this.page.selectOption(this.calendarMonthCaptionFrom, fromMonth);
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

    async getCurrentPassengerValue(position) {
        return await this.page.locator(`div:nth-child(${position}) > div.additional-fields__passenger-control-wrap > span`).innerText();
    }
    async selectPassengerTypeAndAddPassengers(passengerType, numberOfPassengers) {
        switch (passengerType) {
            case 'Adults':
                const currentCountAdults = await this.getCurrentPassengerValue(1);
                for (let i = 1; i <= numberOfPassengers - currentCountAdults; i++) {
                    await this.getplusButtonPosition(1);
                }
                break;
            case 'Children':
                const currentCountChildren = await this.getCurrentPassengerValue(2);
                for (let i = 1; i <= numberOfPassengers - currentCountChildren; i++) {
                    await this.getplusButtonPosition(2);
                }
                break;
            case 'Infants':
                const currentCountInfants = await this.getCurrentPassengerValue(3);
                for (let i = 1; i <= numberOfPassengers - currentCountInfants; i++) {
                    await this.getplusButtonPosition(3);
                }
                break;
            default:
                console.log('No match with any passenger type');
        }
    }


    async goToAviasalesHomePage() {
        await this.page.goto('https://www.aviasales.com/');
        expect(await this.page).toHaveTitle('Cheap Flights, Airline Tickets & Airfares - Find Deals on Flights at Aviasales.com');
    }

    async clickSwitchBackgroundButton() {
        await this.switchBackgroundColor.click();
    }

    async checkNightBackgroundIsEnabled(isEnabled) {
        let mainPage = await this.page.locator('html');
        if (isEnabled) {
            expect(mainPage).toHaveAttribute('class', 'page --home --us --night');
        } else {
            expect(mainPage).toHaveAttribute('class', 'page --home --us');
        }
    }

    async checkValuesOnFilterForm(fromInput) {
        expect(await this.fromInputField.innerText()).toEqual(fromInput)
    }
};