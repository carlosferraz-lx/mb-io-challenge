import { Locator, Page } from '@playwright/test';
import fs from 'fs';

export class MercedesBenzVehiclePage {
  readonly page: Page;
  readonly modelYear: Locator;
  readonly vin: Locator;
  readonly enquireNowBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.modelYear = page.locator(
      '#app > div.dcp-shop > main > div > div.dcp-pdp > div.dcp-pdp__content-switch.dcp-pdp-content-switch > div > div > div > div > div > ul > li:nth-child(3) > span.dcp-vehicle-details-list-item__value',
    );
    this.vin = page.locator(
      '#app > div.dcp-shop > main > div > div.dcp-pdp > div.dcp-pdp__content-switch.dcp-pdp-content-switch > div > div > div > div > div > ul > li:nth-child(11) > span.dcp-vehicle-details-list-item__value',
    );
    this.enquireNowBtn = page.locator(
      '[data-test-id="dcp-buy-box__contact-seller"]',
    );
  }

  async saveModelAndVINToFile() {
    const modelYear: string = await this.modelYear.innerText();
    const vin: string = await this.vin.innerText();

    const jsonData: { modelYear: string; vin: string } = { modelYear, vin };
    const jsonStr: string = JSON.stringify(jsonData);

    await fs.writeFileSync('page-data.json', jsonStr);
  }

  async clickEnquireNow() {
    await this.enquireNowBtn.click();
  }
}
