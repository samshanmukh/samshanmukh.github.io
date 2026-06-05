const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Set viewport to a common desktop size
  await page.setViewportSize({ width: 1280, height: 720 });

  // Array of pages to screenshot
  const pages = [
    { name: 'home', url: 'http://localhost:8080/index.html' },
    { name: 'about', url: 'http://localhost:8080/about.html' },
    { name: 'work', url: 'http://localhost:8080/work.html' },
    { name: 'contact', url: 'http://localhost:8080/contact.html' }
  ];

  for (const p of pages) {
    console.log(`Capturing ${p.name}...`);
    await page.goto(p.url, { waitUntil: 'networkidle' });
    // Move mouse to trigger cursor effect (even if it's not visible in screenshot, it ensures no crashes)
    await page.mouse.move(100, 100);
    await page.mouse.move(200, 200);
    await page.screenshot({ path: `final_${p.name}.png`, fullPage: true });
  }

  await browser.close();
})();
