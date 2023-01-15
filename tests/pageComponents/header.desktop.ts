import { BasePage } from "../pageObjects/basePage";
import type { Locator, Page } from "@playwright/test";

export class HeaderDesktop extends BasePage {
  public readonly locatorCareerItem: Locator;

  constructor(page: Page) {
    super(page);

    this.locatorCareerItem = this.page.getByText("Career");
  }
}
