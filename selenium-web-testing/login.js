
const {Builder, By, Key, until,Select} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chai = require('chai');
const expect = chai.expect;

require('chromedriver');



  let options = new chrome.Options();

  options.addArguments('--user-data-dir=/new/path');
  options.addArguments('--no-sandbox'); // Disable sandboxing for root user
options.addArguments('--disable-dev-shm-usage'); // Optional: helps with memory limits in Docker
options.addArguments('--headless'); // Run Chrome in headless mode
options.addArguments('--disable-software-rasterizer'); // Disable software rendering
options.addArguments('--disable-gpu'); // Disable GPU acceleration (optional)

// Define an async function to start the browser
async function startBrowser() {
  const driver = await new Builder()
  .forBrowser('chrome')
  .setChromeOptions(options)
  .build();
  return driver;
}
    // function to test the login - enter details and click login button
async function testLoginPage(driver) { 
    // Navigate to the website you want to test
    await driver.get('http://host.docker.internal:80');
    
    // Wait until the page title is loaded
    await driver.wait(until.titleContains('Login Page'), 220000);

   // Get an element by its ID
    let username = await driver.findElement(By.id('username'));
    // Clear any existing text (optional) and enter new data
    await username.clear();  // Clears the input field
    await username.sendKeys('admin');  // Sends data to the input field
   
    let password = await driver.findElement(By.id('password'));
    await password.clear();  
    await password.sendKeys('password'); 
    
    // Find the submit button by its ID and click it
    let submitButton = await driver.findElement(By.id('submit'));
    await submitButton.click();
    
    console.log('Login Successfully');
}
  // function to test the login - enter details and click login button
  async function testNavigatedToRegistrationPage(driver) { 
   //  Wait until the page has navigated (for example, wait for a specific element on the new page)
   await driver.wait(until.urlContains('application'), 10000); // Wait until the URL contains 'application'
   const currentUrl = await driver.getCurrentUrl(); // Get the current URL

   //  Verify that the URL changed (or verify an element on the new page)
   expect(currentUrl).to.include('application'); // You can modify this URL check based on your app's URL after login
   console.log('url of new page is '+currentUrl);
}
 // function to test the login - enter details and click login button
 async function testDataEntry(driver) { 

    const firstname = await driver.findElement(By.id('firstName'));
    await firstname.sendKeys('Dona'); 

    const lastName = await driver.findElement(By.id('lastName'));
    await lastName.sendKeys('Shajan'); 

    const dateInput = await driver.findElement(By.id('dob'));
    await dateInput.sendKeys('1999-01-01'); 

    const genderSelectElement = await driver.findElement(By.id('gender'));
    const genderSelect = new Select(genderSelectElement);
    await genderSelect.selectByVisibleText('Female'); 

    const contactNumber = await driver.findElement(By.id('contactNumber'));
    await contactNumber.sendKeys('070-2222-3333'); 

    const email = await driver.findElement(By.id('email'));
    await email.sendKeys('email@gmail.com'); 
	 
    const insuranceTypeSelectElement = await driver.findElement(By.id('insuranceType'));
    const insuranceTypeSelect = new Select(insuranceTypeSelectElement);
    await insuranceTypeSelect.selectByVisibleText('Life Insurance'); 

    const olicyStartDate = await driver.findElement(By.id('policyStartDate'));
    await olicyStartDate.sendKeys('2025-01-01'); 

    const comments = await driver.findElement(By.id('comments'));
    await comments.sendKeys('Hai '); 
    
     // Find the submit button by its ID and click it
     let submitButton = await driver.findElement(By.id('submit'));
     await submitButton.click();
     
     console.log('Details added successfully');
  
}

// Main function to run all the test steps
async function runTests() {
  const driver = await startBrowser(); // Start the browser

  try {
    await testLoginPage(driver); // Step 1: navigate to login page enter details and login succesfully
    await testNavigatedToRegistrationPage(driver); //Step 2: check whether navigated to new page
    await testDataEntry(driver);  //enter policydetails to the page and submit application

  } catch (error) {
    console.error('Test failed:', error); // Catch and log any errors
  } finally {
    await driver.quit(); // Always quit the browser after the tests
  }
}

// Execute the tests
runTests();
