const {expect} = require('chai');
const puppeteer = require('puppeteer');

describe('First tests with puppeteer:', function () {
  // Define global variables
  let browser
  let page

  before(async function () {
    browser = await puppeteer.launch()
    page = await browser.newPage()
  })

  beforeEach(async function () {
    page = await browser.newPage()
    await page.goto('http://localhost:9000')
  })

  afterEach(async function () {
    await page.close()
  })

  after(async function () {
    await browser.close()
  })
})
