import { Page } from "@playwright/test";

export default class TodoPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  private get welcomeMessage() {
    return '[data-testid="welcome"]';
  }

  getWelcomeMessage() {
    return this.page.locator(this.welcomeMessage);
  }
}
