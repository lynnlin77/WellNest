import { test, expect } from '@playwright/test';
import { clerkSetup, setupClerkTestingToken } from '@clerk/testing/playwright';
import dotenv from 'dotenv';


dotenv.config(); // Load environment variables from .env file

const url = 'http://localhost:8000'; // Replace with your app's URL

// Set up Clerk globally
test.beforeAll(async () => {
  clerkSetup({
    frontendApi: process.env.VITE_CLERK_PUBLISHABLE_KEY, // Use Clerk Publishable Key
  });
});

test.describe('App End-to-End Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up Clerk Testing Token for each test
    await setupClerkTestingToken({ page });

    // Navigate to the application
    await page.goto(url);
  });

  test('should display the home page correctly', async ({ page }) => {
    // Check for some element or text on the home page
    await expect(page.locator('text=Welcome')).toBeVisible(); // Adjust this selector based on your app
  });
});

test('loginpage test', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByRole('heading', { name: 'WellNest' }).click();
  await page.getByRole('heading', { name: 'Welcome to Senior Safety Check' }).click();
  await page.getByRole('heading', { name: 'A community platform for' }).click();
  await page.getByRole('heading', { name: 'Is it your first time using' }).click();
  await page.getByText('Already a user?Sign in').click();
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByPlaceholder('Enter your email address').click();
  await page.getByPlaceholder('Enter your email address').fill('notreal@example.com');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByPlaceholder('Enter your password').fill('notrealnotreal');
  await page.getByRole('button', { name: 'Continue' }).click();
});


test('log in and check in', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByPlaceholder('Enter your email address').click();
  await page.getByPlaceholder('Enter your email address').fill('notreal@example.com');
  await page.getByPlaceholder('Enter your email address').press('Enter');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByPlaceholder('Enter your password').click();
  await page.getByPlaceholder('Enter your password').fill('notrealnotreal');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel('Login').click();
  await page.getByRole('heading', { name: 'WellNest Dashboard' }).click();
  await page.getByRole('heading', { name: 'Do you want to report your' }).click();
  await page.getByRole('heading', { name: 'Do you want to add allowed' }).click();
  await page.getByRole('heading', { name: 'Do you want to check on your' }).click();
  await page.getByRole('button', { name: 'Check In' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Check-In' }).click();
  await page.getByRole('heading', { name: 'WellNest Check In' }).click();
  await page.getByRole('heading', { name: 'Update check-in by clicking' }).click();
  await page.getByText('Last checked in: Invalid Date').click();
  await page.getByText('Location: N/A').click();
  await page.getByText('Check-InLast checked in:').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'View on Map' }).click();
  const page1 = await page1Promise;
});

test('Interactions between three functions', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByPlaceholder('Enter your email address').click();
  await page.getByPlaceholder('Enter your email address').fill('notreal@example.com');
  await page.getByText('Email addressPasswordContinue').click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByPlaceholder('Enter your password').fill('notrealnotreal');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel('Login').click();
  await page.getByRole('button', { name: 'Manage Users' }).click();
  await page.getByRole('heading', { name: 'WellNest Manage Users' }).click();
  await page.getByRole('heading', { name: 'Current Allowed Users' }).click();
  await page.getByPlaceholder('Enter email to add user').click();
  await page.getByPlaceholder('Enter email to add user').fill('qien_lin@brown.edu');
  await page.getByRole('button', { name: 'Add User' }).click();
  await page.getByRole('button', { name: 'Go Back' }).click();
  await page.getByRole('heading', { name: 'Do you want to check on your' }).click();
  await page.getByRole('button', { name: 'Check Locations' }).click();
  await page.getByRole('heading', { name: 'WellNest Check User Locations' }).click();
  await page.getByRole('heading', { name: 'View Users Location' }).click();
  await page.getByText('No allowed users found.').click();
  await page.getByRole('button', { name: 'Go Back' }).click();
});