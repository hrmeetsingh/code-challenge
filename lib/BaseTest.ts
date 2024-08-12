import { TestInfo, test as baseTest } from "@playwright/test";
import { ToDoApp } from "@app/ToDoApp";

const test = baseTest.extend<{
  todoApp: ToDoApp;
}>({
  todoApp: async ({ page }, use) => {
    await use(new ToDoApp(page));
  },
});

export default test;
