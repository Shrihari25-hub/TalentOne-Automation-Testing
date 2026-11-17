
const { test, expect } = require('@playwright/test');

test.describe('Employers Page Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/employers');
  });

  // TC_EMP_001 - Verify Employers page loads
  test('TC_EMP_001 - Verify Employers page loads successfully', async ({ page }) => {
    await expect(page).toHaveURL(/\/employers$/);
    await expect(page.locator('main')).toBeVisible();
  });

  // TC_EMP_002 - Verify page heading
  test('TC_EMP_002 - Verify Employers page heading', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'For Employers', exact: true })
    ).toBeVisible();
  });

  // TC_EMP_003 - Verify How TalentOne Helps Companies section
  test('TC_EMP_003 - Verify company benefits section', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'How TalentOne Helps Companies' })
    ).toBeVisible();

    const benefits = [
      'Partnership Approach',
      'Target-Driven',
      'Strategic Recruiting'
    ];

    for (const benefit of benefits) {
      await expect(
        page.getByRole('heading', { name: benefit, exact: true })
      ).toBeVisible();
    }
  });

  // TC_EMP_004 - Verify required-field validation
test('TC_EMP_004 - Verify required-field validation', async ({ page }) => {

  await page.getByRole('button', { name: 'Submit Request' }).click();

  await expect(page.getByText('Company name is required')).toBeVisible();
  await expect(page.getByText('Contact person is required')).toBeVisible();
  await expect(page.getByText('Email is required')).toBeVisible();
  await expect(page.getByText('Phone is required')).toBeVisible();
  await expect(page.getByText('Number of positions is required')).toBeVisible();
  await expect(page.getByText('Urgency is required')).toBeVisible();
  await expect(page.getByText('Industry is required')).toBeVisible();

});


// TC_EMP_005 - Verify invalid email validation
test('TC_EMP_005 - Verify invalid email validation', async ({ page }) => {
  const form = page.locator('form');

  await form.locator('input').nth(0).fill('QA Test Company');
  await form.locator('input').nth(1).fill('Test Person');
  await form.locator('input[type="email"]').fill('invalid-email');
  await form.locator('input').nth(3).fill('9876543210');
  await form.locator('input[type="number"]').fill('1');
  await form.locator('select').selectOption('Immediate');
  await form.locator('input').nth(5).fill('IT');

  const emailInput = form.locator('input[type="email"]');

const isInvalidEmail = await emailInput.evaluate(
  input => input.validity.typeMismatch
);

expect(isInvalidEmail).toBe(true);
});

test('TC_EMP_006 - Verify valid dummy form values', async ({ page }) => {
  await page.goto('/employers');

  const form = page.locator('form');

  await form.locator('input[name="companyName"]').fill('QA Test Company');
  await form.locator('input[name="contactPerson"]').fill('Test User');
  await form.locator('input[name="email"]').fill('test@example.com');
  await form.locator('input[name="phone"]').fill('9876543210');
  await form.locator('input[name="numberOfPositions"]').fill('5');

  await expect(form.locator('input[name="companyName"]')).toHaveValue('QA Test Company');
  await expect(form.locator('input[name="contactPerson"]')).toHaveValue('Test User');
  await expect(form.locator('input[name="email"]')).toHaveValue('test@example.com');
  await expect(form.locator('input[name="phone"]')).toHaveValue('9876543210');
  await expect(form.locator('input[name="numberOfPositions"]')).toHaveValue('5');
});

test('TC_EMP_007 - Verify minimum number of positions validation', async ({ page }) => {
  await page.goto('/employers');

  const positionsInput = page.locator('form input[name="numberOfPositions"]');

  await positionsInput.fill('0');

  const isInvalid = await positionsInput.evaluate(
    input => input.validity.rangeUnderflow
  );

  expect(isInvalid).toBe(true);
});
test('TC_EMP_008 - Verify urgency dropdown options', async ({ page }) => {
  await page.goto('/employers');

  const urgencyDropdown = page.locator('form select[name="urgency"]');

  await expect(urgencyDropdown).toBeVisible();

  const options = await urgencyDropdown.locator('option').allTextContents();

  expect(options).toHaveLength(5);

  expect(options).toEqual([
    'Select urgency',
    'Immediate',
    'Within 1 month',
    'Within 3 months',
    'Not urgent'
  ]);
});
test('TC_EMP_009 - Verify Job Description is optional', async ({ page }) => {
  await page.goto('/employers');

  const jobDescription = page.locator('form textarea[name="jobDescription"]');

  await expect(jobDescription).toBeVisible();

  await expect(jobDescription).not.toHaveAttribute('required', '');

  await expect(jobDescription).toBeEmpty();
});
test('TC_EMP_010 - Verify Job Description accepts text', async ({ page }) => {
  await page.goto('/employers');

  const jobDescription = page.locator('form textarea[name="jobDescription"]');

  await jobDescription.fill('We are looking for experienced software testers.');

  await expect(jobDescription).toHaveValue(
    'We are looking for experienced software testers.'
  );
});
});
