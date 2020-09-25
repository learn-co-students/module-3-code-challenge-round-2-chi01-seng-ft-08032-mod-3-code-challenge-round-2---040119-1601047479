function main(){
    displayBeers()
    showSingleBeerInfo()
    editBeerDetails()
}

const listUl = document.querySelector('#list-group')
const beerDetailsDiv = document.querySelector('#beer-detail')
const textArea = document.querySelector('#text-area')

function displayBeers(){
    fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    .then(beers => {
        beers.forEach(function(beer_inst){
            listUl.innerHTML += `<li class="list-group-item" data-id='${beer_inst.id}'>${beer_inst.name}</li>`
        })
    })
}


function showSingleBeerInfo(){
    listUl.addEventListener('click', function(event){
        const beerId = event.target.dataset.id
        fetch(`http://localhost:3000/beers/${beerId}`)
        .then(resp => resp.json())
        .then(beer => {
                beerDetailsDiv.innerHTML = 
                    `<h1>${beer.name}</h1>
                    <img src="${beer.image_url}" id='beer-image'>
                    <h3>${beer.tagline}</h3>
                    <textarea id='text-area'>${beer.description}</textarea>
                    <button id="edit-beer" class="btn btn-info" data-id='${beer.id}'>
                    Save
                    </button> `
                })
            })
}

function editBeerDetails(){
    beerDetailsDiv.addEventListener('click', function(event){
        
        if (event.target.className === "btn btn-info"){
            const beerId = event.target.dataset.id
            const newDescription = event.target.parentNode.childNodes[6].value
            const beerInfo = {
                description: newDescription
            }
            const reqObj = {
                method: 'PATCH', 
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(beerInfo)
            }
            fetch(`http://localhost:3000/beers/${beerId}`, reqObj)
            .then(resp => resp.json())
            .then( beer => {
                alert(`${beer.name}'s description has been saved as "${beer.description}"`)
            })
        }
    })
}




main()
