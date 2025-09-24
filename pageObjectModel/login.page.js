import { expect } from '@playwright/test';

export class LoginPage {

  /** 
  * @param {import ('@playwright/test').Page} page
  */

 constructor (page) {
    this. page = page;
    this. usernameInput = page.locator('[id="username"]');
    this. passwordInput = page.locator('[id="password"]');
    this. signInButton = page.locator ('[type="submit"]');
 }

 async login (username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
 }
}