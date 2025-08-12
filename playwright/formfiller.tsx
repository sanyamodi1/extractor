const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    // 1. Navigate to your form page
    await page.goto('http://localhost:3000/dashboard'); // update URL

    // 2. Log in if necessary - skip if no login
    // await page.fill('input[name="email"]', 'user@example.com');
    // await page.fill('input[name="password"]', 'password');
    // await page.click('button[type="submit"]');
    // await page.waitForNavigation();

    // 3. Upload file first to trigger extraction and autofill
    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.click('input[type="file"]'),
    ]);
    await fileChooser.setFiles('C:/Users/dell/Desktop/today/17.jpg');

    // 4. Wait for extraction to complete
    await page.waitForSelector('text=Extracting data from document...', { state: 'hidden' });

    // 5. Fill remaining fields that extraction does NOT fill
    // (Adjust selectors and values as per your form)
    await page.fill('input[name="email"]', 'manualfill@example.com');
    await page.fill('input[name="password"]', 'securePassword123');
    await page.fill('input[name="phone"]', '9876543210');
    await page.fill('input[name="gender"]', 'Female');

    // Fill address fields (if not filled by extraction)
    await page.fill('input[name="street"]', '456 Secondary St');
    await page.fill('input[name="city"]', 'Another City');
    await page.fill('input[name="state"]', 'Another State');
    await page.fill('input[name="postalCode"]', '654321');
    await page.fill('input[name="country"]', 'Another Country');

    // Fill vehicles fields if needed
    await page.fill('input[name="vehicles[0].registrationNo"]', 'NEWREG123');
    // ...fill other vehicle fields similarly if needed

    // 6. Submit the form
    await page.click('button[type="submit"]');

    // Optional: wait for success alert or page response
    await page.waitForTimeout(2000);

    await browser.close();
})();
