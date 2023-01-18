import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class FileDownload extends BasePage {
  public readonly url: string;
  public readonly locatorFileLinks: Locator;

  constructor(page: Page) {
    super(page);

    this.url = "https://the-internet.herokuapp.com/download";
    this.locatorFileLinks = this.page.locator("#content a");
  }

  public async visit() {
    return await super.visit(this.url);
  }
}
