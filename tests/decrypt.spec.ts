import { test, expect } from '@playwright/test';
import * as path from 'path';

const decryptPagePath = `file://${path.resolve(__dirname, '../decrypt.html')}`;
const encryptPagePath = `file://${path.resolve(__dirname, '../encrypt.html')}`;

// Helper to encrypt content using the encrypt page (ensures we use the same algorithm)
async function encryptContent(page: any, content: string, password: string): Promise<string> {
  await page.goto(encryptPagePath);

  await page.fill('#content', content);
  await page.fill('#password', password);
  await page.click('button:has-text("Encrypt")');

  // Wait for QR code section to appear
  await page.waitForSelector('#qrcode', { state: 'visible' });

  // Extract the encrypted data from the page
  // The encrypted base64 is shown in the info-box with format: (S){base64}(E)
  const encryptedText = await page.locator('.info-box-content code').nth(1).textContent();

  // Extract base64 from (S)....(E) format
  const match = encryptedText.match(/\(S\)(.*?)\(E\)/);
  if (!match) {
    throw new Error('Could not extract encrypted data from page');
  }

  return '[OV_v1]' + match[1];
}

test.describe('Decryption', () => {
  test('decrypts known test vector: "my secret" with password "pass"', async ({ page }) => {
    // Known test vector - this ensures the decryption algorithm remains stable
    const encryptedData = '[OV_v1]61883g1J/nskSKh2UH2lsQ==';
    const password = 'pass';
    const expectedContent = 'my secret';

    await page.goto(`${decryptPagePath}#${encodeURIComponent(encryptedData)}`);

    await page.fill('#password', password);
    await page.click('button:has-text("Decrypt")');

    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#successMsg')).toBeVisible();

    const decryptedContent = await page.locator('#decryptedContent').textContent();
    expect(decryptedContent).toBe(expectedContent);
  });

  test('successfully decrypts content with correct password', async ({ page }) => {
    const originalContent = 'Hello, this is a secret message!';
    const password = 'testPassword123';

    // First encrypt the content
    const encryptedData = await encryptContent(page, originalContent, password);

    // Now test decryption by navigating to decrypt page with encrypted data in hash
    await page.goto(`${decryptPagePath}#${encodeURIComponent(encryptedData)}`);

    // Password section should be visible
    await expect(page.locator('#passwordSection')).toBeVisible();

    // Enter password and decrypt
    await page.fill('#password', password);
    await page.click('button:has-text("Decrypt")');

    // Wait for result to appear
    await expect(page.locator('#result')).toBeVisible();
    await expect(page.locator('#successMsg')).toBeVisible();

    // Verify decrypted content matches original
    const decryptedContent = await page.locator('#decryptedContent').textContent();
    expect(decryptedContent).toBe(originalContent);
  });

  test('shows error with incorrect password', async ({ page }) => {
    const originalContent = 'Secret data';
    const correctPassword = 'correctPassword';
    const wrongPassword = 'wrongPassword';

    // Encrypt with correct password
    const encryptedData = await encryptContent(page, originalContent, correctPassword);

    // Try to decrypt with wrong password
    await page.goto(`${decryptPagePath}#${encodeURIComponent(encryptedData)}`);

    await page.fill('#password', wrongPassword);
    await page.click('button:has-text("Decrypt")');

    // Error message should be visible
    await expect(page.locator('#errorMsg')).toBeVisible();
    await expect(page.locator('#errorMsg')).toContainText('Decryption failed');

    // Result should not be visible
    await expect(page.locator('#result')).not.toBeVisible();
  });

  test('shows error when password is empty', async ({ page }) => {
    const originalContent = 'Test content';
    const password = 'myPassword';

    const encryptedData = await encryptContent(page, originalContent, password);

    await page.goto(`${decryptPagePath}#${encodeURIComponent(encryptedData)}`);

    // Try to decrypt without entering password
    await page.click('button:has-text("Decrypt")');

    // Error message should appear
    await expect(page.locator('#errorMsg')).toBeVisible();
    await expect(page.locator('#errorMsg')).toContainText('Please enter a password');
  });

  test('decrypts content with special characters', async ({ page }) => {
    const originalContent = 'Special chars: !@#$%^&*()_+-=[]{}|;\':",.<>?/`~\nNewline\tTab';
    const password = 'p@ssw0rd!#$';

    const encryptedData = await encryptContent(page, originalContent, password);

    await page.goto(`${decryptPagePath}#${encodeURIComponent(encryptedData)}`);

    await page.fill('#password', password);
    await page.click('button:has-text("Decrypt")');

    await expect(page.locator('#result')).toBeVisible();

    const decryptedContent = await page.locator('#decryptedContent').textContent();
    expect(decryptedContent).toBe(originalContent);
  });

  test('decrypts content with unicode characters', async ({ page }) => {
    const originalContent = 'Unicode: \u4e2d\u6587 \u65e5\u672c\u8a9e \ud55c\uad6d\uc5b4 \u0440\u0443\u0441\u0441\u043a\u0438\u0439';
    const password = 'unicode\u5bc6\u7801';

    const encryptedData = await encryptContent(page, originalContent, password);

    await page.goto(`${decryptPagePath}#${encodeURIComponent(encryptedData)}`);

    await page.fill('#password', password);
    await page.click('button:has-text("Decrypt")');

    await expect(page.locator('#result')).toBeVisible();

    const decryptedContent = await page.locator('#decryptedContent').textContent();
    expect(decryptedContent).toBe(originalContent);
  });

  test('decrypts long content', async ({ page }) => {
    // Generate a longer piece of content
    const originalContent = 'A'.repeat(1000) + '\n' + 'B'.repeat(1000);
    const password = 'longContentPassword';

    const encryptedData = await encryptContent(page, originalContent, password);

    await page.goto(`${decryptPagePath}#${encodeURIComponent(encryptedData)}`);

    await page.fill('#password', password);
    await page.click('button:has-text("Decrypt")');

    await expect(page.locator('#result')).toBeVisible();

    const decryptedContent = await page.locator('#decryptedContent').textContent();
    expect(decryptedContent).toBe(originalContent);
  });

  test('Enter key triggers decryption', async ({ page }) => {
    const originalContent = 'Enter key test';
    const password = 'enterKeyPassword';

    const encryptedData = await encryptContent(page, originalContent, password);

    await page.goto(`${decryptPagePath}#${encodeURIComponent(encryptedData)}`);

    await page.fill('#password', password);
    await page.press('#password', 'Enter');

    await expect(page.locator('#result')).toBeVisible();

    const decryptedContent = await page.locator('#decryptedContent').textContent();
    expect(decryptedContent).toBe(originalContent);
  });
});
