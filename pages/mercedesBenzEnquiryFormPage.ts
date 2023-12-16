import { faker } from '@faker-js/faker/locale/en_AU';
import { Locator, Page } from '@playwright/test';

export class MercedesBenzEnquiryFromPage {
  readonly page: Page;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly emailField: Locator;
  readonly phoneNumberField: Locator;
  readonly postalCodeField: Locator;
  readonly commentsField: Locator;
  readonly privacyPolicyCheckBox: Locator;
  readonly procceedBtn: Locator;
  readonly mandatoryEmailFieldLabel: Locator;
  readonly errorCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameField = page.getByLabel('First Name');
    this.lastNameField = page.getByLabel('Last Name');
    this.emailField = page.getByLabel('E-Mail');
    this.phoneNumberField = page
      .locator('[data-test-id="rfq-contact__phone"]')
      .getByLabel('Phone');
    this.postalCodeField = page.getByLabel('Postal Code');
    this.commentsField = page.getByLabel('Comments (optional)');
    this.privacyPolicyCheckBox = page
      .locator('label')
      .filter({ hasText: 'I have read and understood' })
      .locator('wb-icon');
    this.procceedBtn = page.locator(
      '[data-test-id="dcp-rfq-contact-button-container__button-next"]',
    );
    this.mandatoryEmailFieldLabel = page.getByText(
      ' Please enter a valid email address using a minimum of six characters. ',
    );
    this.errorCard = page.getByText(
      'An error has occurred.Please check the following sections: Please check the',
    );
  }

  async fillEnquiryForm() {
    const process = require('process');
    const invalidEmail = process.env.INVALID_EMAIL;
    await this.firstNameField.fill(faker.person.firstName());
    await this.lastNameField.fill(faker.person.lastName());
    await this.emailField.fill(invalidEmail);
    await this.phoneNumberField.fill(faker.phone.number());
    await this.postalCodeField.fill(faker.location.zipCode());
    await this.privacyPolicyCheckBox.check();
    await this.procceedBtn.click();
  }
}
