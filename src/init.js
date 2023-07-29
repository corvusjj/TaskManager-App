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

    if (projectsLocalData) projectManager.projects.push(...JSON.parse(projectsLocalData));
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

    // updateInbox
    Interface.NavModule.updateInbox();

    // generate favorites
    Interface.NavModule.generateFavoritesToNav();

    // generate projects on nav
    Interface.NavModule.generateProjectsToNav();

    // generate projects on addTask project list
    Interface.FormProjectList.generateProjectsToForm();

    // initiate div with its height === projectHeight to hide projects
    Utils.toggleProjects.hide();

    // implement sorting
    const sort = localStorage.getItem('sort');
    if (sort) Interface.SortModule.selectSortType(sort);
})();
