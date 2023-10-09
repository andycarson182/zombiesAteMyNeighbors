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
      await commonPageElements.checkNightBackgroundIsEnabled(true);
      await homePage.fillOriginField('Kennedy int');
      await homePage.fillDestinationField('Berlin');
      await homePage.selectCalendarDate('November', "30");
      await homePage.clickIDontNeedReturnTicketButton();
      await homePage.selectPassengerTypeAndAddPassengers('Adults', 2);
      await commonPageElements.clickSearchFlightsButton();
      await searchPage.checkNewSearchPageisOpen();
      await commonPageElements.checkNightBackgroundIsEnabled(true);
      await searchPage.checkValuesOnFilterForm(
        "John F. Kennedy International Airport",
        "Berlin",
        'Mon, October 30',
        null,
        '2 passengers economy'
      );
    });
  });
