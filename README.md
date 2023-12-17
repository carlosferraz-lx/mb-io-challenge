# mb-io-challenge

## Task 1

For this task I've chosen to create actual bugs on shortcut.com. Unfortunately I can't find a way to make my board public so I added the bug report screenshots to the pdf.

## Task 2

For my test automation solution. I have decided to use Playwright with Typescript. I used a Page Object Design approach, although deciding to not use BDD. The reason for not using BDD was because, I believe, that the Playwright native test runner is the best runner that I've used and so I would rather leverage this test runner than using Cucumber.

In order to execute the code you need [node](https://nodejs.org/en/download) installed on your machine, and then run `npm install` to install the dependencies.

In order to run the test run the script `npm run headless` for headless browsers and `npm run headed` for headed.

The project is setup to run on three browsers. Chrome, Firefox and Webkit.

## Task 3

There is a simple CI/CD prepared that runs on push. It's also possible to manually trigger throught the `Actions` tab on github by going to one of the previously executed workflows and clicking `Re-run all jobs`
