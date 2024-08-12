import { Page, Locator } from "@playwright/test";

export class Footer {
  readonly parentLocator: Locator;
  readonly locator: Locator;
  readonly TODOCOUNT: Locator;
  readonly CLEAR_COMPLETED_STRING: string;

  constructor(page: Page, parentLocator: Locator) {
    this.parentLocator = parentLocator;
    this.locator = page.locator("footer.footer");
    this.TODOCOUNT = this.locator.locator("span.todo-count");
    this.CLEAR_COMPLETED_STRING = 'Clear completed';
  }

  async getLeftItemsText(): Promise<string> {
    return (await this.TODOCOUNT.textContent()) || "";
  }

  async clickButtonWithText(buttonText: string): Promise<void> {
    await this.locator.locator("li").filter({ hasText: buttonText }).click();
  }

  async clickClearCompleted(): Promise<void> {
    await this.locator.getByText(this.CLEAR_COMPLETED_STRING).click();
  }
}
