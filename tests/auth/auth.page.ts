import { Page, Locator } from '@playwright/test';

export class AuthPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('input#username-input');
    this.passwordInput = page.locator('input#password-input');
    this.submitButton = page.locator('button:has-text("Войти")');
    this.logoutButton = page.locator('span:has-text("Выйти")');
  }

  async goto() {
    await this.page.goto('http://127.0.0.1:8050/');
    await this.page.waitForLoadState('networkidle');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}