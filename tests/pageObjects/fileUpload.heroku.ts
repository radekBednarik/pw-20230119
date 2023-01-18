import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class FileUpload extends BasePage {
  public readonly url: string;
  public readonly locatorFileInput: Locator;
  public readonly locatorUploadButton: Locator;

  constructor(page: Page) {
    super(page);

    this.url = "https://the-internet.herokuapp.com/upload";
    this.locatorFileInput = this.page.locator("#file-upload");
    this.locatorUploadButton = this.page.locator("#file-submit");
  }

  public async visit() {
    return await super.visit(this.url);
  }
}
