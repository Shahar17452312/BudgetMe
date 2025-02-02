import { By, until, } from "selenium-webdriver";

async function RegisterPageTest(driver,username,email,password,budget){
  try{
    await driver.wait(until.elementLocated(By.name("username"))).sendKeys(username);
    await driver.wait(until.elementLocated(By.name("email"))).sendKeys(email);
    await driver.wait(until.elementLocated(By.name("password"))).sendKeys(password);
    await driver.wait(until.elementLocated(By.name("budget"))).sendKeys(budget);
    await driver.wait(until.elementLocated(By.css("button[class='register-btn']"))).click()
  }
  catch(error){
    console.error("error: ",error.message);
  }
}



/*async function HomePageTest(driver,date,category,description,amount) {
    
    
}*/

export default RegisterPageTest;