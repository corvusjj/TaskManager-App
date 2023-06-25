import {
    Project,
    Task,
    Note,
    fileId,
    projectManager,
    taskManager,
    noteManager,
} from './app.js';
import { Utils } from './utils.js';
import { Interface } from './interface.js';
import './style.scss';

(function () {
    // if not empty
    // generate files from localStorage
    const projectsLocalData = localStorage.getItem('projects');
    const tasksLocalData = localStorage.getItem('tasks');
    const notesLocalData = localStorage.getItem('notes');
    const usedIDsLocalData = localStorage.getItem('usedIDs');

    if (projectsLocalData)
        projectManager.projects.push(...JSON.parse(projectsLocalData));
    if (tasksLocalData) taskManager.tasks.push(...JSON.parse(tasksLocalData));
    if (notesLocalData) noteManager.notes.push(...JSON.parse(notesLocalData));
    if (usedIDsLocalData) fileId.usedIDs.push(...JSON.parse(usedIDsLocalData));

    const getMethodNames = (classType) => {
        const propertyNames = Object.getOwnPropertyNames(classType.prototype);
        return propertyNames.filter(
            (methodName) => methodName !== 'constructor'
        );
    };

    const assignMethodsToFiles = (classType, fileArray) => {
        const methodNames = getMethodNames(classType);
        const fileMethod = {};

        methodNames.forEach((methodName) => {
            const method = classType.prototype[methodName];
            fileMethod[methodName] = method;
        });

        fileArray.forEach((file) => {
            Object.assign(file, fileMethod);
        });
    };

    assignMethodsToFiles(Task, taskManager.tasks);
    assignMethodsToFiles(Project, projectManager.projects);
    assignMethodsToFiles(Note, noteManager.notes);

    // assign files to parent (notes to task / tasks to project)
    projectManager.projects.forEach((project) => (project.tasks = []));
    taskManager.tasks.forEach((task) => (task.notes = []));

    noteManager.notes.forEach((note) => {
        const parentTask = taskManager.tasks.find(
            (task) => task.id === note.taskId
        );
        parentTask.addNote(note);
    });

    taskManager.tasks.forEach((task) => {
        const parentProject = projectManager.projects.find(
            (project) => project.id === task.projectId
        );
        parentProject.addTask(task);
    });

    // inbox Project
    const inboxProjectExist = projectManager.projects.find(
        (proj) => proj.name === 'Inbox@XFvW$W7'
    );
    if (!inboxProjectExist) {
        projectManager.createProject('Inbox@XFvW$W7', null, false);
    }

    // generate favorites
    Interface.NavModule.generateFavoritesToNav();

    // generate projects on nav
    Interface.NavModule.generateProjectsToNav();

    // initiate div with its height === projectHeight to hide projects
    Utils.toggleProjects.hide();
})();

// localStorage.clear();
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

// noteManager.createNote('read technique', taskManager.tasks[0].id, taskManager.tasks[0].projectId);
// taskManager.createTask('Lockpick', 'study pins', 'Jan 1, 2025', 'low', projectManager.projects[1].id);
// projectManager.createProject('Architecture', 'blue', true);

// noteManager.deleteNote(noteManager.notes[0].id);

console.log(projectManager.projects);
console.log(taskManager.tasks);
console.log(noteManager.notes);
//  review if note added to project

// const btn = document.querySelector('.btn');
// btn.addEventListener('click', () => {
//     projectManager.createProject('Architecture', 'blue', true);
//     // noteManager.createNote('read technique', taskManager.tasks[0].id, taskManager.tasks[0].projectId);
//     // noteManager.deleteNote(noteManager.notes[noteManager.notes.length - 1].id);
//     console.log(noteManager.notes);
//     console.log(projectManager.projects);
// });

// const btnDelete = document.querySelector('.delete');
// btnDelete.addEventListener('click', () => {
//     noteManager.deleteNote(noteManager.notes[noteManager.notes.length - 1].id);
//     console.log(noteManager.notes);
// });
