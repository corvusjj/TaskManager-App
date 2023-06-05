class Project {
    constructor(name, color, favorite) {
        this.name = name;
        this.color = color;
        this.favorite = favorite;
        this.tasks = [];
    }

    changeName(newName) {
        this.name = newName;
    }

    changeColor(newColor) {
        this.color = newColor;
    }

    changeFavorite(newFavorite) {
        this.favorite = newFavorite;
    }

    addTask(newTask) {
        this.tasks.push(newTask);
    }

    removeTask(taskToRemove) {
        const tasksRemained = this.tasks.filter(
            (task) => task.id !== taskToRemove.id
        );

        this.tasks.length = 0;
        this.tasks.push(...tasksRemained);
    }
}

class Task {
    constructor(title, description, dueDate, priority, projectId) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = [];
        this.projectId = projectId;
    }

    changeTitle(newTitle) {
        this.title = newTitle;
    }

    changeDescription(newDescription) {
        this.description = newDescription;
    }

    changeDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }

    changePriority(newPriority) {
        this.priority = newPriority;
    }

    addNote(newNote) {
        this.notes.push(newNote);
    }

    removeNote(noteToRemove) {
        const notesRemained = this.notes.filter((note) => note.id !== noteToRemove.id);
        
        this.notes.length = 0;
        this.notes.push(...notesRemained);
    }
}

class Note {
    constructor(note, taskId, projectId) {
        this.note = note;
        this.taskId = taskId;
        this.projectId = projectId;
    }

    updateNote(newNote) {
        this.note = newNote;
    }
}

const fileId = (() => {
    let usedIDs = [];

    const generateId = () => {
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let randomId = '';

        function placeCharacters() {
            for (let i = 0; i < 8; i++) {
                const randomIndex = Math.floor(
                    Math.random() * characters.length
                );
                randomId += characters.charAt(randomIndex);
            }
        }

        placeCharacters();

        if (usedIDs.includes(randomId)) {
            randomId = '';
            placeCharacters();
        }

        usedIDs.push(randomId);
        return randomId;
    };

    const removeId = (id) => {
        const index = usedIDs.indexOf(id);
        usedIDs.splice(index, 1);
    };

    return { generateId, removeId, usedIDs };
})();

const projectManager = (() => {
    let projects = [];

    const createProject = (name, color, favorite) => {
        const project = new Project(name, color, favorite);
        project.id = fileId.generateId();
        projects.push(project);
    };

    const deleteProject = (projectId) => {
        const indexOfProject = projects.indexOf(
            projects.find((obj) => obj.id === projectId)
        );
        projects.splice(indexOfProject, 1);

        taskManager.clearTasksFromDeletedProject(projectId);
        noteManager.clearNotesFromDeletedProject(projectId);

        fileId.removeId(projectId);
    };

    const placeTask = (newTask) => {
        const appliedProject = projects.find(
            (project) => project.id === newTask.projectId
        );

        appliedProject.addTask(newTask);
    }

    const removeTask = (task) => {
        const appliedProject = projects.find(
            (project) => project.id === task.projectId
        );

        appliedProject.removeTask(task);
    }

    return { projects, createProject, deleteProject, placeTask, removeTask };
})();

const taskManager = (() => {
    let tasks = [];

    const createTask = (title, description, dueDate, priority, projectId) => {
        const task = new Task(title, description, dueDate, priority, projectId);
        task.id = fileId.generateId();
        tasks.push(task);

        projectManager.placeTask(task);
    };

    const deleteTask = (taskId) => {
        const taskToRemove = tasks.find((task) => task.id === taskId);
        projectManager.removeTask(taskToRemove);

        const indexOfTask = tasks.indexOf(
            tasks.find((obj) => obj.id === taskId)
        );
        tasks.splice(indexOfTask, 1);

        noteManager.clearNotesFromDeletedTask(taskId);

        fileId.removeId(taskId);
    };

    const clearTasksFromDeletedProject = (deletedProjectId) => {
        const deletedTaskIds = tasks
            .filter((task) => task.projectId === deletedProjectId)
            .map((task) => task.id);

        deletedTaskIds.forEach(
            (id) => fileId.removeId(id)
        );

        const tasksRemained = tasks.filter(
            (task) => task.projectId !== deletedProjectId
        );

        tasks.length = 0;
        tasks.push(...tasksRemained);
    };

    const placeNote = (note) => {
        const appliedTask = tasks.find(
            (task) => task.id === note.taskId
        );

        appliedTask.addNote(note);
    }

    const removeNote = (note) => {
        const appliedTask = tasks.find(
            (task) => task.id === note.taskId  
        );

        appliedTask.removeNote(note);
    }

    return {
        tasks,
        createTask,
        deleteTask,
        clearTasksFromDeletedProject,
        placeNote,
        removeNote
    };
})();

const noteManager = (() => {
    let notes = [];

    const createNote = (note, taskId, projectId) => {
        const newNote = new Note(note, taskId, projectId);
        newNote.id = fileId.generateId();
        notes.push(newNote);

        taskManager.placeNote(newNote);
    };

    const deleteNote = (noteId) => {
        const noteToRemove = notes.find((note) => note.id === noteId);
        taskManager.removeNote(noteToRemove);

        const indexOfNote = notes.indexOf(
            notes.find((obj) => obj.id === noteId)
        );
        notes.splice(indexOfNote, 1);

        fileId.removeId(noteId);
    };

    const clearNotesFromDeletedTask = (deletedTaskId) => {
        const deletedNoteIds = notes
            .filter((note) => note.taskId === deletedTaskId)
            .map((note) => note.id);

        deletedNoteIds.forEach(
            (id) => fileId.removeId(id)
        );

        const notesRemained = notes.filter(
            (obj) => obj.taskId !== deletedTaskId
        );

        notes.length = 0;
        notes.push(...notesRemained);
    };

    const clearNotesFromDeletedProject = (deletedProjectId) => {
        const deletedNoteIds = notes
            .filter((note) => note.projectId === deletedProjectId)
            .map((note) => note.id);

        deletedNoteIds.forEach(
            (id) => fileId.removeId(id)
        );

        const notesRemained = notes.filter(
            (obj) => obj.projectId !== deletedProjectId
        );

        notes.length = 0;
        notes.push(...notesRemained);
    };

    return {
        notes,
        createNote,
        deleteNote,
        clearNotesFromDeletedTask,
        clearNotesFromDeletedProject,
    };
})();

// (title, description, dueDate, priority, projectId)

projectManager.createProject('Parkour', 'red', true);
projectManager.createProject('Drumming', 'white', false);
// projectManager.projects[0].id = 'x0GjU12#';

taskManager.createTask(
    'Kong Vault',
    'monkey style',
    'date Magellan died',
    'least Prio',
    projectManager.projects[0].id
);
taskManager.createTask(
    'Drum Fill Lesson',
    'just the basics',
    'january 1, 1947',
    'no prio',
    projectManager.projects[1].id
);

noteManager.createNote(
    'warmup',
    taskManager.tasks[0].id,
    projectManager.projects[0].id
);
noteManager.createNote(
    'dive and raise hips',
    taskManager.tasks[0].id,
    projectManager.projects[0].id
);
noteManager.createNote(
    'drumeo vid 1',
    taskManager.tasks[1].id,
    projectManager.projects[1].id
);

// taskManager.deleteTask(taskManager.tasks[0].id);
// projectManager.deleteProject(projectManager.projects[0].id);
// noteManager.deleteNote(noteManager.notes[0].id);

console.log(projectManager.projects);
console.log(taskManager.tasks);
console.log(noteManager.notes);

console.log(fileId.usedIDs);

//  note ====> place to parentFiles
//  generate tasks from projectParents through projectIds
