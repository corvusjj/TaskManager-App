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
}

class Note {
    constructor(note, taskId) {
        this.note = note;
        this.taskId = taskId;
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

        fileId.removeId(projectId);
    };

    const insertTaskToProject = (task) => {
        const appliedProject = projects.find(obj => obj.id === task.projectId);
        appliedProject.tasks.push(task);
    }

    // const removeTaskFromProject = (task) => {
    //     const appliedProject = projects.find(obj => obj.id === task.projectId);
    //     const remainedTasks = appliedProject.tasks.filter(obj => obj.id === task.id);
    //     appliedProject.tasks = [];
    //     appliedProject.tasks.push(...remainedTasks);
    // }

    return { projects, createProject, deleteProject, insertTaskToProject };
})();

const taskManager = (() => {
    let tasks = [];

    const createTask = (title, description, dueDate, priority, projectId) => {
        const task = new Task(title, description, dueDate, priority, projectId);
        task.id = fileId.generateId();
        tasks.push(task);

        projectManager.insertTaskToProject(task);
    };

    const deleteTask = (taskId) => {
        // const task = tasks.find(obj => obj.id === taskId);
        // projectManager.removeTaskFromProject(task);

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

        if (deletedTaskIds.length > 0) {
            deletedTaskIds.forEach(id => {
                noteManager.clearNotesFromDeletedTask(id);

                fileId.removeId(id);
            });
        }
        //  code above clears the notes on the noteManager affected by the deleted tasks.

        const tasksRemained = tasks.filter(
            (task) => task.projectId !== deletedProjectId
        );
        tasks.length = 0;
        tasks.push(...tasksRemained);
    };

    const insertNoteToTask = (note) => {
        const appliedTask = tasks.find(obj => obj.id === note.taskId);
        appliedTask.notes.push(note);
    }

    return { tasks, createTask, deleteTask, clearTasksFromDeletedProject, insertNoteToTask };
})();

const noteManager = (() => {
    let notes = [];

    const createNote = (note, taskId) => {
        const newNote = new Note(note, taskId);
        newNote.id = fileId.generateId();
        notes.push(newNote);

        taskManager.insertNoteToTask(newNote);
    };

    const deleteNote = (noteId) => {
        const indexOfNote = notes.indexOf(
            notes.find((obj) => obj.id === noteId)
        );
        notes.splice(indexOfNote, 1);

        fileId.removeId(noteId);
    };

    const clearNotesFromDeletedTask = (deletedTaskId) => {
        const deletedNoteIds = notes.filter(note => {
            note.taskId === deletedTaskId
        });

        if (deletedNoteIds.length > 0) {
            deletedNoteIds.forEach(id => {
                fileId.removeId(id);
            });
        }

        const notesRemained = notes.filter(
            ((obj) => obj.taskId !== deletedTaskId)
        );

        notes.length = 0;
        notes.push(...notesRemained);
    };  

    return { notes, createNote, deleteNote, clearNotesFromDeletedTask };
})();

// (title, description, dueDate, priority, projectId)

projectManager.createProject('Parkour', 'red', true);
projectManager.createProject('Drumming', 'white', false);

taskManager.createTask('Kong Vault', 'monkey style', 'date Magellan died', 'least Prio', projectManager.projects[0].id);
taskManager.createTask('Drum Fill Lesson', 'just the basics', 'january 1, 1947', 'no prio', projectManager.projects[1].id);

noteManager.createNote('warmup', taskManager.tasks[0].id);
noteManager.createNote('dive and raise hips', taskManager.tasks[0].id);
noteManager.createNote('drumeo vid 1', taskManager.tasks[1].id);

// taskManager.deleteTask(taskManager.tasks[0].id);
// projectManager.deleteProject(projectManager.projects[0].id);
// console.log(projectManager.projects[0].id);

console.log(projectManager.projects);
console.log(taskManager.tasks);
console.log(noteManager.notes);

console.log(fileId.usedIDs);

//  remove deleted Id
//  insert task to Project, remove task, ====> make it a method
//  generate tasks from projectParents through projectIds
