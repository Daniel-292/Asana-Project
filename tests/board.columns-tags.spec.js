import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObjectModel/login.page";
import { ProjectsPage } from "../pageObjectModel/projects.page";
import scenarios from "../testData/scenarios.json";

for (const s of scenarios) {
  test(`${s.id} — ${s.description}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    const projectsPage = new ProjectsPage(page);

    await test.step("1) Login", async () => {
      await page.goto("/");
      await loginPage.login(s.login.user, s.login.pass);
    });

    await test.step("2) Navigate to target section", async () => {
      if (s.navigate?.section) {
        await projectsPage.openSection(s.navigate.section).catch(() => {});
      }
      if (s.navigate?.title) {
        await projectsPage.expectOnSection(s.navigate.title);
      }
    });

    await test.step("3) Locate card in specified column", async () => {
      return await projectsPage.expectCardVisibleInColumn(s.card.title, s.card.column);
    });

    await test.step("4) Verify card tags", async () => {
      const card = projectsPage.cardByTitleInColumn(s.card.title, s.card.column);
      await projectsPage.expectCardHasTags(card, s.card.tags);
    });
  });
}
