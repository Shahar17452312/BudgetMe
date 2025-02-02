import RegisterPageTest from "./utils.js";
import { Builder, Browser,until,By } from "selenium-webdriver";

async function startBot() {
    const driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().setTimeouts({implicit:1000})
    try {
        await driver.get("http://localhost:5173");
        const register=await driver.wait(until.elementLocated(By.css("button[class='register-btn']")));
        await register.click();
        await RegisterPageTest(driver,"shahar","123@gmail.com","123","50");
        

    } catch (e) {
        console.log("Error opening website: " + e.message);
    } finally {
        await driver.quit();
    }
}

startBot();
