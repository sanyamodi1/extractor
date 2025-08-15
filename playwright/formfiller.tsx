const { chromium } = require('playwright');
const axios = require('axios');
const credentials = require('./data.json');


interface ExtractedData {
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  date_of_birth?: string;
  sex?: string;
  address?: Record<string, string>;
  id_number?: string;
  issuing_date?: string;
  expiry_date?: string;
  nationality?: string;
  authority?: string;
  card_number?: string;
  occupation?: string;
  employer?: string;
  issuing_place?: string;
  traffic_plate_number?: string;
  vehicle_place_of_issue?: string;
  vehicle_owner?: string;
  vehicle_tc_number?: string;
  vehicle_card_expiry_date?: string;
  insurance_expiry_date?: string;
  policy_number?: string;
  registration_date?: string;
  license_number?: string;
  license_place_of_issue?: string;
  licensing_authority_number?: string;
  identityDocs?: {
    type?: string;
    documentNumber?: string;
    issueDate?: string;
    expiryDate?: string;
  }[];
  vehicles?: Record<string, string | number>[];
}

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 1️⃣ Login
    await page.goto('http://localhost:3000/login');
    await page.fill('#email', credentials.email);
    await page.fill('#password', credentials.password);
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForSelector('text=Create Quote', { timeout: 20000 })
    ]);

    // 2️⃣ Navigate to form
    await page.click('text=Create Quote');
    await page.waitForSelector('form', { timeout: 10000 });

    // 3️⃣ Fetch extracted data from backend with retries
    let extractedData: ExtractedData = {};
    let retries = 5;

    while (retries-- > 0) {
      try {
        const response = await axios.get('http://localhost:3000/api/getExtractedData');
        if (response.data && Object.keys(response.data).length > 0) {
          extractedData = response.data;
          console.log('Extracted Data from API:', extractedData);
          break;
        }
      } catch (err) {
        console.warn('API fetch failed, retrying...', err);
      }
      console.log('Waiting 1s before retrying...');
      await new Promise(r => setTimeout(r, 1000));
    }

    if (Object.keys(extractedData).length === 0) {
      throw new Error('No extracted data received from API.');
    }

    // 4️⃣ Autofill form after data is ready
    await page.evaluate((data: ExtractedData) => {
      const setReactValue = (id: string, val: any) => {
        const el = document.getElementById(id) as HTMLInputElement | HTMLSelectElement | null;
        if (!el) return;

        const anyEl = el as any;
        const nativeSetter = Object.getOwnPropertyDescriptor(anyEl.__proto__, 'value')?.set;
        if (nativeSetter) nativeSetter.call(anyEl, val ?? '');
        
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      };

      const normalizeGender = (g?: string) => {
        if (!g) return '';
        const val = g.toLowerCase();
        if (['male', 'm'].includes(val)) return 'male';
        if (['female', 'f'].includes(val)) return 'female';
        if (['other', 'o'].includes(val)) return 'other';
        return '';
      };

      const fields: Array<[string, any]> = [
        ['email', data.email],
        ['password', data.password],
        ['name', data.name],
        ['phone', data.phone],
        ['date_of_birth', data.date_of_birth],
        ['sex', normalizeGender(data.sex)],
        ['id_number', data.id_number],
        ['authority', data.authority],
        ['issuing_date', data.issuing_date],
        ['expiry_date', data.expiry_date],
        ['nationality', data.nationality],
        ['card_number', data.card_number],
        ['occupation', data.occupation],
        ['employer', data.employer],
        ['issuing_place', data.issuing_place],
        ['traffic_plate_number', data.traffic_plate_number],
        ['vehicle_place_of_issue', data.vehicle_place_of_issue],
        ['vehicle_owner', data.vehicle_owner],
        ['vehicle_tc_number', data.vehicle_tc_number],
        ['vehicle_card_expiry_date', data.vehicle_card_expiry_date],
        ['insurance_expiry_date', data.insurance_expiry_date],
        ['policy_number', data.policy_number],
        ['registration_date', data.registration_date],
        ['license_number', data.license_number],
        ['license_place_of_issue', data.license_place_of_issue],
        ['licensing_authority_number', data.licensing_authority_number],
      ];

      fields.forEach(([id, val]) => setReactValue(id, val));

      // Address
      if (data.address) {
        Object.entries(data.address).forEach(([key, val]) => setReactValue(key, val));
      }

      // Identity documents
      const identityDocs = data.identityDocs || [];
      if (data.id_number && data.issuing_date && data.expiry_date) {
        identityDocs.push({
          type: 'Driving License',
          documentNumber: data.id_number,
          issueDate: data.issuing_date,
          expiryDate: data.expiry_date,
        });
      }
      identityDocs.forEach((doc, idx) => {
        setReactValue(`type-${idx}`, doc.type || '');
        setReactValue(`docNum-${idx}`, doc.documentNumber || '');
        setReactValue(`issueDate-${idx}`, doc.issueDate || '');
        setReactValue(`expiryDate-${idx}`, doc.expiryDate || '');
      });

      // Vehicles
      if (Array.isArray(data.vehicles)) {
        data.vehicles.forEach((veh, idx) => {
          Object.entries(veh).forEach(([key, val]) => setReactValue(`${key}-${idx}`, val));
        });
      }

    }, extractedData);

    // 5️⃣ Verify autofill
    const filledValues = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input, select')) as (HTMLInputElement | HTMLSelectElement)[];
      return inputs.reduce((acc, el) => {
        acc[el.id || el.name || 'unknown'] = el.value;
        return acc;
      }, {} as Record<string, string>);
    });
    console.log('Form values after autofill:', filledValues);

    // 6️⃣ Wait a few seconds to review autofill
    console.log('Waiting 5 seconds before submitting...');
    await page.waitForTimeout(5000);

    // 7️⃣ Submit form
    const submitBtn = page.locator('button[type="submit"]');
    await submitBtn.waitFor({ state: 'visible', timeout: 10000 });
    await submitBtn.click();
    await page.waitForTimeout(2000);

    console.log('Form submitted successfully!');

  } catch (err) {
    console.error('Autofill failed:', err);
  } finally {
    await browser.close();
  }
})();
