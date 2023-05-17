const readline = require('readline');
const readlineSync = require('readline-sync');

function Task(description, dueDate, priority) {
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.completed = false;
}

const tasks = [];

function addTask() {
  const description = readlineSync.question("Enter task descriotion: ")
  const dueDate = readlineSync.question("Enter due date just in this format yyyy-mm-dd: ")
  const priority = readlineSync.question("Enter task priority level by numbers: ")
  const t = new Task(description, dueDate, priority);
  tasks.push(t);
  console.log("The task added successfully ")
  showMenu();
}

function listAllTasks() {
  console.log("******All Tasks******")
  if (tasks.length == 0) {
    console.log("There is no tasks");
    showMenu();
    return;
  }
  tasks.forEach((tasks, index) => {
    const status = Task.completed ? "Done" : "not complate";
    console.log(`${index + 1}.[${status}] ${tasks.description} ("Due: ${tasks.dueData}), priority: ${tasks.priority})`);
  });
  showMenu();
}

function listCompletedTasks() {
  console.log("******Completed Tasks******");
  const completedTasks = tasks.filter(function (task) {
    return task.completed;
  });
  if (completedTasks.length > 0) {
    completedTasks.forEach(function (task, index) {
      console.log(`${index + 1}. ${task.description}`);
    });
  } else {
    console.log("There is no complated tasks")
  }
  showMenu();
}

function markAsDone() {
  const taskNumber = readlineSync.question("Enter the task number that you want to mark as done : ");
  if (isNaN(taskNumber) || taskNumber < 1 || taskNumber > tasks.length)
    console.log("Invalid number")
  else {
    tasks[taskNumber - 1].completed = true;
    console.log(`${tasks[taskNumber - 1].description}, marked as done`)
  }
  showMenu();
}

function deleteTask() {
  const taskNumber = readlineSync.question("Enter the task number that you want to delete: ");
  if (isNaN(taskNumber) || taskNumber < 1 || taskNumber > tasks.length)
    console.log("Invalid number")
  else {
    tasks.splice((taskNumber - 1), 1);
    console.log("The task deleted successfuly")
  }
  showMenu();
}

function sortByDueDate() {
  if (tasks.length < 2) {
    console.log("tasks a");
    showMenu();
    return;
  }
  tasks.sort(function (task1, task2) {
    const date1 = new Date(task1.dueDate);
    const date2 = new Date(task2.dueDate);
    return date1 - date2;
  });
  console.log("Tasks sorted by due date.");
  showMenu();

}

function sortByPriority() {
  tasks.sort(function (task1, task2) {
    return task1.priority - task2.priority;
  });
  console.log("Tasks sorted by priority.");

}

function clearAllTasks() {
  tasks = [];
  console.log("All tasks deleted")
  showMenu();
}

function existToDoList() {
  exist();
}

function showMenu() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  console.log('\n***************************');
  console.log('Welcome to JS TODO-APP');
  console.log('***************************');
  console.log('Select an action:');
  console.log('1) Add a new task');
  console.log('2) List all tasks');
  console.log('3) List completed tasks');
  console.log('4) Mark the task as done');
  console.log('5) Delete a task');
  console.log('6) Sort tasks by the due date');
  console.log('7) Sort tasks by priority');
  console.log('8) Clear all tasks');
  console.log('9) Exist');
  console.log('***************************');
  console.log('What\'s your choice?');

  const choice = readlineSync.questionInt("What's your choice? ");
  console.log("You entered: " + choice);

  switch (choice) {
    case 1:
      addTask();
      break;
    case 2:
      listAllTasks()();
      break;
    case 3:
      listCompletedTasks();
      break;
    case 4:
      markAsDone();
      break;
    case 5:
      deleteTask();
      break;
    case 6:
      sortByDueDate();
      break;
    case 7:
      sortByPriority();
      break;
    case 8:
      clearAllTasks();
      break;
    case 9:
      existToDoList();
      break;
    default:
      console.log('Invalid choice.');
      showMenu();
      break;
  }
}


showMenu();



