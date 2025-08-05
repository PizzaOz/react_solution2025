import { test, expect } from '@playwright/test';
import { AuthPage } from './auth.page';

test.describe('Авторизация', () => {
  test('Успешный вход с правильными данными', async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.goto();
    await authPage.login('test_2', '123456');
    await expect(page).toHaveURL('http://127.0.0.1:8050/profile');
    await expect(authPage.logoutButton).toBeVisible();
  });

  test('Ошибка при неверных данных', async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.goto();
    await authPage.login('wrong', 'credentials');
    await expect(page.locator('text=Неверный логин или пароль')).toBeVisible();
  });

  test('Ошибка при пустых полях', async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.goto();
    await authPage.submitButton.click();
    await expect(page.locator('.ant-form-item-explain-error').first()).toBeVisible();
  });

  test('Полный цикл: вход и выход', async ({ page }) => {
    const authPage = new AuthPage(page);
    await authPage.goto();
    await authPage.login('test_2', '123456');
    await authPage.logoutButton.click();
    await expect(authPage.usernameInput).toBeVisible();
  });
});