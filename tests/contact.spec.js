
import { test, expect } from '@playwright/test';

test('TC_CON_001 - Verify Contact Us page loads', async ({ page }) => {
  await page.goto('/contact');

  await expect(
    page.getByRole('heading', { name: 'Send Us a Message' })
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Send Message' })
  ).toBeVisible();
});

test('TC_CON_002 - Verify required field validation', async ({ page }) => {
  await page.goto('/contact');

  await page.getByRole('button', { name: 'Send Message' }).click();

  await expect(page.getByText('Name is required')).toBeVisible();
  await expect(page.getByText('Email is required')).toBeVisible();
  await expect(page.getByText('Subject is required')).toBeVisible();
  await expect(page.getByText('Message is required')).toBeVisible();
});

test('TC_CON_003 - Verify invalid email validation', async ({ page }) => {
  await page.goto('/contact');

  const emailInput = page.locator('input[type="email"]');

  await emailInput.fill('invalid-email');

  await expect(emailInput).toHaveJSProperty(
    'validity.valid',
    false
  );
});


test('TC_CON_004 - Verify phone field is optional', async ({ page }) => {
  await page.goto('/contact');

  const phoneInput = page.locator('input[name="phone"]');

  await expect(phoneInput).toBeVisible();

  await expect(phoneInput).toHaveJSProperty('required', false);
});


test('TC_CON_005 - Verify phone field accepts input', async ({ page }) => {
  await page.goto('/contact');

  const phoneInput = page.locator('input[name="phone"]');

  await phoneInput.fill('9876543210');

  await expect(phoneInput).toHaveValue('9876543210');
});


test('TC_CON_006 - Verify mandatory fields accept valid input', async ({ page }) => {
  await page.goto('/contact');

  const nameInput = page.locator('input[name="name"]');
  const subjectInput = page.locator('input[name="subject"]');
  const messageInput = page.locator('textarea[name="message"]');

  await nameInput.fill('QA Test User');
  await subjectInput.fill('QA Testing Enquiry');
  await messageInput.fill('I would like to enquire about your services.');

  await expect(nameInput).toHaveValue('QA Test User');
  await expect(subjectInput).toHaveValue('QA Testing Enquiry');
  await expect(messageInput).toHaveValue(
    'I would like to enquire about your services.'
  );
});
