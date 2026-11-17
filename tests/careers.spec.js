
const { test, expect } = require('@playwright/test');

test.describe('Careers Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/careers');
  });

  // TC_CAR_001 - Verify Careers page loads
  test('TC_CAR_001 - Verify Careers page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/careers$/);
    await expect(page.locator('main')).toBeVisible();
  });

  // TC_CAR_002 - Verify heading and description
  test('TC_CAR_002 - Verify Careers heading and description', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Career Opportunities' })
    ).toBeVisible();

    await expect(
      page.getByText('Explore exciting job opportunities')
    ).toBeVisible();
  });

  // TC_CAR_003 - Verify external job openings button is visible
  test('TC_CAR_003 - Verify job openings link is visible', async ({ page }) => {
    const jobLink = page.getByRole('link', {
      name: /click here to check job openings/i
    });

    await expect(jobLink).toBeVisible();
  });

  // TC_CAR_004 - Verify external job openings link destination
  test('TC_CAR_004 - Verify job openings link destination', async ({ page }) => {
    const jobLink = page.getByRole('link', {
      name: /click here to check job openings/i
    });

    await expect(jobLink).toHaveAttribute(
      'href',
      'https://career.talentone.co.in/jobseeker/currentjobs'
    );
  });

  // TC_CAR_005 - Verify Header and Footer
  test('TC_CAR_005 - Verify Header and Footer are displayed', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

});
