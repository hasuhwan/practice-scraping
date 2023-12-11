const puppeteer = require("puppeteer");
const fs = require("fs");
async function use() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.goto("https://vibe.naver.com/chart/total");

  const songs = await page.evaluate(() => {
    return Array.from(
      document.querySelectorAll(".tracklist tbody tr"),
      (el) => ({
        rank: el.querySelector(".rank span").innerText,
        song: el.querySelector(".song .link_text").innerText,
        artist: el.querySelector(".artist .link_artist span").innerText,
      })
    );
  });
  console.log(songs);
  fs.writeFile("top100list.json", JSON.stringify(songs), (err) => {
    if (err) throw err;
    console.log("파일 저장");
  });

  await browser.close();
}
use();
