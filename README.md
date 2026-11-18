# TalentOne – Automation Testing

Cross-browser UI automation testing project for the TalentOne HR Platform using **Playwright**, **JavaScript**, and **GitHub Actions CI**.

## Project Overview

This project automates testing of the public-facing pages of the TalentOne HR Platform. It focuses on validating page content, navigation, form validation, responsive navigation, and browser compatibility.

The automation suite runs against a locally hosted application and is integrated with GitHub Actions for continuous integration.

## Technology Stack

- **Automation:** Playwright
- **Language:** JavaScript
- **Runtime:** Node.js 22 (CI)
- **Browsers:** Chromium, Firefox, WebKit
- **CI/CD:** GitHub Actions
- **Application:** Next.js
- **Database for CI:** MongoDB 7 
- **Version Control:** Git and GitHub

## Test Coverage

The project contains **50 unique test cases** across six test suites.

| Test Suite | Test Cases | Coverage |
|---|---:|---|
| Home Page | 8 | Page loading, headings, CTAs, service cards, industries, navigation |
| About Page | 8 | Page content, story, mission, vision, industries, services |
| Careers Page | 5 | Page content, job openings link, header and footer |
| Contact Page | 6 | Page loading, required fields, email validation, phone field |
| Employers Page | 10 | Page content, form validation, dropdowns, input fields |
| Navigation | 13 | Header, footer, logo, LinkedIn link, mobile menu |
| **Total** | **50** | |

### Browser Coverage

All test cases are configured to run against three browser projects:

- Chromium
- Firefox
- WebKit

This produces 150 browser-specific test executions per complete run.

## Running Tests Locally

### Prerequisites

- Node.js and npm
- Access to the TalentOne application source repository
- Application running locally at `http://localhost:5000`

### 1. Clone the automation repository

```bash
git clone https://github.com/Shrihari25-hub/TalentOne-Automation-Testing.git
cd TalentOne-Automation-Testing
```

### 2. Install dependencies

```bash
npm ci
```

### 3. Install Playwright browsers

```bash
npx playwright install
```

### 4. Start the TalentOne application

Start the application separately using its development or local server setup. Ensure it is available at:

```text
http://localhost:5000
```

### 5. Execute the tests

```bash
npx playwright test
```

### 6. View the HTML report

```bash
npx playwright show-report
```

## GitHub Actions CI Pipeline

The project uses GitHub Actions to automatically build the TalentOne application and execute the Playwright test suite.

The workflow is triggered on:

- Push to `main` or `master`
- Pull requests targeting `main` or `master`

### CI Pipeline Workflow

1. Check out the automation repository.
2. Check out the private TalentOne application repository into a separate `app` directory.
3. Set up Node.js 22.
4. Install application dependencies using `npm ci`.
5. Start an isolated MongoDB 7 service for the CI environment.
6. Build the TalentOne application.
7. Install automation dependencies.
8. Install Chromium, Firefox, and WebKit.
9. Start the locally built application through Playwright's web server configuration.
10. Execute the complete Playwright test suite.
11. Upload the HTML report as a GitHub Actions artifact.

### CI Environment and Safety

- Tests run against the application hosted locally on the GitHub Actions runner.
- CI uses a temporary MongoDB service and a dummy CI-only JWT secret.
- The private application repository is checked out using a read-only repository token.
- No production database credentials or production deployment steps are configured.
- The deployed TalentOne website is not the test target.
- Email and file-upload operations are not part of the current automated test scope.

## Latest CI Execution Results

**GitHub Actions – Successful**

| Metric | Result |
|---|---:|
| Unique test cases | 50 |
| Browser projects | 3 |
| Total executions | 150 |
| Passed | 150 |
| Failed | 0 |
| Playwright execution time | 1.4 minutes |
| Overall workflow duration | 3 minutes 15 seconds |
| HTML report | Uploaded successfully |

The first successful complete CI execution was recorded in GitHub Actions run #2, using commit `8767eba`.

## Test Scope and Limitations

- Testing is limited to the public-facing TalentOne website pages.
- Contact and employer forms are tested for client-side validation and dummy input handling.
- Successful backend form submissions are not currently part of the suite.

## Future Improvements

- Add API testing for relevant application endpoints.
- Expand negative and edge-case scenarios.
- Improve test evidence and reporting documentation.
- Add accessibility and performance checks.
- Expand regression coverage as application features evolve.

## Repository

[GitHub – TalentOne Automation Testing](https://github.com/Shrihari25-hub/TalentOne-Automation-Testing)
