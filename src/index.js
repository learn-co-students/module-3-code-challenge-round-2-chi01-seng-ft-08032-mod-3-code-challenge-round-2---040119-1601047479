
function main() {
    getBeers();
    beerDetails();
    editBeer();
}

const beerListContainer = document.querySelector('ul.list-group')
const beerDetailContainer = document.querySelector('#beer-detail')

function getBeers() {
    fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    .then(beers =>{
        beers.forEach(function(beer){
            beerListContainer.innerHTML += `<li data-id='${beer.id}' class='list-group-item'>${beer.name}</li>`
        })
    })
}

function beerDetails() {
    beerListContainer.addEventListener('click', function(event){
        const beerId = event.target.dataset.id

        fetch(`http://localhost:3000/beers/${beerId}`)
        .then(resp => resp.json())
        .then(beer =>{
            beerDetailContainer.innerHTML = `
                <h1>${beer.name}</h1>
                <img src="${beer.image_url}">
                <h3>${beer.tagline}</h3>
                <textarea>${beer.description}</textarea>
                <button data-id='${beer.id}' id="edit-beer" class="btn btn-info">Save</button>
                `
        })
    })
}

function editBeer() {
    beerDetailContainer.addEventListener('click', function(event){
        if (event.target.className === 'btn btn-info') {
        const newBeerInfo = event.target.previousElementSibling.value
        const beerId = event.target.dataset.id

        const reqObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify ({
                "description": newBeerInfo
            })
        }
    
        fetch(`http://localhost:3000/beers/${beerId}`, reqObj)
        .then(resp => resp.json())
        .then(beer =>{
            beerDetailContainer.innerHTML = `
            <h1>${beer.name}</h1>
            <img src="${beer.image_url}">
            <h3>${beer.tagline}</h3>
            <textarea>${beer.description}</textarea>
            <button data-id='${beer.id}' id="edit-beer" class="btn btn-info">Save</button>
            `
          })
        }
    })
}

main()