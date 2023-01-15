import { HomepageDesktop } from "../pageObjects/homepage.desktop";
import { readCsv } from "../../lib/io/csv/csv";
import { test, expect } from "@playwright/test";

const testData = readCsv("tests/fixtures/testData/testInputs.csv");

let homepage: HomepageDesktop;

test.describe("homepage", () => {
  test.beforeEach(async ({ page }) => {
    homepage = new HomepageDesktop(page);

    await homepage.visit();
  });

  for (const dataRow of testData) {
    test(`${dataRow.testTitle} - sending correctly filled contact form returns 200 OK`, async () => {
      const resPromise = homepage.page.waitForResponse(
        "https://www.tesena.com/en"
      );
      await homepage.contactForm.fillAndSubmit(
        dataRow.name,
        dataRow.email,
        dataRow.phone,
        dataRow.message,
        true
      );
      const response = await resPromise;

      expect(response.status()).toBe(200);
    });
  }
});
