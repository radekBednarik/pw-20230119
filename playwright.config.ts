import { devices, PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  fullyParallel: true,
  workers: process.env.CI ? "50%" : undefined,
  reporter: [
    ["list"],
    ["html", { open: "never", outputFolder: "html-report" }],
  ],
  retries: 1,
  testDir: "tests",
  use: {
    headless: process.env.HEADED ? false : true,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    video: "on-first-retry",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    locale: "cs-CZ",
  },
  projects: [
    {
      name: "desktop chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "desktop firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "desktop safari",
      use: { ...devices["Desktop Safari"] },
    },
  ],
};

export default config;
