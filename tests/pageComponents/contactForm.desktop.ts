import { BasePage } from "../pageObjects/basePage";
import type { Locator, Page } from "@playwright/test";
import formResponse from "../fixtures/mocks/contactForm.responseBody.json";

export class ContactFormDesktop extends BasePage {
  public readonly locatorInputName: Locator;
  public readonly locatorInputEmail: Locator;
  public readonly locatorInputPhone: Locator;
  public readonly locatorMessageTextarea: Locator;
  public readonly locatorCheckboxConsent: Locator;
  public readonly locatorSubmitButton: Locator;

  constructor(page: Page) {
    super(page);

    this.locatorInputName = this.page.locator("#field-name");
    this.locatorInputEmail = this.page.locator("#field-email");
    this.locatorInputPhone = this.page.locator("#field-phone");
    this.locatorMessageTextarea = this.page.locator(
      "div[id *= 'help-you'] textarea"
    );
    this.locatorCheckboxConsent = this.page.locator(
      "div[class *= 'agreement']"
    );
    this.locatorSubmitButton = this.page.locator("button[value='submit']");
  }

  public async fillAndSubmit(
    name: string,
    email: string,
    phone: string,
    message: string,
    fake = true
  ) {
    if (fake) {
      await this.page.route("https://www.tesena.com/en", (route) => {
        route.fulfill({
          status: 200,
          body: JSON.stringify(formResponse),
        });
      });
    }

    await this.locatorInputName.fill(name);
    await this.locatorInputEmail.fill(email);
    await this.locatorInputPhone.fill(phone);
    await this.locatorMessageTextarea.fill(message);
    await this.locatorCheckboxConsent.click();
    await this.locatorSubmitButton.click();
  }
}
