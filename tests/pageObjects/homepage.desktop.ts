import { BasePage } from "./basePage";
import { HeaderDesktop } from "../pageComponents/header.desktop";
import { ConsentBarDesktop } from "../pageComponents/consentBar.desktop";
import { ContactFormDesktop } from "../pageComponents/contactForm.desktop";
import type { Page } from "@playwright/test";

export class HomepageDesktop extends BasePage {
  public readonly url: string;
  public readonly header: HeaderDesktop;
  public readonly consentBar: ConsentBarDesktop;
  public readonly contactForm: ContactFormDesktop;

  constructor(page: Page) {
    super(page);

    //composition!
    this.header = new HeaderDesktop(page);
    this.consentBar = new ConsentBarDesktop(page);
    this.contactForm = new ContactFormDesktop(page);
    this.url = "https://www.tesena.com/en";
  }

  public async visit() {
    return await super.visit(this.url);
  }
}
