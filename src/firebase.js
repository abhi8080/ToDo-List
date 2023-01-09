import createSavedToDos from "./index";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import ToDo from "./toDo";

import { getFirebaseConfig } from "./firebase-config";

initializeApp(getFirebaseConfig());
const db = getFirestore();
const colRef = collection(db, "todos");

export async function storeProjectsAndToDos(key, toDo) {
  await setDoc(doc(db, "todos", `${key}`), {
    title: toDo.title,
    description: toDo.description,
    dueDate: toDo.dueDate,
    priority: toDo.priority,
  });
}

export async function fetchFromStorage() {
  getDocs(colRef)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        let project = doc.id.substring(10, doc.id.length);
        let id = doc.id.substring(0, 1);

        const todo = {
          title: doc.data().title,
          description: doc.data().description,
          dueDate: doc.data().dueDate,
          priority: doc.data().priority,
        };
        createSavedToDos(project, todo, id);
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = JSON.parse(localStorage.getItem(key));

    let project = key.substring(10, key.length);
    let id = key.substring(0, 1);

    createSavedToDos(project, value, id);
  }
}
export function updateProjects(project, deleteProject) {
  getDocs(colRef).then((snapshot) => {
    let totalTodos = 0;
    let count = 0;
    snapshot.docs.forEach((document) => {
      if (document.id.includes(`${project.id}`)) {
        totalTodos++;
      }
    });
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((document) => {
        if (document.id.includes(`${project.id}`)) {
          count++;
          const docRef = doc(db, "todos", document.id);
          if (!deleteProject) {
            deleteDoc(docRef).then(() => {
              if (count === totalTodos) updateContainers(project);
            });
          } else {
            deleteDoc(docRef);
          }
        }
      });
    });
  });
}

function updateContainers(project) {
  let containers = project.getElementsByClassName("container");
  let extendedContent = project.getElementsByClassName("collapsible");

  for (let i = 0; i < containers.length; i++) {
    containers
      .item(i)
      .getElementsByClassName("deleteButton")
      .item(0).id = `${i}deleteButton${project.id}`;
    containers
      .item(i)
      .getElementsByClassName("containerTitle")
      .item(0).id = `${i}title${project.id}`;
    containers
      .item(i)
      .getElementsByClassName("containerPriority")
      .item(0).id = `${i}priority${project.id}`;
    containers
      .item(i)
      .getElementsByClassName("containerdueDate")
      .item(0).id = `${i}dueDate${project.id}`;

    extendedContent.item(i).id = `${i}container${project.id}`;
    extendedContent
      .item(i)
      .getElementsByClassName("done-button")
      .item(0).id = `${i}edit${project.id}`;
    extendedContent
      .item(i)
      .getElementsByClassName("edit-button")
      .item(0).id = `${i}done${project.id}`;
    const title = containers
      .item(i)
      .getElementsByClassName("containerTitle")
      .item(0).innerHTML;
    const description = extendedContent
      .item(i)
      .getElementsByClassName("detailDescription")
      .item(0).innerHTML;
    const dueDate = extendedContent
      .item(i)
      .getElementsByClassName("detailDueDate")
      .item(0).value;
    const priority = extendedContent
      .item(i)
      .getElementsByClassName("detailPriority")
      .item(0).innerHTML;
    const toDo = new ToDo(title, description, dueDate, priority);
    storeProjectsAndToDos(`${i}container${project.id}`, toDo);
  }
}
