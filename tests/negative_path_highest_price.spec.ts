import { expect, test } from '@playwright/test';
import { MercedesBenzEnquiryFromPage } from '../pages/mercedesBenzEnquiryFormPage';
import { MercedesBenzLocationPage } from '../pages/mercedesBenzLocationPage';
import { MercedesBenzSearchPage } from '../pages/mercedesBenzSearchPage';
import { MercedesBenzVehiclePage } from '../pages/mercedesBenzVehiclePage';

test('Validate Negative Path for Highest Price Enquiry', async ({ page }) => {
  const mercedesBenzShopPage = new MercedesBenzLocationPage(page);
  const mercedesBenzSearchPage = new MercedesBenzSearchPage(page);
  const mercedesBenzVehiclePage = new MercedesBenzVehiclePage(page);
  const mercedesBenzEnquiryFormPage = new MercedesBenzEnquiryFromPage(page);

  await mercedesBenzShopPage.goto();
  await mercedesBenzShopPage.acceptCookies();
  await mercedesBenzShopPage.fillLocationForm();
  await mercedesBenzSearchPage.clickFilterToggle();
  await mercedesBenzSearchPage.selectPreOwnedCars();
  await mercedesBenzSearchPage.selectFilters();
  await mercedesBenzSearchPage.choseCarWithHighestPrice(page);
  await mercedesBenzVehiclePage.saveModelAndVINToFile();
  await mercedesBenzVehiclePage.clickEnquireNow();
  await mercedesBenzEnquiryFormPage.fillEnquiryForm();
  // Assert for the email mandatory field
  await expect(mercedesBenzEnquiryFormPage.mandatoryEmailFieldLabel).toHaveText(
    'Please enter a valid email address using a minimum of six characters.',
  );
  // Assert for the error message card
  await expect(mercedesBenzEnquiryFormPage.errorCard).toHaveText(
    'An error has occurred.Please check the following sections: Please check the data you entered. ',
  );
});
