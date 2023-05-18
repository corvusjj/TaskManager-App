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

    return { generateId, removeId}
})();