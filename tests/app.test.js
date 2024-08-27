
import { test, expect } from 'vitest';
import { chromium } from 'playwright';

test('should be able to draw and save DMN diagrams', async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173');
  await page.waitForSelector('#canvas');
  await page.click('#new');
  await page.click('#save');
  
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('#save'),
  ]);
  
  const path = await download.path();
  const fs = require('fs');
  const fileContent = fs.readFileSync(path, 'utf-8');
  
  expect(fileContent).toContain('<dmn:definitions');
  
  await browser.close();
});










// import { test, expect } from 'vitest';
// import { chromium } from 'playwright';

// test('should be able to draw and save DMN diagrams', async () => {
//   // Launch the browser
//   const browser = await chromium.launch();
//   const page = await browser.newPage();

//   // Navigate to your DMN web app
//   await page.goto('http://localhost:5173'); // Adjust the URL as needed

//   // Wait for the DMN viewer to be fully loaded
//   await page.waitForSelector('#canvas'); // Wait for the canvas to be available

//   // Example interaction: Clicking on the canvas (modify as needed for your app)
//   // This assumes that your DMN editor requires some interaction to draw or create elements
//   await page.click('#canvas'); // Click on the canvas or a specific tool if needed

//   // Click the save button to export the diagram as JSON
//   const [download] = await Promise.all([
//     page.waitForEvent('download'), // Wait for the download event to be triggered
//     page.click('#save') // Trigger the download
//   ]);

//   // Save the downloaded file to a specific path
//   const downloadPath = await download.path();
//   console.log(`Downloaded file path: ${downloadPath}`);

//   // Optionally: Read the file and perform validation
//   const fileContent = fs.readFileSync(downloadPath, 'utf-8');
//   console.log(`Downloaded file content: ${fileContent}`);

//   // Example: Verify that the file content includes expected DMN-related keywords
//   // Adjust the assertion based on the actual content and structure of your DMN files
//   expect(fileContent).toContain('<dmn:definitions'); // Ensure the file contains DMN XML content

//   // Cleanup: Remove the downloaded file if necessary
//   fs.unlinkSync(downloadPath);

//   // Close the browser
//   await browser.close();
// });

// ------------------------------------------------------------------------------------------------

// test('should be able to draw and save DMN diagrams', async () => {
//   // Launch the browser
//   const browser = await chromium.launch();
//   const page = await browser.newPage();

//   // Navigate to your DMN web app
//   await page.goto('http://localhost:5173'); // Adjust the URL as needed

//   // Wait for the DMN viewer to be fully loaded
//   await page.waitForSelector('#canvas'); // Wait for the canvas to be available

//   // Interact with the DMN canvas to draw a diagram
//   // Example: Click on the canvas, add a task, or connect elements
//   // You would need to know the specific actions your DMN viewer supports.

//   // Click the save button to export the diagram as JSON
//   await page.click('#save');

//   // Optionally: Simulate a file download and validate its content
//   // This requires additional setup to handle file downloads with Playwright
//   // Example: Create a file download handler

//   const [download] = await Promise.all([
//     page.waitForEvent('download'), // Wait for the download event to be triggered
//     page.click('#save'), // This should trigger the download
//   ]);

//   // Save the downloaded file to a specific path
//   const path = await download.path();
//   console.log(`Downloaded file path: ${path}`);

//   // Optionally: Read the file and perform validation
//   const fs = require('fs');
//   const fileContent = fs.readFileSync(path, 'utf-8');
//   console.log(`Downloaded file content: ${fileContent}`);
  
//   // Add an assertion to verify the JSON content of the saved file
//   expect(fileContent).toContain('dmn'); // Example: Check that the file contains DMN-related content

//   // Close the browser
//   await browser.close();
// });
