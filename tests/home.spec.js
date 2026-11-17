
const { test, expect } = require('@playwright/test');

test.describe('Home Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // TC_HOME_001 - Verify Home page loads
  test('TC_HOME_001 - Verify Home page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL('/');
    await expect(page.locator('main')).toBeVisible();
  });

  // TC_HOME_002 - Verify main heading
  test('TC_HOME_002 - Verify Home page heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Welcome to TalentOne' })
    ).toBeVisible();
  });

  // TC_HOME_003 - Verify Job Seeker CTA
  test('TC_HOME_003 - Verify Job Seeker CTA navigation', async ({ page }) => {
    const jobSeekerLink = page.getByRole('link', {
      name: "I'm a Job Seeker"
    });

    await expect(jobSeekerLink).toBeVisible();
    await jobSeekerLink.click();

    await expect(page).toHaveURL(/\/careers$/);
  });

  // TC_HOME_004 - Verify Employer CTA
  test('TC_HOME_004 - Verify Employer CTA navigation', async ({ page }) => {
    const employerLink = page.getByRole('link', {
      name: "I'm an Employer"
    });

    await expect(employerLink).toBeVisible();
    await employerLink.click();

    await expect(page).toHaveURL(/\/employers$/);
  });

  // TC_HOME_005 - Verify all four service cards
  test('TC_HOME_005 - Verify all service cards are displayed', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Our Services' })
    ).toBeVisible();

    const services = [
      'Staffing Solutions',
      'Recruitment Solutions',
      'Executive Search',
      'CXO Level Hiring'
    ];

    for (const service of services) {
      await expect(
        page.locator('main').getByRole('heading', {
          name: service,
          exact: true
        })
      ).toBeVisible();
    }
  });

  // TC_HOME_006 - Verify all eight industries
  test('TC_HOME_006 - Verify all industries are displayed', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Industries We Serve' })
    ).toBeVisible();

    const industries = [
      'IT & Technology',
      'Banking & Finance',
      'Manufacturing',
      'Healthcare',
      'Consumer Goods',
      'Engineering',
      'Telecom',
      'Semiconductor'
    ];

    for (const industry of industries) {
      await expect(
        page.locator('main').getByText(industry, { exact: true })
      ).toBeVisible();
    }
  });

  // TC_HOME_007 - Verify bottom CTA navigation
  test('TC_HOME_007 - Verify Browse Job Openings navigation', async ({ page }) => {
    const browseJobsLink = page.getByRole('link', {
      name: 'Browse Job Openings'
    });

    await expect(browseJobsLink).toBeVisible();
    await browseJobsLink.click();

    await expect(page).toHaveURL(/\/careers$/);
  });

  // TC_HOME_008 - Verify Header and Footer
  test('TC_HOME_008 - Verify Header and Footer are displayed', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

});
