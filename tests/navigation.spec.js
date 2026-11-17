const { test, expect } = require('@playwright/test');

test.describe('Public Website Navigation Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // TC_NAV_001 to TC_NAV_005 - Header navigation
  const headerLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'For Employers', path: '/employers' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' }
  ];

  for (const link of headerLinks) {
    test(`Verify Header ${link.name} navigation`, async ({ page }) => {
      const headerLink = page.locator('header')
        .getByRole('link', { name: link.name, exact: true });

      await expect(headerLink).toBeVisible();
      await expect(headerLink).toHaveAttribute('href', link.path);

      await headerLink.click();

      await expect(page).toHaveURL(
        `http://localhost:5000${link.path === '/' ? '/' : link.path}`
      );
    });
  }

  // TC_NAV_006 - Verify TalentOne logo navigation
  test('Verify TalentOne logo navigates to Home', async ({ page }) => {
    await page.goto('/about');

    const logoLink = page.locator('header').getByRole('link').first();

    await expect(logoLink).toHaveAttribute('href', '/');

    await logoLink.click();

    await expect(page).toHaveURL('http://localhost:5000/');
  });

  // TC_NAV_007 to TC_NAV_010 - Footer navigation
  const footerLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Job Openings', path: '/careers' },
    { name: 'For Employers', path: '/employers' },
    { name: 'Contact', path: '/contact' }
  ];

  for (const link of footerLinks) {
    test(`Verify Footer ${link.name} navigation`, async ({ page }) => {
      const footerLink = page.locator('footer')
        .getByRole('link', { name: link.name, exact: true });

      await expect(footerLink).toBeVisible();
      await expect(footerLink).toHaveAttribute('href', link.path);

      await footerLink.click();

      await expect(page).toHaveURL(
        `http://localhost:5000${link.path}`
      );
    });
  }

  // TC_NAV_011 - Verify LinkedIn external link
  test('Verify LinkedIn external link destination', async ({ page }) => {
    const linkedInLink = page.locator('footer')
      .getByRole('link', { name: 'LinkedIn', exact: true });

    await expect(linkedInLink).toBeVisible();

    await expect(linkedInLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/company/talentone-hr-consulting-llp/'
    );

    await expect(linkedInLink).toHaveAttribute('target', '_blank');

    await expect(linkedInLink).toHaveAttribute(
      'rel',
      'noopener noreferrer'
    );
  });

  // TC_NAV_012 - Verify mobile menu opens and closes
  test('Verify mobile hamburger menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    const header = page.locator('header');
    const menuButton = header.locator('button');
    const aboutLink = header.getByRole('link', {
      name: 'About',
      exact: true
    });

    await expect(menuButton).toBeVisible();
    await expect(aboutLink).toBeHidden();

    await menuButton.click();

    await expect(aboutLink).toBeVisible();

    await menuButton.click();

    await expect(aboutLink).toBeHidden();
  });

  // TC_NAV_013 - Verify mobile navigation works
  test('Verify mobile menu navigation to About page', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    const header = page.locator('header');

    await header.locator('button').click();

    const aboutLink = header.getByRole('link', {
      name: 'About',
      exact: true
    });

    await expect(aboutLink).toBeVisible();

    await aboutLink.click();

    await expect(page).toHaveURL('http://localhost:5000/about');
  });

});
