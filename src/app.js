const App = (() => {
    const files = (() => {
        let projects = [];
        let tasks = [];
        let notes = [];
    
        return { projects, tasks, notes }
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
            const id = fileId.generateId();
    
            return { name, color, favorite, tasks, id }
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
        const newTask = (title, description, dueDate, priority, projectId) => {
            let notes = [];
            const id = fileId.generateId();

            return { title, description, dueDate, priority, notes, id, projectId }
        }
    
        return { newTask };
    })();
    
    const taskModifier = (() => {
        const changeTitle = (task, value) => task.title = value;
        const changeDescription = (task, value) => task.description = value;
        const changeDueDate = (task, value) => task.dueDate = value;
        const changePriority = (task, value) => task.priority = value;
    
        return { changeTitle, changeDescription, changeDueDate, changePriority }
    })();
    
    const noteCreator = (() => {
        const newNote = (note, taskId) => {
            const id = fileId.generateId();

            return { note, id, taskId }
        }

        return { newNote }
    })();
    
    return {
        files,
        fileId,
        projectCreator,
        projectModifier,
        taskCreator,
        taskModifier,
        noteCreator
    }    
})();