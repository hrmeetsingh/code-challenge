import { Locator } from "@playwright/test";

export class TaskInput {
  readonly parentLocator: Locator;
  readonly locator: Locator;

  constructor(parentLocator: Locator) {
    this.parentLocator = parentLocator;
    this.locator = this.parentLocator.getByPlaceholder('What needs to be done?');
  }


  async getText(): Promise<string> {
    return (await this.locator.textContent()) || "";
  }

  async inputText(text: string): Promise<void> {
    await this.locator.fill(text);
  }

  async pressEnter(): Promise<void> {
    await this.locator.press("Enter");
  }
}
