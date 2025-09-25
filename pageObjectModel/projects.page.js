import { expect } from '@playwright/test';
const cssQuote = (s = '') => String(s).replace(/["\\]/g, '\\$&');

export class ProjectsPage {

  /** 
  * @param {import ('@playwright/test').Page} page
  */

 constructor (page) {
    this. page = page;
    this. logoutButton = page.getByRole('button', { name: "Logout" });  
 }
 
 async openSection(sectionTitle) {
   const item = this.page.getByRole('button', { name: new RegExp(sectionTitle, 'i') })          
   await item.click();
}

async expectOnSection(pageTitle) {
   const h1 = this.page.locator('h1', { hasText: pageTitle });
   await expect(h1).toBeVisible();
}

async column(columnName) {
   const root = this.page
     .locator(`div:has(> h2:has-text("${cssQuote(columnName)}"))`)  
   return root;
 }

async cardByTitleInColumn(cardTitle, columnName) {
  const col = this.column(columnName);
  return col
    .locator(`div:has(> h3:has-text("${cssQuote(cardTitle)}"))`);
}

async expectCardVisibleInColumn(cardTitle, columnName) {
   const card = this.cardByTitleInColumn(cardTitle, columnName);
   await expect(card).toBeVisible();
   return card;
 }

 async expectCardHasTags(cardLocator, tags = []) {
   for (const tag of tags) {
     const chip = cardLocator
       .locator(`div:has(> span:has-text("${cssQuote(tag)}")) , span:has-text("${cssQuote(tag)}") , button:has-text("${cssQuote(tag)}")`)
       .first();
     await expect(chip).toBeVisible();
   }
 }
}
