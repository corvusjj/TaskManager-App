import {Project, Task, Note, fileId, projectManager, taskManager, noteManager} from './app.js';

// if not empty
// generate files from localStorage
const projectsLocalData = localStorage.getItem('projects');
const tasksLocalData = localStorage.getItem('tasks');
const notesLocalData = localStorage.getItem('notes');
const usedIDsLocalData = localStorage.getItem('usedIDs');

if (projectsLocalData) projectManager.projects.push(...(JSON.parse(projectsLocalData)));
if (tasksLocalData) taskManager.tasks.push(...(JSON.parse(tasksLocalData)));
if (notesLocalData) noteManager.notes.push(...(JSON.parse(notesLocalData)));
if (usedIDsLocalData) fileId.usedIDs.push(...(JSON.parse(usedIDsLocalData)));


// inbox Project
const inboxProjectExist = projectManager.projects.find((proj) => proj.name === 'Inbox');

if(!inboxProjectExist) {
    projectManager.createProject('Inbox', null, null);
}

// projectManager.createProject('Parkour', 'red', true);
// projectManager.createProject('Drumming', 'white', false);

// taskManager.createTask(
//     'Kong Vault',
//     'monkey style',
//     'date Magellan died',
//     'least Prio',
//     projectManager.projects[0].id
// );
// taskManager.createTask(
//     'Drum Fill Lesson',
//     'just the basics',
//     'january 1, 1947',
//     'no prio',
//     projectManager.projects[1].id
// );

// noteManager.createNote(
//     'warmup',
//     taskManager.tasks[0].id,
//     projectManager.projects[0].id
// );
// noteManager.createNote(
//     'dive and raise hips',
//     taskManager.tasks[0].id,
//     projectManager.projects[0].id
// );
// noteManager.createNote(
//     'drumeo vid 1',
//     taskManager.tasks[1].id,
//     projectManager.projects[1].id
// );

console.log(projectManager.projects);
console.log(taskManager.tasks);
console.log(noteManager.notes);