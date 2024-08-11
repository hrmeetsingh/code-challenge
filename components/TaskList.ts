import { Locator, Page } from "@playwright/test";
import { Task } from "./Task";

export class TaskList{
  readonly parentLocator: Locator;
  readonly locator: Locator;
  readonly listItems: Locator;

  constructor(parentLocator: Locator) {
    this.parentLocator = parentLocator;
    this.listItems = this.parentLocator.getByTestId('todo-item');
    this.locator = this.parentLocator.getByTestId('todo-list');
  }

  async getTaskWithLabelText(searchText: string): Promise<Task> {
    return new Task(this.locator, searchText);
  }

  async countTaskWithText(searchText: string): Promise<number> {
    return await this.listItems.filter({hasText: searchText}).count();
  }

  async getCountOfTasks(): Promise<number> {
    return await this.listItems.count();
  }

  async getLastItemText(): Promise<string> {
    return (
      (await this.parentLocator.getByTestId("todo-item").last().textContent()) || ""
    );
  }
}
