import { expect, test } from "@playwright/test";
import { setupClerkTestingToken, clerk } from "@clerk/testing/playwright";
// import { clearUser } from "../../..src/utils/api";

// require('dotenv').config({ path: '[your env path]\\.env' });
const url = "http://localhost:8000/";
/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(
  "add spoof uid cookie to browser",
  async ({ context, page }) => {
    await page.goto(url);
    await setupClerkTestingToken({
      page,
    });
    await page.goto(url);
    await clerk.loaded({ page });
    const loginButton = page.getByRole("button", { name: "Sign in" });
    await expect(loginButton).toBeVisible();

    // This logs in/out via _Clerk_, not via actual component interaction. But that's OK.
    // (Clerk's Playwright guide has an example of filling the login form itself.)
    await clerk.signIn({
      page,
      signInParams: {
        strategy: "password",
        password: process.env.E2E_CLERK_USER_PASSWORD!,
        identifier: process.env.E2E_CLERK_USER_USERNAME!,
      },
    });
  }
);

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something
 * you put before parts of your test that might take time to run,
 * like any interaction with the page.
 */
test("on page load, i see a login button", async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await expect(page.getByRole('heading', { name: 'WellNest' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'A community platform for' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Is it your first time using' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Already a user?' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
  await expect(page.getByLabel('Login')).toBeVisible();
});

test("on login, can see check in, manage users, and check location buttons", async ({ page }) => {
  await page.getByLabel('Login').click();
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'WellNest Dashboard' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Do you want to report your' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Do you want to add allowed' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Do you want to check on your' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Check In' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Manage Users' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Check Locations' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible();
});

test("on check in page, can see all buttons and text", async ({ page }) => {
  await page.getByLabel('Login').click();
  await page.getByRole('button', { name: 'Check In' }).click();
  await expect(page.getByRole('heading', { name: 'WellNest Check In' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Update check-in by clicking' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Check-In' })).toBeVisible();
  await expect(page.getByText('Last checked in: N/A')).toBeVisible();
  await expect(page.getByText('Location: N/A')).toBeVisible();
  const page1Promise = page.waitForEvent('popup');
  await expect(page.getByRole('button', { name: 'Go Back' })).toBeVisible();
});

// Test to ensure the user can select a dataset from the dropdown and view the data
test("on manage users page, can see all buttons and text", async ({ page }) => {
  await page.getByLabel('Login').click();
  await page.getByRole('button', { name: 'Manage Users' }).click();
  await expect(page.getByRole('heading', { name: 'WellNest Manage Users' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Current Allowed Users' })).toBeVisible();
  await expect(page.getByPlaceholder('Enter email to add user')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add User' })).toBeVisible();
  await page.getByRole('button', { name: 'Add User' }).click();
  await expect(page.getByText('Please enter a valid email')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Go Back' })).toBeVisible();
});

test("on manage users page, can see multiple allowed users after inputting user email", async ({ page }) => {
  await page.getByLabel('Login').click();
  await page.getByRole('button', { name: 'Manage Users' }).click();
  await page.getByPlaceholder('Enter email to add user').click();
  await page.getByPlaceholder('Enter email to add user').fill('jonie@gmail.com');
  await page.getByRole('button', { name: 'Add User' }).click();
  await page.getByPlaceholder('Enter email to add user').click();
  await page.getByPlaceholder('Enter email to add user').fill('abc@gmail.com');
  await page.getByRole('button', { name: 'Add User' }).click();

  await expect(page.getByText('New Userjonie@gmail.com')).toBeVisible();
  await expect(page.getByText('New User').first()).toBeVisible();
  await expect(page.getByText('jonie@gmail.com')).toBeVisible();
  await expect(page.getByText('New Userabc@gmail.com')).toBeVisible();
  await expect(page.getByText('New User').nth(1)).toBeVisible();
  await expect(page.getByText('abc@gmail.com')).toBeVisible();
});

// Test to ensure the user can sign out to the login state
test("on check users location page, can see all buttons and text", async ({ page }) => {
  await page.getByLabel('Login').click();
  await page.getByRole('button', { name: 'Check Locations' }).click();
  await expect(page.getByRole('heading', { name: 'WellNest Check User Locations' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'View Users Location' })).toBeVisible();
  await expect(page.getByText('No allowed users found.')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Go Back' })).toBeVisible();
});