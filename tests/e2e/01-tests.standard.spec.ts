import { HomepageDesktop } from "../pageObjects/homepage.desktop";
import { CareerDesktop } from "../pageObjects/career.desktop";
import { test, expect } from "@playwright/test";

let homepage: HomepageDesktop;
let career: CareerDesktop;

test.describe("homepage", () => {
  test.beforeEach(async ({ page }) => {
    homepage = new HomepageDesktop(page);
    career = new CareerDesktop(page);
    await homepage.visit();
  });

  test("url is correct", async () => {
    expect(homepage.page.url()).toBe(homepage.url);
  });

  test("click on Career navigates to Career page", async () => {
    const navPromise = homepage.page.waitForNavigation({ url: career.url });
    await homepage.header.locatorCareerItem.click();
    await navPromise;

    expect(career.page.url()).toBe(career.url);
  });

  test("youtube video iframe on Career has title", async () => {
    await career.visit();
    expect(await career.locatorVideoFrameTitle.textContent()).not.toHaveLength(
      0
    );
  });

  test("request to GA returns 200 OK", async () => {
    const resPromise = homepage.page.waitForResponse(
      /^https:\/\/www.google-analytics.com.*$/
    );
    await homepage.consentBar.locatorConfirmAllButton.click();
    const response = await resPromise;

    expect(response.status()).toBe(200);
  });

  test("sending correctly filled contact form returns 200 OK", async () => {
    const resPromise = homepage.page.waitForResponse(
      "https://www.tesena.com/en"
    );
    await homepage.contactForm.fillAndSubmit(
      "tester",
      "test@test.cz",
      "+420123456789",
      "test message",
      true
    );
    const response = await resPromise;

    expect(response.status()).toBe(200);
  });
});
