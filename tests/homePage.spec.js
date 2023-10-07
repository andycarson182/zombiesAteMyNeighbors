// @ts-check
const { test } = require('@playwright/test');
const { HomePage } = require('../support/page-objects/HomePage');
// @ts-ignore
const { SearchPage } = require('../support/page-objects/SearchPage');
const { chromium } = require('playwright');

test('Verify the user is able to do a ticket search', async ({ page, context }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchPage(page);
  await homePage.goToAviasalesHomePage();
  await homePage.clickSwitchBackgroundButton();
  await homePage.clickOpenBookingInANewTabCheckbox();
  await homePage.checkNightBackgroundIsEnabled(true);
  await homePage.enterFromField('John F. Kennedy International Airport');
  await homePage.enterToField('Berlin');
  await homePage.expandCalendarModal();
  await homePage.selectCalendarDate('2023-11', "30"),
  await homePage.expandPassengetAndClassDropdownMenu();
  await homePage.selectPassengerTypeAndAddPassengers('Adults', 2);
  await homePage.selectPassengerClass('Economy');

  await homePage.clickSearchFlightsButton();
  await searchPage.checkNewSearchPageisOpen()

  await searchPage.checkValuesOnFilterForm(
    "John F. Kennedy International Airport",
    "Berlin",
    'Mon, October 30',
    null,
    '2 passengerseconomy'
  )

});
