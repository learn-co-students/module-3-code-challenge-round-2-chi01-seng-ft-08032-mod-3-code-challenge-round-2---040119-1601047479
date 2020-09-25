//variables
const beerList = document.querySelector('.list-group')
const beerDetail = document.querySelector('#beer-detail')

//listeners
beerList.addEventListener('click', detailExpand)

//listener.functions
beerDetail.addEventListener('click', function(event){
    if (event.target.id === 'edit-beer') {
        updateDescription(event)
    }
})

//invoked.functions
function main() {
    loadBeers()
}
main()

//main.functions
function loadBeers() {
    fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    .then(beers => {
        beers.forEach(function(beer){
            beerList.innerHTML += `
            <li data-id="${beer.id}" class="list-group-item">${beer.name} 🍺 </li>
            `
        })
    })
}

function fillDetails(beer) {
    beerDetail.innerHTML = ""
    beerDetail.innerHTML += `
    <h1>${beer.name} 🍺 </h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button data-id="${beer.id}" id="edit-beer" class="btn btn-info">Save 🍺</button>
    `
}

function detailExpand(event) {
    id = event.target.dataset.id
    fetch(`http://localhost:3000/beers/${id}`)
    .then(resp => resp.json())
    .then(beer => {
        fillDetails(beer)
    })
}

function updateDescription(event) {
    const newDescription = event.target.previousElementSibling.value
    const id = event.target.dataset.id
    
    const reqObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({description: newDescription})
    }
    fetch(`http://localhost:3000/beers/${id}`, reqObj)
    .then(resp => resp.json())
    .then(beer => {
        newDescription.reset()
    })
}