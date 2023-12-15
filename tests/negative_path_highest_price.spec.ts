import { test } from '@playwright/test';
import { MercedesBenzLocationPage } from '../pages/mercedesBenzLocationPage';
import { MercedesBenzSearchPage } from '../pages/mercedesBenzSearchPage';

test('Validate Negative Path for Highest Price Enquiry', async ({ page }) => {
  const mercedesBenzShopPage = new MercedesBenzLocationPage(page);
  const mercedesBenzSearchPage = new MercedesBenzSearchPage(page);
  await mercedesBenzShopPage.goto();
  await mercedesBenzShopPage.acceptCookies();
  await mercedesBenzShopPage.fillLocationForm();
  await mercedesBenzSearchPage.clickFilterToggle();
  await mercedesBenzSearchPage.selectPreOwnedCars();
  await mercedesBenzSearchPage.selectFilters();
  await mercedesBenzSearchPage.choseCarWithHighestPrice(page);
});
