import { FileDownload } from "../pageObjects/fileDownload.heroku";
import { FileUpload } from "../pageObjects/fileUpload.heroku";
import { expect, test } from "@playwright/test";

let fileDownload: FileDownload;
let fileUpload: FileUpload;

test.describe("download & upload", () => {
  test.beforeEach(async ({ page }) => {
    fileDownload = new FileDownload(page);
    fileUpload = new FileUpload(page);
  });

  test("file download", async () => {
    await fileDownload.visit();

    const downloadPromise = fileDownload.page.waitForEvent("download");
    await fileDownload.locatorFileLinks.first().click();
    const download = await downloadPromise;

    expect(await download.path()).not.toBeNull();
  });

  test("file upload", async () => {
    await fileUpload.visit();

    await fileUpload.locatorFileInput.setInputFiles(
      "tests/fixtures/testData/testInputs.csv"
    );

    const resPromise = fileUpload.page.waitForResponse(fileUpload.url);
    await fileUpload.locatorUploadButton.click();
    const response = await resPromise;

    expect(response.status()).toBe(200);
  });
});
