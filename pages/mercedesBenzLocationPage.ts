import { type Locator, type Page } from '@playwright/test';

export class MercedesBenzLocationPage {
  readonly page: Page;
  readonly acceptCookiesBtn: Locator;
  readonly stateSelect: Locator;
  readonly postalCodeField: Locator;
  readonly privateRadioBtn: Locator;
  readonly continueBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesBtn = page.getByRole('button', { name: 'Agree to all' });
    this.stateSelect = page.getByLabel('* Your state');
    this.postalCodeField = page
      .locator('[data-test-id="modal-popup__location"]')
      .getByLabel('', { exact: true });
    this.privateRadioBtn = page
      .locator('label')
      .filter({ hasText: 'Private' })
      .locator('div');
    this.continueBtn = page.locator(
      '[data-test-id="state-selected-modal__close"]',
    );
  }

  async goto() {
    const process = require('process');
    const url = process.env.MERCEDES_URL;

    await this.page.goto(url);
  }

  async acceptCookies() {
    await this.acceptCookiesBtn.click();
  }

  async fillLocationForm() {
    const postalCode = '2007';

    await this.stateSelect.selectOption('New South Wales');
    await this.postalCodeField.fill(postalCode);
    await this.privateRadioBtn.click();
    await this.continueBtn.click();
  }
}
