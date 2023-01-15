import { BasePage } from "../pageObjects/basePage";
import type { Locator, Page } from "@playwright/test";

export class ConsentBarDesktop extends BasePage {
  public readonly locatorConfirmAllButton: Locator;

  constructor(page: Page) {
    super(page);

    this.locatorConfirmAllButton = this.page.locator(
      "button[class *= 'confirm-all']"
    );
  }
}
