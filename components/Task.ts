import { Locator } from "@playwright/test";

export class Task {
  readonly parentLocator: Locator;
  readonly locator: Locator;
  readonly taskText: string;
  readonly CROSS_BUTTON: Locator;
  readonly CHECKBOX: Locator;
  readonly COMPLETED_CLASS: string;

  constructor(parentLocator: Locator, taskText: string) {
    this.parentLocator = parentLocator;
    this.taskText = taskText;
    this.locator = this.parentLocator
      .getByTestId("todo-item")
      .filter({ hasText: this.taskText });
    this.CROSS_BUTTON = this.locator.getByTestId('todo-item-button');
    this.CHECKBOX = this.locator.getByTestId('todo-item-toggle');
    this.COMPLETED_CLASS = 'completed';
  }

  async checkTask(): Promise<void> {
    await this.locator.check();
  }

  async getLocator(): Promise<Locator> {
    return await this.locator;
  }

  async isChecked(): Promise<boolean> {
    return await this.locator.isChecked();
  }

  async isCompleted(): Promise<void> {
    const classList = await this.locator.evaluate(el => [...el.classList]);
    console.log(classList);
  }

  async isVisible(): Promise<boolean> {
    return await this.locator.isVisible();
  }

  async deleteTask(): Promise<void> {
    await this.locator.hover();
    await this.CROSS_BUTTON.click();
  }

  async completeTask(): Promise<void> {
    await this.CHECKBOX.click();
  }

  async getTaskLocatorWithText(taskText: string): Promise<Locator> {
    return await this.locator.filter({ hasText: taskText });
  }
}
