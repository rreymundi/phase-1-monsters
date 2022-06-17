// some variables to be interpolated within my functions
let page = 1;
let limit = 50;
const url = 'http://localhost:3000/monsters/'


// this renders my monsters on the page
function displayMonsters(monsters){    
    const container = document.getElementById('monster-container')

    let list = monsters.map(monster => {
        return `
        <h2>${monster.name}</h2>
        <h3>${monster.age}</h3>
        <p>${monster.description}</p>
        `
    })
    container.innerHTML = list.join('')
}

// FETCH/GET request (this loads 50 monsters per page) & Change page functionality
function nextPage(){
    page++;
    changePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function prevPage(){
    if (page > 1) {
        page--;
        changePage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function changePage(page){
    function getMonsters(){
        fetch(`${url}?_limit=${limit}&_page=${page}`)
        .then(res => res.json()).then(monsters => displayMonsters(monsters))
    }
    getMonsters()
    const btn_next = document.getElementById("forward");
    const btn_prev = document.getElementById("back");
    btn_next.addEventListener('click', nextPage)

    btn_prev.addEventListener('click', prevPage)
}

// POST request (this creates a new monster by using the form)
function createMonster(monster){
    fetch(url, {
        method: 'POST', 
        headers: {
            "Content-type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify(monster)
    })
    .then(res => res.json())
    .then(data => changePage(page))
}

// init my functions AFTER the DOM has loaded
document.addEventListener('DOMContentLoaded', () => {
    changePage(page)
    const form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const name = form.name.value
        const age = form.age.value
        const description = form.description.value
        const monster = {name, age, description}
        createMonster(monster)
        form.reset()
    })

})

