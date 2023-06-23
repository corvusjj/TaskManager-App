import { projectManager } from "./app";

const Interface = (() => {

    const NavModule = (() => {
        const favoriteList = document.querySelector('.favorites-list');
        const projectList = document.querySelector('.projects-list');

        const addProjectToFavorites = (project) => {
            const li = document.createElement('li');
            li.classList.add('nav-project');
            li.id = project.id;

            const colorDiv = document.createElement('div');
            colorDiv.classList.add('project-color');
            colorDiv.style.background = project.color;
            li.appendChild(colorDiv);

            const name = document.createElement('p');
            name.textContent = project.name;
            li.appendChild(name);

            const taskAmount = document.createElement('p');
            taskAmount.classList.add('file-amount');
            taskAmount.textContent = project.tasks.length;
            li.appendChild(taskAmount);

            favoriteList.appendChild(li);
        }

        const generateFavoritesToNav = () => {
            const favorites = projectManager.projects.filter((project) => project.favorite);
            favorites.forEach((project) => addProjectToFavorites(project));
        }

        const addProject = (project) => {
            const li = document.createElement('li');
            li.classList.add('nav-project');
            li.id = project.id;

            const colorDiv = document.createElement('div');
            colorDiv.classList.add('project-color');
            colorDiv.style.background = project.color;
            li.appendChild(colorDiv);

            const name = document.createElement('p');
            name.textContent = project.name;
            li.appendChild(name);

            const taskAmount = document.createElement('p');
            taskAmount.classList.add('file-amount');
            taskAmount.textContent = project.tasks.length;
            li.appendChild(taskAmount);

            projectList.appendChild(li);
        }

        const generateProjectsToNav  = () => {
            const projects = projectManager.projects.filter((proj) => proj.name !== 'Inbox@XFvW$W7');
            projects.forEach((project) => addProject(project));
        }

        return {addProjectToFavorites, generateFavoritesToNav, addProject, generateProjectsToNav}
    })();

    const ProjectFormModule = (() => {

        //  open/close projectForm & colorList
        const projectModal = document.querySelector('.add-project-modal');
        const projectForm = document.querySelector('.add-project-form');
        const addProjectIcon = document.querySelector('#add-project-icon');
        const cancelProjectBtn = document.querySelector('#cancel-project');
        const colorBtn = document.querySelector('#form-project-color');
        const colorList = document.querySelector('.color-list');

        const changeFormState = (state) => {
            const addBtn = document.querySelector('#add-project');
            const saveProjectBtn = document.querySelector('#save-project');

            if (state === 'add') {
                saveProjectBtn.style.display = 'none';
                addBtn.style.display = 'flex';
            } else if (state === 'edit') {
                addBtn.style.display = 'none';
                saveProjectBtn.style.display = 'flex';
            }
        }

        const openProjectModal = () => {
            projectForm.reset();
            changeFormState('add');
            projectModal.style.display = 'block';
        }

        const openColorList = () => colorList.style.display = 'block';

        const closeProjectModal = () => {
            if (colorList.style.display === 'block') return closeColorList();
            projectModal.style.display = 'none';
        }

        const closeColorList = () => {
            colorList.style.display = 'none';
        }

        addProjectIcon.addEventListener('click', () => openProjectModal());
        projectForm.addEventListener('click', (e) => {
            e.stopPropagation();
            closeColorList();
        });

        projectModal.addEventListener('click', () => closeProjectModal());
        cancelProjectBtn.addEventListener('click', () => closeProjectModal());

        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape') closeProjectModal();
        });

        colorBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openColorList();
        });

        //  set current project color
        const colorOptions = document.querySelectorAll('.color-option');
        const colorDiv = colorBtn.querySelector('#current-color');
        const colorName = colorBtn.querySelector('p');

        colorOptions.forEach((colorOption) => {
            colorOption.addEventListener('click', (e) => {
                colorDiv.style.background = e.target.dataset.colorHex;
                colorName.textContent = e.target.dataset.colorName;
                colorBtn.dataset.colorSelected = e.target.dataset.colorHex;
            });
        });

        //  add newProject
        const addProjectBtn = document.querySelector('#add-project');
        const saveProjectBtn = document.querySelector('#save-project');

        addProjectBtn.addEventListener('click', (e) => {

            e.preventDefault();
            const name = document.querySelector('#form-project-name');

            if (!projectForm.checkValidity()) {
                return;
            }

            console.log(name.value);
            closeProjectModal();
            projectForm.reset();

            toggleBtnStyle(addProjectBtn);
        });
    })();

    return {NavModule, ProjectFormModule}
})();

export {Interface}