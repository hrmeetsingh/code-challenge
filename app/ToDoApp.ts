import { Locator, Page, expect } from "@playwright/test";
import { TaskList } from "../components/TaskList";
import { Footer } from "../components/Footer";
import { Task } from "../components/Task";
import { TaskInput } from "../components/TaskInput";

export class ToDoApp {
  readonly page: Page;
  readonly header: TaskInput;
  readonly footer: Footer;
  readonly taskList: TaskList;
  readonly locator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locator = this.page.locator("body");
    this.header = new TaskInput(this.locator);
    this.taskList = new TaskList(this.locator);
    this.footer = new Footer(this.page, this.locator);
  }

  async addANewToDo(text: string): Promise<void> {
    await this.header.inputText(text);
    await this.header.pressEnter();
  }

  async getTasksCount(): Promise<number> {
    return await this.taskList.getCountOfTasks();
  }

  async verifyTaskListCountMatch(number: number): Promise<void> {
    expect(await this.getTasksCount()).toBe(number);
  }

  async verifyTaskWithTextExist(text: string): Promise<void> {
    const elementCount = await this.taskList.countTaskWithText(text);
    expect(elementCount).not.toBe(0);
  }

  async editTask(oldText: string, newText: string): Promise<void> {
    const taskLocator = (await this.getTaskWithText(oldText)).getLocator();
    await (await taskLocator).dblclick();
    await this.taskList.editableTask.fill(newText);
    await this.taskList.locator.press("Enter");
  }

  async verifyFooterTaskStatusMatches(text: string): Promise<void> {
    expect(await this.footer.getLeftItemsText()).toMatch(text);
  }

  async filterActiveTasks(): Promise<void> {
    await this.footer.clickButtonWithText("Active");
  }

  async filterCompletedTasks(): Promise<void> {
    await this.footer.clickButtonWithText("Completed");
  }

  async getTaskWithText(searchText: string): Promise<Task> {
    return await this.taskList.getTaskWithLabelText(searchText);
  }

  async clearCompletedTasks(): Promise<void> {
    await this.footer.clickClearCompleted();
  }

  async verifyLastItemHasText(text: string): Promise<void> {
    expect(await this.taskList.getLastItemText()).toBe(text);
  }

  async verifyTaskIsMarkedCompleted(taskText): Promise<void> {
    expect(await this.taskList.listItems.filter({hasText: taskText})).toHaveClass("completed", {timeout: 5000});
  }

  async verifyTaskDoesNotExist(taskText): Promise<void> {
    expect(await this.taskList.listItems.filter({ hasText: taskText })).toHaveCount(0, { timeout: 10000 });
  }

  async completeTask(taskText: string): Promise<void> {
    await (await this.getTaskWithText(taskText)).completeTask();
  }

  async deleteTask(taskText: string): Promise<void> {
    await (await this.getTaskWithText(taskText)).deleteTask();
  }
}
