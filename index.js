const fs = require('fs');
const puppeteer = require('puppeteer');

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.traversymedia.com');
    
    // Get a screenshot
    // await page.screenshot({path: 'frontPage.png'});
    
    // Get a screenshot of the page
    // await page.screenshot({path: 'frontPage.png', fullPage: true});

    // Get a screenshot of the page
    // await page.pdf({path: 'frontPage.pdf', format: 'A4'});

    //  Get HTML of the page
    // const html = await page.content();
    // console.log(html);

  //  Get text of the page
//   const title = await page.evaluate(() => document.title);
//   console.log(title);


  //  Get text of the page
//   const text = await page.evaluate(() => document.body.innerText);
//   console.log(text);

//   //  Get all links
//   const links = await page.evaluate(() =>
//     Array.from(document.querySelectorAll('a'), (e) => e.href)
//   );
//   console.log(links);

//  Get courses
//   const courses = await page.evaluate(() =>
//     Array.from(document.querySelectorAll('#cscourses .card'), (e) => ({
//       title: e.querySelector('.card-body h3').innerText,
//       level: e.querySelector('.card-body .level').innerText,
//       url: e.querySelector('.card-footer a').href
//     }))
//   );
//   console.log(courses);
  

//  Get courses
const courses = await page.$$eval('#cscourses .card', (elements) =>
    elements.map((e) => ({
      title: e.querySelector('.card-body h3').innerText,
      level: e.querySelector('.card-body .level').innerText,
      url: e.querySelector('.card-footer a').href
    }))
  );
//   console.log(courses);

// Save data to JSON file 
fs.writeFile('courses.json', JSON.stringify(courses), (err) => {
    if (err) throw err;
    console.log('File saved');
  });
await browser.close();
}

run();
