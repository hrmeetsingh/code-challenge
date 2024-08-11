import { Locator, Page } from "@playwright/test";

export class Task {
  readonly parentLocator: Locator;
  readonly locator: Locator;
  readonly listItems: Locator;
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

  async isCompleted(): Promise<void>{
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

  async getTaskLocatorWithText(taskText: string): Promise<Locator>{
    return await this.locator.filter({hasText: taskText});
  }

  // async selectTask(taskText: string): Promise<Locator>{
  //   return this.locator
  // }

  async editTask(taskText: string): Promise<void> {
    // console.log(await this.locator.isVisible());
    // await this.locator.getByTestId("todo-item-label").dblclick();
    // const task = await this.locator.filter({hasText: taskText}).waitFor();
    // await task.dblclick();
    // await this.locator.getByTestId("text-input").fill(taskText);
    // const element = await this.page.getByTestId("todo-item").nth(1).waitFor();
    // await this.page.getByTestId("todo-item").nth(1).dblclick();
    // await this.page.getByTestId("text-input").press(taskText);
    // const todoItems = this.page.getByRole("listitem");
    // const secondTodo = todoItems.filter({ hasText: "Task1" });
    // await secondTodo.dblclick();
    // expect(secondTodo.getByRole("textbox", { name: "Edit" })).toHaveValue(
    //   TODO_ITEMS[1],
    // );
  }
}
