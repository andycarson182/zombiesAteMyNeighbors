// @ts-check
const { test } = require('@playwright/test');
const { HomePage } = require('../support/page-objects/HomePage');
//const { chromium } = require('playwright');

test('Verify the user is able to do a ticket search', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goToAviasalesHomePage();
  await homePage.clickSwitchBackgroundButton();
  await homePage.checkNightBackgroundIsEnabled(true)
  await homePage.enterFromField('Kennedy airport')
  await homePage.enterToField('Berlin')
  await homePage.expandCalendarModal();
  await homePage.selectCalendarDate('2023-11', "30")
  await homePage.expandPassengetAndClassDropdownMenu();
  await homePage.selectPassengerTypeAndAddPassengers('Adults', 2);
  await homePage.selectPassengerClass('Economy');
  await homePage.clickSearchFlightsButton();

  // let browser = await chromium.launch();
  // let context = await browser.newContext();

  // const allPages = context.pages();
  // const pagePromise = context.waitForEvent('page');

  // const newPage = await pagePromise;
  // await newPage.waitForLoadState();
  // console.log(await newPage.title());


});
