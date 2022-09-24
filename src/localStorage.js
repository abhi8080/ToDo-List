import createSavedToDos from './index'

import { initializeApp } from 'firebase/app';
import {getFirestore , setDoc, doc, collection, getDocs, deleteDoc} from 'firebase/firestore'
import ToDo from './toDo';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTz4R0Yu1js0JZF6akixIB87Ckujk5WYE",
    authDomain: "to-do-list-6d6f9.firebaseapp.com",
    projectId: "to-do-list-6d6f9",
    storageBucket: "to-do-list-6d6f9.appspot.com",
    messagingSenderId: "894553572495",
    appId: "1:894553572495:web:92d5b687fa2b355d0bdcfa"
  };
  
const app = initializeApp(firebaseConfig);

const db= getFirestore();

const colRef =  collection(db, 'todos');



export async function storeProjectsAndToDos(key, toDo) {
    //localStorage.setItem(`${key}`,JSON.stringify(toDo))

    console.log(key);
    await setDoc(doc(db, "todos", `${key}`), {
        title: toDo.title,
        description: toDo.description,
        dueDate: toDo.dueDate,
        priority: toDo.priority
      });
}

export async function fetchFromStorage() {
    getDocs(colRef)
      .then((snapshot) => {
        let todos = [];
        snapshot.docs.forEach((doc) => {
            let project = doc.id.substring(10, doc.id.length);
            let id = doc.id.substring(0,1);

            const todo = {
                title: doc.data().title,
                description: doc.data().description,
                dueDate: doc.data.dueDate,
                priority: doc.data().priority
            }
            createSavedToDos(project, todo, id);
        })
      })
      .catch(err => {
        console.log(err.message);
      })
    for(let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = JSON.parse(localStorage.getItem(key));

        let project = key.substring(10, key.length);
        let id = key.substring(0,1);

        createSavedToDos(project, value, id);
    }
}
export function updateProjects(project) {
    getDocs(colRef)
      .then((snapshot) => {
        let totalTodos = 0;
        let count = 0;
        snapshot.docs.forEach((document) => {
            if(document.id.includes(`${project.id}`)) {
              totalTodos++;
              console.log(totalTodos);
            }
          })
      getDocs(colRef)
      .then((snapshot) => {
        console.log(totalTodos);
        snapshot.docs.forEach((document) => {
            if(document.id.includes(`${project.id}`)) {
                count++;
                const docRef = doc(db, 'todos', document.id);
                deleteDoc(docRef)
                .then(() => {
                    console.log(count);
                    console.log(project.id);
                    if(count === totalTodos)
                      updateContainers(project);
                })
            }
        })
      })
    })  
}

function updateContainers(project) {
    let containers = project.getElementsByClassName("container");
    let extendedContent = project.getElementsByClassName("collapsible");

    console.log("Con length" + containers.length)
    for(let i = 0; i < containers.length; i++) {
     containers.item(i).getElementsByClassName('deleteButton').item(0).id = `${i}deleteButton${project.id}`;
     containers.item(i).getElementsByClassName('containerTitle').item(0).id = `${i}title${project.id}`;
     containers.item(i).getElementsByClassName('containerPriority').item(0).id = `${i}priority${project.id}`;
     containers.item(i).getElementsByClassName('containerdueDate').item(0).id = `${i}dueDate${project.id}`;
 
     extendedContent.item(i).id =  `${i}container${project.id}`;
     extendedContent.item(i).getElementsByClassName('done-button').item(0).id = `${i}edit${project.id}`;
     extendedContent.item(i).getElementsByClassName('edit-button').item(0).id = `${i}done${project.id}`;
     const title = containers.item(i).getElementsByClassName('containerTitle').item(0).innerHTML;
     const description = extendedContent.item(i).getElementsByClassName('detailDescription').item(0).innerHTML;
     const dueDate = extendedContent.item(i).getElementsByClassName('detailDueDate').item(0).value;
     const priority = extendedContent.item(i).getElementsByClassName('detailPriority').item(0).innerHTML;
     const toDo = new ToDo(title, description, dueDate, priority);
     storeProjectsAndToDos(`${i}container${project.id}`, toDo)
    };
 }
























