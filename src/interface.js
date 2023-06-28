import { projectManager } from './app';
import { Utils } from './utils';

const Interface = (() => {
    const Modal = (() => {
        const overlay = document.createElement('div');

        const setModalOverlay = () => {
            document.body.appendChild(overlay);
            overlay.style.width = '100vw';
            overlay.style.height = '100vh';
            overlay.style.background = 'rgba(0)';
            overlay.style.position = 'fixed';
            overlay.style.top = '0px';
        }
        
        const closeModalOverlay = () => {
            overlay.style.display = 'none';
        }

        return {setModalOverlay, closeModalOverlay}
    })();

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

            const menuIcon = document.createElement('div');
            menuIcon.classList.add('project-menu-icon');
            menuIcon.appendChild(document.createElement('div'));
            menuIcon.appendChild(document.createElement('div'));
            menuIcon.appendChild(document.createElement('div'));
            menuIcon.addEventListener('click', projectMenuModule.openMenu);
            li.appendChild(menuIcon);
            

            favoriteList.appendChild(li);
        };

        const generateFavoritesToNav = () => {
            favoriteList.innerHTML = '';
            const favorites = projectManager.projects.filter(
                (project) => project.favorite
            );
            favorites.forEach((project) => addProjectToFavorites(project));
        };

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

            const menuIcon = document.createElement('div');
            menuIcon.classList.add('project-menu-icon');
            menuIcon.appendChild(document.createElement('div'));
            menuIcon.appendChild(document.createElement('div'));
            menuIcon.appendChild(document.createElement('div'));
            menuIcon.addEventListener('click', projectMenuModule.openMenu);
            li.appendChild(menuIcon);

            projectList.appendChild(li);
        };

        const generateProjectsToNav = () => {
            projectList.innerHTML = '';
            const projects = projectManager.projects.filter(
                (proj) => proj.name !== 'Inbox@XFvW$W7'
            );
            projects.forEach((project) => addProject(project));
        };

        return {
            generateFavoritesToNav,
            generateProjectsToNav,
        };
    })();

    const ProjectFormModule = (() => {
        //  open/close projectForm & colorList listener
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
        };

        const openProjectModal = () => {
            projectForm.reset();
            changeFormState('add');
            projectModal.style.display = 'block';
        };

        const openColorList = () => (colorList.style.display = 'block');

        const closeProjectModal = () => {
            if (colorList.style.display === 'block') return closeColorList();
            projectModal.style.display = 'none';
        };

        const closeColorList = () => {
            colorList.style.display = 'none';
        };

        addProjectIcon.addEventListener('click', () => openProjectModal());
        projectForm.addEventListener('click', (e) => {
            e.stopPropagation();
            closeColorList();
        });

        projectModal.addEventListener('click', () => closeProjectModal());
        cancelProjectBtn.addEventListener('click', () => closeProjectModal());

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeProjectModal();
        });

        colorBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openColorList();
        });

        //  set current project color listener
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

        //  style/set submit buttons to invalid or valid from input listener
        const addProjectBtn = document.querySelector('#add-project');
        const saveProjectBtn = document.querySelector('#save-project');

        const toggleBtnStyle = (btn) => {
            if (!projectForm.checkValidity()) {
                btn.style.opacity = '0.5';
                btn.setAttribute('disabled', '');
            } else {
                btn.style.opacity = '1';
                btn.removeAttribute('disabled');
            }
        };

        projectForm.addEventListener('input', () => {
            toggleBtnStyle(addProjectBtn);
            toggleBtnStyle(saveProjectBtn);
        });

        //  add project listener
        addProjectBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!projectForm.checkValidity()) {
                return;
            }

            //  create new project
            const name = document.querySelector('#form-project-name').value;
            const color = document.querySelector('#form-project-color').dataset
                .colorSelected;
            const favorite = document.querySelector(
                '#favorites-checkbox'
            ).checked;

            projectManager.createProject(name, color, favorite);
            NavModule.generateProjectsToNav();
            Utils.toggleProjects.extend();
            if (favorite === true) {
                NavModule.generateFavoritesToNav();
                Utils.toggleFavorites.extend();
            }

            //  reset form to default
            closeProjectModal();
            projectForm.reset();
            toggleBtnStyle(addProjectBtn);
        });
    })();

    const projectMenuModule = (() => {
        const projects = document.querySelector('.projects');
        const projectMenu = document.querySelector('.project-menu');
        const addToFavorite = document.querySelector('#add-to-favorites');
        const removeFromFavorite = document.querySelector('#remove-from-favorites');

        let currentMenuIcon;
        let currentFileAmount;
        let currentProject;
        let currentId;

        const openMenu = (e) => {
            //  set project icons to fixed
            currentMenuIcon = e.target;
            currentProject = e.target.parentNode;
            currentFileAmount = currentProject.querySelector('.file-amount');

            currentMenuIcon.style.display = 'flex';
            currentFileAmount.style.display = 'none';
            projects.style.overflow = 'visible';

            //  'add or remove to favorites' display
            currentId = currentProject.id;
            const selectedProject = projectManager.projects.find((project) => project.id === currentId);

            if (selectedProject.favorite) {
                addToFavorite.style.display = 'none';
                removeFromFavorite.style.display = 'flex';
            } else {
                addToFavorite.style.display = 'flex';
                removeFromFavorite.style.display = 'none';
            }

            //  open menu
            currentProject.appendChild(projectMenu);
            projectMenu.style.display = 'block';
            Modal.setModalOverlay();
        }
        

        return {openMenu}
    })();

    return { NavModule, ProjectFormModule };
})();

export { Interface };


//  test / append project-menu beside number 9