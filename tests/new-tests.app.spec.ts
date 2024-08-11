import test from "../lib/BaseTest";

test.beforeEach(async ({ page, todoApp }) => {
  await page.goto("https://todomvc.com/examples/react/dist");
});

// Test # 1 - Add a new ToDo item
test.describe("Test#1- Create ToDo item", () => {
  test("get text", async ({ todoApp }) => {
    await todoApp.addANewToDo("Task1");
    await todoApp.addANewToDo("Task2");
    await todoApp.addANewToDo("Task3");
    await todoApp.verifyTaskListCountMatch(3);
    await todoApp.verifyTaskWithTextExist("Task2");
    await todoApp.verifyFooterTaskStatusMatches("3 items left");
    await todoApp.verifyLastItemHasText("Task3");
  });
});

// Test # 2 - Edit an existing todo item
test.describe("Test#2- Edit ToDo item", () => {
  test("get text", async ({ page, todoApp }) => {
    await todoApp.addANewToDo("Task1");
    await todoApp.addANewToDo("Task2");
    await todoApp.addANewToDo("Task3");
    await todoApp.verifyFooterTaskStatusMatches("3 items left");
    await todoApp.editTask("Task2","New Task 2")
    await todoApp.verifyTaskWithTextExist("New Task 2");
  });
});

// Test # 3 - Delete a todo item using cross
test.describe("Test#3 - Delete tasks", () => {
  test("Delete task", async ({ page, todoApp }) => {
    await todoApp.addANewToDo("Task1");
    await todoApp.addANewToDo("Task2");
    await todoApp.addANewToDo("Task3");
    await todoApp.verifyTaskWithTextExist("Task1");
    await todoApp.verifyFooterTaskStatusMatches("3 items left");
    await (await todoApp.getTaskWithText("Task1")).deleteTask();
    await todoApp.verifyFooterTaskStatusMatches("2 items left");
  });
});

// Test # 4 - Mark a task as completed
test.describe("Test#4- Mark task as completed", () => {
  test("get text", async ({ page, todoApp }) => {
    await todoApp.addANewToDo("Task1");
    await todoApp.addANewToDo("Task2");
    await todoApp.addANewToDo("Task3");
    await todoApp.verifyFooterTaskStatusMatches("3 items left");
    await (await todoApp.getTaskWithText("Task1")).completeTask();
    await todoApp.verifyFooterTaskStatusMatches("2 items left");
    await todoApp.verifyTaskIsCompleted("Task1");
    // await todoApp.verifyItemShowsWithGreenCheck("text1");
  });
});

// Test # 5 - Given the active list, only the active tasks are shown
test.describe("Test#5- Filter active list", () => {
  test("get text", async ({ page, todoApp }) => {
    await todoApp.addANewToDo("Task1");
    await todoApp.addANewToDo("Task2");
    await todoApp.addANewToDo("Task3");
    await (await todoApp.getTaskWithText("Task1")).completeTask();
    await todoApp.verifyTaskListCountMatch(3);
    await todoApp.filterActiveTasks();
    await todoApp.verifyTaskListCountMatch(2);
    await todoApp.verifyTaskDoesNotExist("Task1");
  });
});

// Test # 6 - When clear completed is clicked, item removed (note that completed isnt moved to the completed list after clearing)
test.describe("Test#6- Clear completed tasks", () => {
  test("get text", async ({ page, todoApp }) => {
    await todoApp.addANewToDo("Task1");
    await todoApp.addANewToDo("Task2");
    await todoApp.addANewToDo("Task3");
    await (await todoApp.getTaskWithText("Task1")).completeTask();
    await todoApp.verifyTaskListCountMatch(3);
    await todoApp.clearCompletedTasks();
    await todoApp.verifyTaskListCountMatch(2);
  });
});
