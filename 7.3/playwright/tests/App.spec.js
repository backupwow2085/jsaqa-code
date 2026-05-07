import { user, invalidUser } from "../user.js";
import { test, expect } from '@playwright/test';

test("authorizationTest", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.click("text=Войти");
  await page.click("text=Войти по почте");
  await page.fill("input[name='email']", user.email);
  await page.fill("input[name='password']", user.password);
  await page.click("data-testid=login-submit-btn");
  await page.pause();
  //Необходимо пройти капчу
  await expect(page).toHaveURL(/\/profile/);
  await expect(page.locator('[class="------libs-shared-src-reallyShared-components-User--profileText--vDqvQ"]')).toHaveText(
  'Моё обучение');
});

test("invalidLoginTest", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.click("text=Войти");
  await page.click("text=Войти по почте");
  await page.fill("input[name='email']", invalidUser.email);
  await page.fill("input[name='password']", invalidUser.password);
  await page.click("data-testid=login-submit-btn");
  await page.pause();
  //Необходимо пройти капчу
await expect(page.locator('[data-testid="login-error-hint"]')).toBeVisible();
await expect(page.locator('[data-testid="login-error-hint"]')).toHaveText(
  'Вы ввели неправильно логин или пароль.'
);
  });;
