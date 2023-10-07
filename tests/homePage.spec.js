// @ts-check
const { test } = require('@playwright/test');
const { HomePage } = require('../support/page-objects/HomePage');
const { CommonPageElements } = require('../support/page-objects/CommonPageElements');
// @ts-ignore
const { SearchPage } = require('../support/page-objects/SearchPage');

test.describe('Test the Aviasales ticket search functionality', () => {

  test('Verify the user is able to do a ticket search', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    const commonPageElements = new CommonPageElements(page);
    await homePage.goToAviasalesHomePage();
    await commonPageElements.clickSwitchBackgroundButton();
    await homePage.clickOpenBookingInANewTabCheckbox();
    await homePage.checkNightBackgroundIsEnabled(true);
    await homePage.enterFromField('John F. Kennedy International Airport');
    await homePage.enterToField('Berlin');
    await homePage.selectCalendarDate('2023-10',"30");
    await homePage.selectPassengerTypeAndAddPassengers('Adults', 2);
    await commonPageElements.clickSearchFlightsButton();
    await searchPage.checkNewSearchPageisOpen();
    await searchPage.checkValuesOnFilterForm(
      "John F. Kennedy International Airport",
      "Berlin",
      'Mon, October 30',
      null,
      '2 passengerseconomy'
    );
  })

  test.skip('Verify the Aviasales is searching the cheapest flight ticket', async ({ page }) => {
    const homePage = new HomePage(page);
    const searchPage = new SearchPage(page);
    const commonPageElements = new CommonPageElements(page);
    await homePage.goToAviasalesHomePage();
    await homePage.clickOpenBookingInANewTabCheckbox();
    await homePage.checkNightBackgroundIsEnabled(false);
    await homePage.enterFromField('John F. Kennedy International Airport');
    await homePage.enterToField('Berlin');
    await homePage.selectCalendarDate('2023-11', "30");
    await homePage.clickIDontNeedReturnTicketButton()
    await homePage.selectPassengerTypeAndAddPassengers('Adults', 2);
    await homePage.selectPassengerClass('Economy');
    await commonPageElements.clickSearchFlightsButton();
    await searchPage.checkNewSearchPageisOpen();
    await searchPage.displayAllTickets();
  })



});
