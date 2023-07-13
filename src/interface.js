import { projectManager, taskManager } from './app';
import { Utils } from './utils';

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

            const menuIcon = document.createElement('div');
            menuIcon.classList.add('project-menu-icon');
            menuIcon.appendChild(document.createElement('div'));
            menuIcon.appendChild(document.createElement('div'));
            menuIcon.appendChild(document.createElement('div'));
          
            //open project-menu listener
            menuIcon.addEventListener('click', projectMenuModule.openMenuFromNav);
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
            menuIcon.addEventListener('click', projectMenuModule.openMenuFromNav);
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
        const projectModal = document.querySelector('#add-project-modal');
        const projectForm = document.querySelector('.add-project-form');
        const addProjectIcon = document.querySelector('#add-project-icon');
        const cancelProjectBtn = document.querySelector('#cancel-project');
        const colorList = document.querySelector('.color-list');

        const nameInput = projectForm.querySelector('#form-project-name');
        const colorBtn = projectForm.querySelector('#form-project-color');
        const favoritesCheckbox = projectForm.querySelector('#favorites-checkbox');

        const addProjectBtn = document.querySelector('#add-project');
        const saveProjectBtn = document.querySelector('#save-project');

        let activeProject;

        const changeFormState = (state) => {
            if (state === 'add') {
                saveProjectBtn.style.display = 'none';
                addProjectBtn.style.display = 'flex';
            } else if (state === 'edit') {
                addProjectBtn.style.display = 'none';
                saveProjectBtn.style.display = 'flex';
            }
        };

        const resetForm = () => {
            projectForm.reset();
            document.querySelector('.form-title').textContent = 'Add Project';
            nameInput.value = '';
            favoritesCheckbox.removeAttribute('checked');
        }

        const openProjectModal = () => {
            changeFormState('add');
            projectModal.showModal();
        };

        const editProjectModal = (currentId) => {
            projectForm.querySelector('.form-title').textContent = 'Edit Project';
            changeFormState('edit');

            const selectedProject = projectManager.projects.find((project) => project.id === currentId);
            activeProject = selectedProject;
            
            // set name value
            nameInput.value = selectedProject.name;

            // set color value
            colorBtn.dataset.colorSelected = selectedProject.color;

            const colorDiv = colorBtn.querySelector('#current-color');
            colorDiv.style.background = selectedProject.color;

            const colorName = colorBtn.querySelector('p');
            const colorOptions = [...document.querySelectorAll('.color-option')];
            colorName.textContent = colorOptions.find((option) => option.dataset.colorHex === selectedProject.color).dataset.colorName;

            // set favorites checkbox
            if (selectedProject.favorite) {
                favoritesCheckbox.setAttribute('checked', '');
            }

            toggleBtnStyle(saveProjectBtn);
            projectModal.showModal();
        }

        const openColorList = () => (colorList.style.display = 'block');

        const closeColorList = () => {
            colorList.style.display = 'none';
        };

        const closeProjectModal = () => {
            if (colorList.style.display === 'block') return closeColorList();
            projectModal.close();
            resetForm();
        };


        addProjectIcon.addEventListener('click', () => openProjectModal());
        projectForm.addEventListener('click', (e) => {
            e.stopPropagation();
            closeColorList();
        });

        
        cancelProjectBtn.addEventListener('click', () => closeProjectModal());
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) {
                closeProjectModal();
            }
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
            FormProjectList.generateProjectsToForm();

            Utils.toggleProjects.extend();
            if (favorite) {
                NavModule.generateFavoritesToNav();
                Utils.toggleFavorites.extend();
            }

            //  reset form to default
            closeProjectModal();
            resetForm();
            toggleBtnStyle(addProjectBtn);
        });

        // update project listener
        saveProjectBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!projectForm.checkValidity()) {
                return;
            }

            const newName = nameInput.value;
            const newColor = colorBtn.dataset.colorSelected;
            const newFavorite = favoritesCheckbox.checked;

            activeProject.changeName(newName);
            activeProject.changeColor(newColor);
            activeProject.changeFavorite(newFavorite);

            projectManager.updateProjectStorage();
            NavModule.generateFavoritesToNav();
            NavModule.generateProjectsToNav();
            FormProjectList.generateProjectsToForm();

            Utils.toggleFavorites.extend();
            Utils.toggleProjects.extend();

            closeProjectModal();
        });

        return { editProjectModal }
    })();

    const projectMenuModule = (() => {
        const menuModal = document.querySelector('#project-menu-modal');
        const addToFavorite = document.querySelector('#add-to-favorites');
        const removeFromFavorite = document.querySelector('#remove-from-favorites');

        let currentMenuIcon;
        let currentFileAmount;
        let activeProject;

        const openMenuFromNav = (e) => {
            e.stopPropagation();

            //  set project icons to fixed
            currentMenuIcon = e.target;
            currentFileAmount = e.target.parentNode.querySelector('.file-amount');
            currentMenuIcon.style.display = 'flex';
            currentFileAmount.style.display = 'none';

            //  'add or remove to favorites' display
            const currentId = e.target.parentNode.id;
            const selectedProject = projectManager.projects.find((project) => project.id === currentId);
            activeProject = selectedProject;

            if (selectedProject.favorite) {
                addToFavorite.style.display = 'none';
                removeFromFavorite.style.display = 'flex';
            } else {
                addToFavorite.style.display = 'flex';
                removeFromFavorite.style.display = 'none';
            }

            //  display menu
            menuModal.style.left = currentMenuIcon.getBoundingClientRect().left + 'px';
            menuModal.style.top = currentMenuIcon.getBoundingClientRect().top + 'px';
            menuModal.showModal();
        }

        const openMenuFromMain = (e) => {
            currentMenuIcon = e.target;

            //  'add or remove to favorites' display
            const currentId = e.target.dataset.projectSelected;
            const selectedProject = projectManager.projects.find((project) => project.id === currentId);
            activeProject = selectedProject;

            if (selectedProject.favorite) {
                addToFavorite.style.display = 'none';
                removeFromFavorite.style.display = 'flex';
            } else {
                addToFavorite.style.display = 'flex';
                removeFromFavorite.style.display = 'none';
            }

            //  display menu
            menuModal.style.left = currentMenuIcon.getBoundingClientRect().left + 'px';
            menuModal.style.top = currentMenuIcon.getBoundingClientRect().top + 'px';
            menuModal.showModal();
        }

        const closeMenu = () => {
            menuModal.close();
            currentMenuIcon.style.display = 'none';
            currentFileAmount.style.display = 'block';
        }

        menuModal.addEventListener('click', (e) => {
            if (e.target === menuModal) {
                closeMenu();
            }
        });

        const editProject = document.querySelector('#edit-project');
        editProject.addEventListener('click', () => {

            closeMenu();

            const currentId = currentMenuIcon.parentNode.id;
            ProjectFormModule.editProjectModal(currentId);
        });

        addToFavorite.addEventListener('click', () => {
            activeProject.changeFavorite(true);
            projectManager.updateProjectStorage();
            NavModule.generateFavoritesToNav();
            Utils.toggleFavorites.extend();
            closeMenu();
        });

        removeFromFavorite.addEventListener('click', () => {
            activeProject.changeFavorite(false);
            projectManager.updateProjectStorage();
            NavModule.generateFavoritesToNav();
            NavModule.generateProjectsToNav();
            Utils.toggleFavorites.extend();
            closeMenu();
        });

        //  delete project listener
        const deleteProject = document.querySelector('#delete-project');
        const deleteProjectModal = document.querySelector('#project-delete-modal');

        deleteProject.addEventListener('click', () => {    
            closeMenu();
            const projectName = document.querySelector('.project-delete-form > p > span');

            // display random gif
            const gifs = [...document.querySelectorAll('.project-delete-form img')];
            const randomNum = Math.floor(Math.random() * 2) + 1;
            
            if (randomNum === 1) {
                gifs[0].style.display = 'none';
                gifs[1].style.display = 'block';
            } else {
                gifs[0].style.display = 'block';
                gifs[1].style.display = 'none';
            }

            projectName.textContent = activeProject.name;
            deleteProjectModal.showModal();
        });

        const cancelBtn = document.querySelector('#cancel-delete');
        cancelBtn.addEventListener('click', () => deleteProjectModal.close()); 

        deleteProjectModal.addEventListener('click', (e) => {
            if (e.target === deleteProjectModal) {
                deleteProjectModal.close();
            }
        });

        //  confirm delete project listener
        const confirmDeleteBtn = document.querySelector('#confirm-delete');
        confirmDeleteBtn.addEventListener('click', () => {
            deleteProjectModal.close();

            projectManager.deleteProject(activeProject.id);
            NavModule.generateFavoritesToNav();
            NavModule.generateProjectsToNav();
            FormProjectList.generateProjectsToForm();
            
            Utils.toggleFavorites.extend();
            Utils.toggleFavorites.extend();
        });

        return {openMenuFromNav, openMenuFromMain}
    })();

    const AddTaskFormModule = (() => {
        const addTaskModal = document.querySelector('.add-task-modal');
        const addTaskForm = document.querySelector('.add-task-form');
        const addTaskBtn = document.querySelector('#add-task');
        const cancelTaskBtn = document.querySelector('#cancel-add-task');

        const name = document.querySelector('#task-name-add');
        const description = document.querySelector('#task-description-add');
        const date = document.querySelector('#task-date-add');
        const priority = document.querySelector('#task-priority-add');
        const project = document.querySelector('#project-select-add');

        let activeProject;
        const addTaskIcon = document.querySelector('#add-task-icon');

        // toggle project button Icon
        const projectBtnColor = document.querySelector('#project-select-add-color');
        const projectBtnSvg = document.querySelector('#project-select-add-svg');

        const toggleProjectBtnIcon = (activeProject) => {
            if (activeProject === 'inbox') {
                projectBtnColor.style.display = 'none';
                projectBtnSvg.style.display = 'inline';
            } else {
                projectBtnColor.style.display = 'block';
                projectBtnSvg.style.display = 'none';
            }
        }

        //  assign dataId to projectListBtn
        const assignIdToProjectBtn = (id) => {
            document.querySelector('#project-select-add').dataset.projectSelected = id;
        }

        // toggleValidity for addTask button
        const verifyValidity = () => {

            function valid() {
                addTaskBtn.dataset.invalid = 'false';
            }

            function invalid() {
                addTaskBtn.dataset.invalid = 'true';
            }

            if (name.value === '') return invalid();
            if (date.value === '') return invalid();
            if (priority.dataset.prioritySelected === '') return invalid();

            return valid();
        }

        //  open form listener
        addTaskIcon.addEventListener('click', () => {

            //  let Inbox as default active project
            if (activeProject === undefined || null ) {  //  initial/default selected Project
                toggleProjectBtnIcon('inbox');
                activeProject = projectManager.projects.find((proj) => proj.name === 'Inbox@XFvW$W7');
                assignIdToProjectBtn(activeProject.id);

            } else if (activeProject.name !== 'Inbox@XFvW$W7') {  //  if activeProject is not Inbox
                toggleProjectBtnIcon('custom-project');
                assignIdToProjectBtn(activeProject.id);
                projectBtnColor.style.background = activeProject.color;

            } else {  //  if activeProject is Inbox
                toggleProjectBtnIcon('inbox');
                assignIdToProjectBtn(activeProject.id);
            } 

            //  assign active project name to projectBtn
            const projectBtnName = document.querySelector('#project-select-add-name');
            projectBtnName.textContent = activeProject.name;

            if (projectBtnName.textContent === 'Inbox@XFvW$W7') projectBtnName.textContent = 'Inbox';
            
            addTaskModal.showModal();
        });

        //  close Form
        const closeForm = () => {      
        FormPriorityList.resetPriority();
        addTaskModal.close();
        addTaskForm.reset();

        verifyValidity();
        }

        //  close form listener
        addTaskModal.addEventListener('click', (e) => {
            if (e.target === addTaskModal) {
                closeForm();
            }
        });

        cancelTaskBtn.addEventListener('click', closeForm);

        //  input listeners for validity
        name.addEventListener('input', verifyValidity);
        date.addEventListener('input', verifyValidity);

        //  add new task 
        addTaskBtn.addEventListener('click', () => {
            if (addTaskBtn.dataset.invalid === 'true') return;

            const taskName = name.value;
            const taskDescription = description.value;
            const taskDueDate = date.value;
            const taskPriority = priority.dataset.prioritySelected;
            const taskProjectId = project.dataset.projectSelected;

            taskManager.createTask(taskName, taskDescription, taskDueDate, taskPriority, taskProjectId);

            closeForm();
        })

        return { toggleProjectBtnIcon, assignIdToProjectBtn, verifyValidity }
    })();

    const FormProjectList = (() => {
        let formState; // add or edit taskForm
        const addTaskProjectBtn = document.querySelector('#project-select-add'); //  button for the add-task form
        const projectSelectBtn = document.querySelectorAll('.project-select'); //  all project select buttons 'add/edit form'
        const projectList = document.querySelector('.choose-project-list');

        const ulProjectList = projectList.querySelector('.choose-project-list > ul');
        const inboxLi = projectList.querySelector('#inbox-option');
        const checkMark = document.querySelector('#check-project-icon');

        const addProjectToList = (project) => {
            const li = document.createElement('li');
            li.classList.add('project-option');
            li.setAttribute('data-project-id', project.id);

            const colorDiv = document.createElement('div');
            colorDiv.classList.add('project-option-color');
            colorDiv.style.background = project.color;
            li.appendChild(colorDiv);

            const projectName = document.createElement('p');
            projectName.classList.add('project-option-name');
            projectName.textContent = project.name;
            li.appendChild(projectName);

            ulProjectList.appendChild(li);
            li.addEventListener('click', selectProject);
        }

        const generateProjectsToForm = () => {
            ulProjectList.innerHTML = '';

            const projects = projectManager.projects.filter((proj) => proj.name !== 'Inbox@XFvW$W7');
            projects.forEach((project) => addProjectToList(project));

            //  assign inbox list to first index
            inboxLi.setAttribute('data-project-id', projectManager.projects.find((proj) => proj.name === 'Inbox@XFvW$W7').id);
            inboxLi.addEventListener('click', selectProjectFromAddTask);
            ulProjectList.insertBefore(inboxLi, ulProjectList.firstChild);
        }

        // open project list
        projectSelectBtn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const selectedProjectLi = [...ulProjectList.childNodes].find(
                    (projectNode) => projectNode.dataset.projectId === e.target.dataset.projectSelected
                );
            
                selectedProjectLi.appendChild(checkMark);

                projectList.style.left = e.target.getBoundingClientRect().left + 'px';
                projectList.style.top = e.target.getBoundingClientRect().top + e.target.getBoundingClientRect().height + 'px';
                projectList.showModal();
                
                formState = e.target.id === 'project-select-add'? 'add': 'edit';
            });
        });

        // close project list
        projectList.addEventListener('click', (e) => {
            if (e.target === projectList) projectList.close();
        });

        //  select project
        const selectProject = (e) => {
            if (formState === 'add') {
                selectProjectFromAddTask(e);
            } else {
                console.log('invoke selectProjectFromEditTask function');
            }
        }

        const selectProjectFromAddTask = (e) => {
            const selectedId = e.target.dataset.projectId;
            const selectedProject = projectManager.projects.find(project => project.id === selectedId);

            const projectBtnColor = addTaskProjectBtn.querySelector('#project-select-add-color');
            const projectBtnName = addTaskProjectBtn.querySelector('#project-select-add-name');

            if (e.target === inboxLi) {
                AddTaskFormModule.toggleProjectBtnIcon('inbox');
                AddTaskFormModule.assignIdToProjectBtn(selectedId);
                projectBtnName.textContent = 'Inbox';
            } else {
                AddTaskFormModule.toggleProjectBtnIcon('custom-project');
                AddTaskFormModule.assignIdToProjectBtn(selectedId);
                projectBtnName.textContent = e.target.textContent;
                projectBtnColor.style.background = selectedProject.color;
            }

            addTaskProjectBtn.dataset.projectSelected = selectedId;
            projectList.close();
        }


        return { generateProjectsToForm }
    })();

    const FormPriorityList = (() => {
        let formState;  // add / edit taskForm
        const addTaskPriorityBtn = document.querySelector('#task-priority-add');
        const selectPriorityBtn = document.querySelectorAll('.form-task-priority');
        const priorityList = document.querySelector('#priority-list');

        // open list 
        selectPriorityBtn.forEach(btn => {
            btn.addEventListener('click', (e) => {
                priorityList.style.top = e.target.getBoundingClientRect().top + e.target.getBoundingClientRect().height + 'px';
                priorityList.style.left = e.target.getBoundingClientRect().left + 'px';
                priorityList.showModal();

                formState = e.target.id === 'task-priority-add'? 'add': 'edit';
            });
        });

        // close list
        priorityList.addEventListener('click', (e) => {
            if(e.target === priorityList) {
                priorityList.close();
            } 
        });

        const displaySvg = (dataSvg) => {
            const svgs = [...addTaskPriorityBtn.querySelectorAll('svg')];
            svgs.forEach(svg => svg.style.display = 'none');

            const selectedSvg = svgs.find(svg => svg.dataset.prioritySvg === dataSvg);
            selectedSvg.style.display = 'inline';
        }

        const selectPriorityFromAddTask = (e) => {
            const selectedPriority = e.target;
            const dataSvg = selectedPriority.dataset.prioritySvg;
            const p = addTaskPriorityBtn.querySelector('p');

            displaySvg(dataSvg);
            p.textContent = e.target.querySelector('p').textContent;

            addTaskPriorityBtn.dataset.prioritySelected = dataSvg;
            AddTaskFormModule.verifyValidity();

            priorityList.close();
        }

        const resetPriority = () => {
            displaySvg('hourglass');
            const p = addTaskPriorityBtn.querySelector('p');
            p.textContent = 'Priority';

            addTaskPriorityBtn.dataset.prioritySelected = '';
        }

        // select priority
        const selectPriority = (e) => {
            if (formState === 'add') {
                selectPriorityFromAddTask(e);
            } else {
                console.log('invoke selectPriorityFromEditTask function');
            }
        }

        const priorityOptions = document.querySelectorAll('.priority-option');
        priorityOptions.forEach(node => node.addEventListener('click', selectPriority));

        return { resetPriority }
    })();

    const TasksModule = (() => {
        const projectMenuIcon = document.querySelector('#main-project-menu');
        projectMenuIcon.addEventListener('click', (e) => {
            e.stopPropagation;
            projectMenuModule.openMenuFromMain(e);
        });
    })();

    return { NavModule, ProjectFormModule, FormProjectList };
})();



export { Interface };

//  box shadow
//  add-task