import { BasePage } from "./basePage";
import type { FrameLocator, Locator, Page } from "@playwright/test";

export class CareerDesktop extends BasePage {
  public readonly url: string;
  public readonly locatorVideoIframe: FrameLocator;
  public readonly locatorVideoFrameTitle: Locator;

  constructor(page: Page) {
    super(page);

    this.url = "https://www.tesena.com/en/career";
    this.locatorVideoIframe = this.page.frameLocator("iframe");
    this.locatorVideoFrameTitle = this.locatorVideoIframe.locator("title");
  }
}
