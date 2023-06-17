import { projectManager } from "./app";

const Interface = (() => {

    const NavModule = (() => {
        const favoriteList = document.querySelector('.favorites-list');

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

        return {addProjectToFavorites, generateFavoritesToNav}
    })();

    return {NavModule}
})();

export {Interface}