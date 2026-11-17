
const { test, expect } = require('@playwright/test');

test.describe('About Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  // TC_ABT_001 - Verify About page loads
  test('TC_ABT_001 - Verify About page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/about$/);
    await expect(page.locator('main')).toBeVisible();
  });

  // TC_ABT_002 - Verify page heading
  test('TC_ABT_002 - Verify About page heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'About TalentOne' })
    ).toBeVisible();
  });

  
test('TC_ABT_003 - Verify Our Story section and content', async ({ page }) => {
  await expect(
    page.getByRole('heading', { name: 'Our Story' })
  ).toBeVisible();

  const story = page.locator('main').getByText(
    /TalentOne HR Consulting LLP is a premier recruitment/
  );

  await expect(story.first()).toBeVisible();

  await expect(
    page.locator('main').getByText(/India, USA, and the Middle East/).first()
  ).toBeVisible();
});


  // TC_ABT_004 - Verify Mission and Vision
  test('TC_ABT_004 - Verify Mission and Vision sections', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Mission & Vision' })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Our Mission' })
    ).toBeVisible();

    await expect(
      page.getByRole('heading', { name: 'Our Vision' })
    ).toBeVisible();
  });

  // TC_ABT_005 - Verify all 12 industries
  test('TC_ABT_005 - Verify all industries are displayed', async ({ page }) => {
    const industries = [
      'IT & Technology',
      'Banking & Financial Services',
      'Consumer Goods',
      'Engineering & Manufacturing',
      'Infrastructure',
      'Healthcare',
      'Hotel & Leisure',
      'Telecom & Devices',
      'Power & Energy',
      'Pharmaceuticals & Bio-Tech',
      'Food & Beverage',
      'Automotive Industries'
    ];

    for (const industry of industries) {
      await expect(
        page.getByRole('heading', { name: industry, exact: true })
      ).toBeVisible();
    }

    await expect(
      page.getByRole('heading', { name: 'Industries We Serve' })
    ).toBeVisible();
  });

  // TC_ABT_006 - Verify Recruitment Services
  test('TC_ABT_006 - Verify Recruitment Services content', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Recruitment Services' })
    ).toBeVisible();

    const services = [
      'Executive Search',
      'Contingent Search',
      'Enterprise RPO',
      'Flexi Recruitment',
      'SME Recruitment',
      'Offshore RPO',
      'Project Based Hiring',
      'International Recruitment',
      'Hire EU Passport Holders'
    ];

    for (const service of services) {
      await expect(
  page.locator('main').getByText(service, { exact: true })
).toBeVisible();
    }
  });

  // TC_ABT_007 - Verify Staffing Services
  test('TC_ABT_007 - Verify Staffing Services content', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Staffing Services' })
    ).toBeVisible();

    const services = [
      'Staffing Solutions',
      'Staff Augmentation',
      'Remote Staffing',
      'Contract Staffing',
      'Hourly Based Professional',
      'Specialized Staffing',
      'Strategic Staffing',
      'Offshore Staffing',
      'Offshore Staff Augmentation',
      'Global Staffing',
      'Global Capability Centers (GCCs) Hiring'
    ];

    for (const service of services) {
      await expect(
  page.locator('main').getByText(service, { exact: true })
).toBeVisible();
    }
  });

  // TC_ABT_008 - Verify Header and Footer
  test('TC_ABT_008 - Verify Header and Footer are displayed', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

});
