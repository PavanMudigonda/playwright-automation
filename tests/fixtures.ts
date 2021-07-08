import { folio as baseFolio } from '@playwright/test';
import data from '../src/data/config.json';
import { Utils } from "../src/utils/utils";
import { SignInPage } from "../src/pages/SignInPage";

const fixtures = baseFolio.extend<{}, { loggedInState: any }>();

//initialize loggedInstate per worker
fixtures.loggedInState.init(async ({ browser }, run) => {
  // Create a new page.
  const page = await browser.newPage();
  let userName = new Utils().getUsername();
  let password = new Utils().getPassword();

  // Perform real log in.
  await page.goto(data.signInUrl);
  let signInPage = new SignInPage(page);
  await signInPage.signIn(userName,password);
  await page.waitForNavigation();
  // Fetch cookies.
  const cookies = await page.context().cookies();
  await page.close();

  // Run the test with the cookies.
  const loggedInState = { cookies };
  await run(loggedInState);
}, { scope: 'worker' });

fixtures.context.override(async ({ context, loggedInState }, run) => {
  // Override context to inject cookies.
  await context.addCookies(loggedInState.cookies);
  await run(context);
});

export const folio = fixtures.build();