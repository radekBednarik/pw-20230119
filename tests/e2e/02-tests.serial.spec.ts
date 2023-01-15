import { HomepageDesktop } from "../pageObjects/homepage.desktop";
import { CareerDesktop } from "../pageObjects/career.desktop";
import { test, expect } from "@playwright/test";

let homepage: HomepageDesktop;
let career: CareerDesktop;

test.describe.configure({ mode: "serial" });

test.describe("homepage", () => {
  test.beforeAll(async ({ browser }) => {
    const page = await browser.newPage();

    homepage = new HomepageDesktop(page);
    career = new CareerDesktop(page);

    await homepage.visit();
  });

  test("url is correct", async () => {
    expect(homepage.page.url()).toBe(homepage.url);
  });

  test("request to GA returns 200 OK", async () => {
    const resPromise = homepage.page.waitForResponse(
      /^https:\/\/www.google-analytics.com.*$/
    );
    await homepage.consentBar.locatorConfirmAllButton.click();
    const response = await resPromise;

    expect(response.status()).toBe(400);
  });

  test("click on Career navigates to Career page", async () => {
    const navPromise = homepage.page.waitForNavigation({ url: career.url });
    await homepage.header.locatorCareerItem.click();
    await navPromise;

    expect(career.page.url()).toBe(career.url);
  });
});
