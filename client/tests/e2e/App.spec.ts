import { expect, test } from "@playwright/test";

/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(async ({ page }) => {
  // ... you'd put it here.
  // TODO 5: Is there something we need to do before every test case to avoid repeating code?
  await page.goto("http://localhost:8000/");
});

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */
test("on page load, i see a login button", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  //   await page.goto("http://localhost:8000/"); -- moved to before
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("on page load, i dont see the input box until login", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  //   await page.goto("http://localhost:8000/"); -- moved to before
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("dropdown")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("dropdown")).toBeVisible();
});

test("on page load, i see a submit button", async ({ page }) => {
  // TODO 5 WITH TA: Fill this in!
  await page.getByLabel("Login").click();
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  // await expect(page.getByLabel("submit")).toBeVisible();

});


// Test to ensure the user can select a dataset from the dropdown and view the data
test("choose the 'employeeSalary' dataset, submit, and view the data", async ({ page }) => {
  await page.getByLabel("Login").click();

  await page.getByLabel("dropdown").selectOption({ label: "employeeSalary" });
  await page.getByRole("button", { name: "Submit" }).click();

  // await expect(page.getByLabel("select history")).toBeVisible();

  await expect(page.getByText("firstName")).toBeVisible();
  await expect(page.getByText("lastName")).toBeVisible();
  await expect(page.getByRole("cell", { name: "John", exact: true })).toBeVisible();
  // Check for "Johnson" separately
  await expect(page.getByRole("cell", { name: "Johnson" })).toBeVisible(); //how to deal with the johnson and john? 
  await expect(page.getByText("95000")).toBeVisible();
});

// Test to ensure the user can sign out to the login state
test("sign out and return to initial state", async ({ page }) => {
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();

  await page.getByLabel("Sign Out").click();
  
  await expect(page.getByLabel("Login")).toBeVisible();
  await expect(page.getByLabel("dropdown")).not.toBeVisible();
  await expect(page.getByRole("button", { name: "Submit" })).not.toBeVisible();
});


// Test interactions between different datasets
test("switch between datasets multiple times and view data", async ({ page }) => {
  await page.getByLabel("Login").click();

  await page.getByLabel("dropdown").selectOption({ label: "cityIncome" });
  await page.getByRole("button", { name: "Submit" }).click();
  
  await expect(page.getByText("Springfield")).toBeVisible();
  await expect(page.getByText("Shelbyville")).toBeVisible();
  await expect(page.getByText("medianIncome")).toBeVisible();
  await expect(page.getByText("60000")).toBeVisible();

  await page.getByLabel("dropdown").selectOption({ label: "employeeSalary" });
  await page.getByRole("button", { name: "Submit" }).click();
  
  await expect(page.getByText("firstName")).toBeVisible();
  await expect(page.getByText("lastName")).toBeVisible();
  await expect(page.getByRole("cell", { name: "John", exact: true })).toBeVisible();
  await expect(page.getByRole("cell", { name: "Johnson" })).toBeVisible();
  await expect(page.getByText("95000")).toBeVisible();
  
  await page.getByLabel("dropdown").selectOption({ label: "cityIncome" });
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText("Springfield")).toBeVisible();
  await expect(page.getByText("Shelbyville")).toBeVisible();
  await expect(page.getByText("60000")).toBeVisible();
});

// test interaction
test('test get value and sign out and log in', async ({ page }) => {
  await page.getByLabel('Login').click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByLabel('dropdown').selectOption('inventoryProduct');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByLabel('dropdown').selectOption('retailSales');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByLabel('dropdown').selectOption('cityIncome');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByLabel('Sign Out').click();
  await page.getByLabel('Login').click();
});

// test "after submit the data, there will be a table"
test('after submit the data, there will be a table', async ({ page }) => {
  await page.getByLabel('Login').click();
  await page.getByLabel('dropdown').selectOption('housing');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForSelector('button:has-text("Chart View")');

  await expect(page.getByRole('button', { name: 'Chart View' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Table View' })).toBeVisible();
});

// Test to ensure chart displays after valid X and Y axis selection
test("chart displays after selecting valid X and Y axes", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("dropdown").selectOption("employeeSalary");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("button", { name: "Chart View" }).click();

  await page.getByLabel("Select X Axis").selectOption("firstName");
  await page.getByLabel("Select Y Axis").selectOption("salary");

  await expect(page.locator('.chart-container')).toBeVisible();
});

// Test for table view without chart view selection
test("view table without selecting chart view", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("dropdown").selectOption("studentGrade");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByRole("button", { name: "Table View" }).click();
  await expect(page.getByRole('cell', { name: 'grade' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'firstName' })).toBeVisible();
});

// Test interaction with multiple datasets in chart mode
test("switch between datasets in chart mode", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("dropdown").selectOption("housing");
  await page.getByRole("button", { name: "Submit" }).click();

  await expect(page.getByText('address')).toBeVisible();

  await page.getByRole("button", { name: "Chart View" }).click();

  await page.getByLabel("Select X Axis").selectOption("address");
  await page.getByLabel("Select Y Axis").selectOption("value");
  await expect(page.locator('.chart-container')).toBeVisible();
});


// Test signing in and out multiple times
test("sign in and out multiple times", async ({ page }) => {
  for (let i = 0; i < 3; i++) {
    await page.getByLabel("Login").click();
    await expect(page.getByLabel("Sign Out")).toBeVisible();
    await page.getByLabel("Sign Out").click();
    await expect(page.getByLabel("Login")).toBeVisible();
  }
});

// Test for invalid y axis
test("y axis is not numerical value", async ({ page }) => {
    await page.getByLabel("Login").click();
    await page.getByLabel("dropdown").selectOption("cityIncome");
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByRole("button", { name: "Chart View" }).click();

    await page.getByLabel("Select X Axis").selectOption("city");
    await page.getByLabel("Select Y Axis").selectOption("city");

    await expect(page.getByText("The selected Y Axis must contain numerical data.")).toBeVisible();
});

// test switch between chart and table views multiple times
test("switch between chart and table views multiple times", async ({ page }) => {
  await page.getByLabel("Login").click();
  await page.getByLabel("dropdown").selectOption("housing");
  await page.getByRole("button", { name: "Submit" }).click();

  await page.getByRole("button", { name: "Chart View" }).click();
  await page.getByLabel("Select X Axis").selectOption("address");
  await page.getByLabel("Select Y Axis").selectOption("value");
  await expect(page.locator(".chart-container")).toBeVisible();

  await page.getByRole("button", { name: "Table View" }).click();
  await expect(page.getByRole("cell", { name: "123 Maple St" })).toBeVisible();

  await page.getByRole("button", { name: "Chart View" }).click();
  await expect(page.locator(".chart-container")).toBeVisible();
});