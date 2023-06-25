const Utils = (() => {
    const toggleFavorites = (() => {
        const dropDownIcon = document.querySelector('#dropdown-favorites');
        const projects = document.querySelector('.projects');
    
        const hide = () => {
            dropDownIcon.classList.remove('drop');
            projects.style.top = '30px';
        };
    
        const drop = () => {
            dropDownIcon.classList.add('drop');
            const favoritesHeight = document.querySelector('.favorites').clientHeight;
            projects.style.top = favoritesHeight + 'px';
        };
    
        const extend = () => {
            if (dropDownIcon.classList.contains('drop')) {
                const favoritesHeight = document.querySelector('.favorites').clientHeight;
                projects.style.top = favoritesHeight + 'px';
            }
        }
    
        dropDownIcon.addEventListener('click', () => {
            if (dropDownIcon.classList.contains('drop')) {
                hide();
            } else {
                drop();
            }
        });
    
        return {extend}
    })();
    
    const toggleProjects = (() => {
        const dropDownIcon = document.querySelector('#dropdown-projects');
        const hideProjectsDiv = document.querySelector('.hide-projects');
    
        const hide = () => {
            dropDownIcon.classList.remove('drop');
            const projectsHeight = document.querySelector('.projects').clientHeight;
            hideProjectsDiv.style.height = projectsHeight + 'px';
            hideProjectsDiv.style.top = '50px';
        }
    
        const drop = () => {
            dropDownIcon.classList.add('drop');
            const projectsHeight = document.querySelector('.projects').clientHeight;
            hideProjectsDiv.style.top = projectsHeight + 'px';
        }

        const extend = () => {
            if (dropDownIcon.classList.contains('drop')) {
                const projectsHeight = document.querySelector('.projects').clientHeight;
                hideProjectsDiv.style.top = projectsHeight + 'px';
            }
        }
        
        dropDownIcon.addEventListener('click', () => {
            if (dropDownIcon.classList.contains('drop')) {
                hide();
            } else {
                drop();
            }
        });

        return {hide, extend}
    })();

    return {toggleFavorites, toggleProjects}
})();

export { Utils };
