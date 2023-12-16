import { Locator, Page } from '@playwright/test';

export class MercedesBenzSearchPage {
  readonly page: Page;
  readonly filterToggle: Locator;
  readonly preOwnedTab: Locator;
  readonly preOwnedDemonstrator: Locator;
  readonly openColourFilter: Locator;
  readonly colourSelect: Locator;
  readonly colourOfChoice: Locator;
  readonly filterLabel: Locator;
  readonly carPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.filterToggle = page.locator('.filter-toggle');
    this.preOwnedDemonstrator = page
      .locator('[data-test-id="srp"] div')
      .filter({ hasText: 'Pre-Owned Demonstrator' })
      .nth(1);
    this.preOwnedTab = page.getByRole('button', { name: 'Pre-Owned' });
    this.openColourFilter = page.locator('div').filter({ hasText: /^Colour$/ });
    this.colourSelect = page.getByText('Colour 0');
    this.colourOfChoice = page.getByText('BRILLANTBLUE BRILLANTBLUE');
    this.filterLabel = page
      .locator('[data-test-id="dcp-selected-filters-widget-tag"]')
      .getByText('BRILLANTBLUE');
    this.carPrice = page.locator(
      '[data-test-id="dcp-cars-product-tile-price"]',
    );
  }

  async clickFilterToggle() {
    await this.preOwnedDemonstrator.click();
  }

  async selectPreOwnedCars() {
    await this.preOwnedTab.click();
  }

  async selectFilters() {
    await this.openColourFilter.click();
    await this.colourSelect.click();
    await this.colourOfChoice.click();
  }

  async choseCarWithHighestPrice(page: Page) {
    await this.page.waitForTimeout(3000);
    const link = await page.evaluate(() => {
      function getPriceFromHTML(elem) {
        return Number(
          elem
            .querySelector('.dcp-cars-product-tile-price')
            .firstChild.innerHTML.substring(3)
            .replace(',', ''),
        );
      }
      const cars = document.querySelectorAll('.dcp-cars-product-tile');
      const carsArray = Array.from(cars);
      const mostExpensiveCar = carsArray.sort(
        (a, b) => getPriceFromHTML(b) - getPriceFromHTML(a),
      )[0];
      return (
        mostExpensiveCar.querySelector(
          '.dcp-cars-product-tile__link',
        ) as HTMLAnchorElement
      )?.href;
    });
    await this.page.goto(link);
  }
}
