const express = require("express");
const { chromium } = require("playwright");

const app = express();

app.post("/rs", async (req,res)=>{

  const browser = await chromium.launch({
    headless:true,
    args:["--no-sandbox"]
  });

  const page = await browser.newPage();

  await page.goto("https://eservices.rs.ge/Login.aspx");

  await page.getByText("სატესტო მომხმარებლით ავტორიზაცია").click();

  await page.waitForLoadState("networkidle");

  await page.goto("https://eservices.rs.ge/WayBills.aspx");

  await page.getByText("ახალი ზედნადების დამატება").click();

  await browser.close();

  res.json({success:true});

});

app.listen(process.env.PORT || 3000);
