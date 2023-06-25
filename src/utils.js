const toggleFavorites = (() => {
    const dropDownIcon = document.querySelector('#dropdown-favorites');
    const projects = document.querySelector('.projects');

    const hide = () => {
        dropDownIcon.classList.remove('drop');
        projects.style.top = '30px';
    };

    const display = () => {
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
            display();
        }
    });

    return {extend}
})();

export { toggleFavorites };

//  figure out opening favorites nav when adding new fav
