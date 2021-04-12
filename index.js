const taskTemplate = `
    <div class = "task">
    <div class = "top-side-task">
    <p class = "task-title" >{title}</p>
    <i class = "delete-btn fas fa-times-circle"></i> 
    </div> 
    <div class = "task-details">
    <div class = "task-info" >
    <p class = "task-code" >{tag}</p>
    </div> 
    <div class = "task-status">
    <div class = "task-type">{type}</div> 
    <div class = "task-priority">{priority}</div> 
    </div> 
    </div> 
    </div>`;

const ideas = document.querySelector(".columns-container section:first-child .tasks");
const addTaskButton = document.getElementById("addTask");

function compileToNode(domString) {
    const div = document.createElement("div");
    div.innerHTML = domString;

    return div.firstElementChild;
}

function compileTaskTemplate(title, tag, template) {
    const compiledTemplate = template
        .replace("{title}", title)
        .replace("{tag}", tag);
    return compileToNode(compiledTemplate);
}

function addTask(title, tag) {
    const task = compileTaskTemplate(title, tag, taskTemplate);
    backlog.appendChild(task);

    // addTaskButton.removeEventListener("click", addTask);
}

addTaskButton.addEventListener("click", showForm);

function showForm() {
    const h1 = Array.from(document.getElementsByTagName('h1')).shift();
    const form = h1.insertAdjacentElement("afterend", showAddForm());

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const {
            target
        } = event;

        const title = target.querySelector('[name="title"]');
        const tag = target.querySelector('[name="tag"]');

        // todo validate data!!
        addTask(title.value, tag.value);
    });
}

function showAddForm() {
    const formString = `
    <form id="addTaskForm" action="" method="POST">
      <label for="title">Title</label>
      <input type="text" name="title" id="title">
      <label for="tag">Tag</label>
      <select name="tag" id="tag">
        <option value="study">STUDY</option>
        <option value="challenge">CHALLENGE</option>
        <option value="project">PROJECT</option>
        <option value="important">IMPORTANT</option>
        <option value ="bugs">BUGS</option>
      </select>
      <button name="submit" type="submit">ADD</button>
    </form>
  `.trim();

    return compileToNode(formString);
}
