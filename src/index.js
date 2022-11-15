import {
  storeProjectsAndToDos,
  fetchFromStorage,
  updateProjects,
} from "./localStorage";
import ToDo from "./toDo";

const newToDoButton = document.getElementById("newToDo");
let buttonNewProject = document.getElementById("newProject");
let buttonCreateProject = document.getElementById("addProjectButton");
const select = document.getElementById("Projects");
const content = document.getElementsByClassName("content");
let mainSection = document.getElementById("mainsection");
const addToDoButton = document.getElementById("addToDoButton");

buttonCreateProject.addEventListener("click", createProject);

function createProject() {
  const input = document.getElementById("name").value;
  if (input == "") alert("A project must have a name!");
  else {
    const projectName = document.getElementById("name").value;
    addOptionToDropDownMenu(projectName);
    const content = document.createElement("div");
    createProjectPage(projectName, content);
    createDeleteProjectButton(projectName, content);
    document.getElementById("name").value = "";
  }
}

function addOptionToDropDownMenu(projectName) {
  document.querySelectorAll("select").forEach((element) => {
    const project = document.createElement("option");
    project.value = `${projectName}`;
    project.innerHTML = `${projectName}`;
    element.appendChild(project);
  });
}

function createProjectPage(projectName, content) {
  content.classList.add("content");
  content.classList.add("hidden");
  content.classList.add("toDoList");
  content.id = `${projectName}`;
  mainSection.appendChild(content);
}

function createDeleteProjectButton(projectName, content) {
  const deleteProjectButton = document.createElement("button");
  deleteProjectButton.classList.add("deleteProjectButton");
  deleteProjectButton.id = `deleteButton${projectName}`;
  deleteProjectButton.innerHTML = "Delete project";
  content.appendChild(deleteProjectButton);
}

buttonNewProject.addEventListener("click", displayNewProjectPage);
function displayNewProjectPage() {
  Array.prototype.forEach.call(content, function (content) {
    if (content.classList.contains("newProject"))
      content.classList.remove("hidden");
    else content.classList.add("hidden");
  });
}

/**
 * This addEventListener is for checking if some of the dynamically created elements have been clicked.
 */
document.body.addEventListener("click", (e) => {
  function areEditedFieldsValid(parentContainer) {
    if (
      parentContainer.querySelector(".detailTitle").innerHTML == "" ||
      parentContainer.querySelector(".detailDescription").innerHTML == "" ||
      parentContainer.querySelector(".detailDueDate").value == "" ||
      parentContainer.querySelector(".detailPriority").innerHTML == ""
    ) {
      alert("Please fill all the fields!");
      return false;
    } else if (
      parentContainer
        .querySelector(".detailPriority")
        .innerHTML.toUpperCase() != "HIGH" &&
      parentContainer
        .querySelector(".detailPriority")
        .innerHTML.toUpperCase() != "MEDIUM" &&
      parentContainer
        .querySelector(".detailPriority")
        .innerHTML.toUpperCase() != "LOW"
    ) {
      console.log(
        parentContainer.querySelector(".detailPriority").innerHTML.toUpperCase()
      );
      alert("The priority must be valid!");
      return false;
    }
    return true;
  }
  if (e.target.classList.contains("containerTitle")) {
    let id = e.target.id[0];
    let project = e.target.parentNode.parentNode.id;
    const extendedContent = document.getElementById(`${id}container${project}`);
    if (extendedContent.style.display === "none")
      extendedContent.style.display = "block";
    else extendedContent.style.display = "none";
  } else if (e.target.classList.contains("edit-button")) {
    let id = e.target.id[0];
    let project = e.target.parentNode.parentNode.id;
    let parentContainer = document.getElementById(`${id}container${project}`);
    const paragraphs = parentContainer.getElementsByClassName("details");
    Array.prototype.forEach.call(paragraphs, function (paragraph) {
      if (!paragraph.classList.contains("detailDueDate")) {
        paragraph.contentEditable = true;
        paragraph.style.backgroundColor = "#dddbdb";
      }
    });
  } else if (e.target.classList.contains("done-button")) {
    let id = e.target.id[0];
    let project = e.target.parentNode.parentNode;
    let parentContainer = document.getElementById(
      `${id}container${project.id}`
    );
    if (areEditedFieldsValid(parentContainer)) {
      const paragraphs = parentContainer.getElementsByClassName("details");
      Array.prototype.forEach.call(paragraphs, function (paragraph) {
        if (!paragraph.classList.contains("detailDueDate")) {
          paragraph.contentEditable = false;
          paragraph.style.backgroundColor = "lightblue";
        }
      });

      updateToDoList(id, parentContainer, project.id);
      updateProjects(project);
    }
  } else if (e.target.classList.contains("deleteButton")) {
    const project = e.target.parentNode.parentNode;
    const id = e.target.id[0];
    deleteToDo(id, project);
  } else if (e.target.classList.contains("deleteProjectButton")) {
    const project = e.target.parentNode;
    deleteProject(project);
  }
});

/**
 * This function is for updating the to do list, after it has been edited.
 */
function updateToDoList(id, parentContainer, project) {
  let title = document.getElementById(`${id}title${project}`);
  title.innerHTML = parentContainer.querySelector(".detailTitle").innerHTML;
  setTimeout(() => {
    window.location.reload();
  }, "800");
}
function deleteToDo(id, project) {
  const container = document.getElementById(`${id}title${project.id}`);
  container.closest("div").remove();

  document.getElementById(`${id}container${project.id}`).remove();

  console.log(project);

  updateProjects(project, false);
}

function deleteProject(project) {
  console.log(project);
  document.getElementById(`${project.id}`).remove();
  removeProjectFromDropDownMenu(project.id);
  updateProjects(project, true);
}

function removeProjectFromDropDownMenu(project) {
  document
    .querySelectorAll(`option[value=${project}]`)
    .forEach((element) => element.remove());
}

newToDoButton.addEventListener("click", displayNewToDoPage);

function displayNewToDoPage() {
  Array.prototype.forEach.call(content, function (content) {
    if (content.classList.contains("newToDoList"))
      content.classList.remove("hidden");
    else content.classList.add("hidden");
  });
}

function createSavedProjects(projectName) {
  addOptionToDropDownMenu(projectName);
  const content = document.createElement("div");
  createProjectPage(projectName, content);
  createDeleteProjectButton(projectName, content);
}

window.onload = fetchFromStorage();

addToDoButton.addEventListener("click", createNewToDo);

function areInputFieldsValid() {
  if (
    document.getElementById("title").value == "" ||
    document.getElementById("description").value == "" ||
    document.getElementById("dueDate").value == "" ||
    document.getElementById("priority").value == ""
  ) {
    alert("Please fill all the fields!");
    return false;
  } else if (
    document.getElementById("priority").value.toUpperCase() != "HIGH" &&
    document.getElementById("priority").value.toUpperCase() != "MEDIUM" &&
    document.getElementById("priority").value.toUpperCase() != "LOW"
  ) {
    alert("The priority must be valid!");
    return false;
  } else return true;
}

function createNewToDo() {
  if (areInputFieldsValid()) {
    const select = document.getElementById("addToProject");
    let project = select.value;

    const toDo = new ToDo(
      document.getElementById("title").value,
      document.getElementById("description").value,
      document.getElementById("dueDate").value,
      document.getElementById("priority").value
    );

    const id = document
      .getElementById(`${project}`)
      .getElementsByClassName("container").length;

    storeProjectsAndToDos(`${id}container${project}`, toDo);
    createElementsForToDoTask(project, id, toDo);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("dueDate").value = "";
    document.getElementById("priority").value = "";
  }
}

export default function createSavedToDos(project, savedToDo, id) {
  const toDo = new ToDo(
    savedToDo.title,
    savedToDo.description,
    savedToDo.dueDate,
    savedToDo.priority
  );

  const projectAlreadyExists = document.getElementById(`${project}`);

  if (!projectAlreadyExists) createSavedProjects(project);

  createElementsForToDoTask(project, id, toDo);
}

function createElementsForToDoTask(project, id, toDo) {
  var node_1 = document.createElement("DIV");
  node_1.setAttribute("class", "container");

  document.getElementById(`${project}`).appendChild(node_1);

  const deletebutton = document.createElement("button");
  deletebutton.classList.add("deleteButton");
  deletebutton.id = `${id}deleteButton${project}`;
  deletebutton.innerHTML = "x";

  node_1.appendChild(deletebutton);

  var node_2 = document.createElement("SPAN");
  node_2.setAttribute("id", `${id}title${project}`);
  node_2.setAttribute("class", "containerTitle");
  node_2.innerHTML = toDo.title;
  node_1.appendChild(node_2);

  var node_4 = document.createElement("SPAN");
  node_4.setAttribute("id", `${id}priority${project}`);
  node_4.setAttribute("class", "containerPriority");
  node_4.innerHTML = toDo.priority.toUpperCase();

  if (toDo.priority.toUpperCase() == "LOW") node_4.classList.add("low");
  else if (toDo.priority.toUpperCase() == "MEDIUM")
    node_4.classList.add("medium");
  else node_4.classList.add("high");

  node_1.appendChild(node_4);

  var node_6 = document.createElement("SPAN");
  node_6.setAttribute("id", `${id}dueDate${project}`);
  node_6.setAttribute("class", "containerdueDate");
  node_6.innerHTML = toDo.dueDate.replace("T", "&nbsp &nbsp &nbsp");
  node_1.appendChild(node_6);

  var node_8 = document.createElement("DIV");
  node_8.setAttribute("style", "display:none;");
  node_8.setAttribute("class", "collapsible");
  node_8.setAttribute("id", `${id}container${project}`);

  document.getElementById(`${project}`).appendChild(node_8);

  var node_9 = document.createElement("P");
  node_9.setAttribute("class", "heading");
  node_8.appendChild(node_9);

  var node_10 = document.createTextNode(new String("Title"));
  node_9.appendChild(node_10);

  var node_11 = document.createElement("BUTTON");
  node_11.setAttribute("id", `${id}edit${project}`);
  node_11.setAttribute("class", "done-button");
  node_8.appendChild(node_11);

  var node_12 = document.createTextNode(new String("Done"));
  node_11.appendChild(node_12);

  var node_13 = document.createElement("BUTTON");
  node_13.setAttribute("id", `${id}done${project}`);
  node_13.setAttribute("class", "edit-button");
  node_8.appendChild(node_13);

  var node_14 = document.createTextNode(new String("Edit"));
  node_13.appendChild(node_14);

  var node_15 = document.createElement("P");
  node_15.setAttribute("class", "details detailTitle");
  node_15.innerHTML = toDo.title;

  node_8.appendChild(node_15);

  var node_17 = document.createElement("P");
  node_17.setAttribute("class", "heading");
  node_8.appendChild(node_17);

  var node_18 = document.createTextNode(new String("Description"));
  node_17.appendChild(node_18);

  var node_19 = document.createElement("P");
  node_19.setAttribute("class", "details detailDescription");
  node_19.innerHTML = toDo.description;

  node_8.appendChild(node_19);

  var node_21 = document.createElement("P");
  node_21.setAttribute("class", "heading");
  node_8.appendChild(node_21);

  var node_22 = document.createTextNode(new String("Due Date"));
  node_21.appendChild(node_22);

  var node_23 = document.createElement("input");
  node_23.type = "datetime-local";
  node_23.setAttribute("class", "details detailDueDate");
  node_23.contenteditable = "false";
  node_23.value = toDo.dueDate;
  node_8.appendChild(node_23);

  var node_25 = document.createElement("P");
  node_25.setAttribute("class", "heading");
  node_8.appendChild(node_25);

  var node_26 = document.createTextNode(new String("Priority"));
  node_25.appendChild(node_26);

  var node_27 = document.createElement("P");
  node_27.setAttribute("class", "details detailPriority");
  node_27.innerHTML = toDo.priority;
  node_8.appendChild(node_27);
}

select.addEventListener("click", function displaySelectedProjectPage(e) {
  if (e.target.id == "Projects") {
    Array.prototype.forEach.call(content, function (content) {
      if (e.target.value == content.id) {
        content.classList.remove("hidden");
      } else {
        content.classList.add("hidden");
      }
    });
  }
});
