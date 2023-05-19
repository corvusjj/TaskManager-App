const files = (() => {
    let projects = [];
    let tasks = [];

    return { projects, tasks }
})();

const fileId = (() => {
    let usedIDs = [];

    const generateId = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let randomId = '';

        function placeCharacters() {
            for (let i = 0; i < 8; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                randomId += characters.charAt(randomIndex);
            }
        }

        placeCharacters();

        if(usedIDs.includes(randomId)) {
            randomId = '';
            placeCharacters();
        };

        usedIDs.push(randomId);
        return randomId;
    }

    const removeId = (id) => {
        const index = usedIDs.indexOf(id);
        usedIDs.splice(index, 1);
    }

    return { generateId, removeId }
})();

const projectCreator = (() => {
    const newProject = (name, color, favorite) => {
        let tasks = [];

        return { name, color, favorite, tasks }
    }

    return { newProject };
})();

const projectModifier = (() => {
    const changeName = (project, value) => project.name = value;
    const changeColor = (project, value) => project.color = value;
    const changeFavorite = (project, value) => project.favorite = value;

    return { changeColor, changeName, changeFavorite };
})();

const taskCreator = (() => {
    const newTask = (title, description, dueDate, priority) => {
        let notes = [];

        return { title, description, dueDate, priority, notes}
    }

    return { newTask };
})();

const taskModifier = (() => {
    const changeTitle = (task, value) => task.title = value;
    const changeDescription = (task, value) => task.description = value;
    const changeDueDate = (task, value) => task.dueDate = value;
    const changePriority = (task, value) => task.priority = value;

    return { changeTitle, changeDescription, changeDueDate, changePriority}
})();

const noteCreator = (() => {
    function addNote(newNote) {
        return newNote;
    }

    return { addNote };
})();