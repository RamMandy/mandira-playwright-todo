import { test, expect, type Page } from '@playwright/test';


test.beforeEach(async ({ page }) => {
  // open the Todo app here
  await page.goto('https://demo.playwright.dev/todomvc/');
});

async function addTodo(page: Page, todoText: string) {

  const toDoInput = page.getByPlaceholder('What needs to be done?');

  await toDoInput.fill(todoText);

  await toDoInput.press(`Enter`);
}

test('user can add a todo item', async ({ page }) => {
  
  await addTodo(page, 'Learn Playwright');
  
  await expect(page.getByText('Learn Playwright')).toBeVisible();

});


test('user can add two todo items', async ({ page }) => {
  
  await addTodo(page, 'Learn Playwright');
  
  await expect(page.getByText('Learn Playwright')).toBeVisible();

  await addTodo(page, 'Learn TypeScript');
  
  await expect(page.getByText('Learn TypeScript')).toBeVisible();
});


test('user can mark todo items as completed', async ({ page }) => {
  
  await addTodo(page, 'Learn Playwright');
  
  await expect(page.getByText('Learn Playwright')).toBeVisible();

  const todoItem = page.getByRole('listitem').filter({ hasText: 'Learn Playwright' });

  const todoCheckbox = todoItem.getByRole('checkbox');

  await todoCheckbox.check();

  await expect(todoCheckbox).toBeChecked();

});

test('user can uncheck completed todo item', async ({ page }) => {
  
  await addTodo(page, 'Learn Playwright');
  
  await expect(page.getByText('Learn Playwright')).toBeVisible();

  const todoItem = page.getByRole('listitem').filter({ hasText: 'Learn Playwright' });

  const todoCheckbox = todoItem.getByRole('checkbox');

  await todoCheckbox.check();

  await expect(todoCheckbox).toBeChecked();

  await todoCheckbox.uncheck();

  await expect(todoCheckbox).not.toBeChecked();

});


test('user can delete the todo item', async ({ page }) => {
  
  await addTodo(page, 'Learn Playwright');
  
  await expect(page.getByText(`Learn Playwright`)).toBeVisible();

  const todoItem = page.getByRole('listitem').filter({ hasText: 'Learn Playwright' });

  await todoItem.hover();

  await todoItem.getByRole('button', { name : 'Delete' }).click();

  await expect(page.getByText('Learn Playwright')).not.toBeVisible();

});