//Variables
const beerCardName = document.querySelector('#list-group');

//Functions
function getBeerData(){

    fetch('http://localhost:3000/beers')
        .then(resp => resp.json())
        .then(beers => injectBeers(beers))
        .catch(err => console.log(err))
}

function injectBeers(beers){
    beers.forEach(beer => {
        const container = document.querySelector('#list-group')
        const beerCard = `<ul class="list-group"><li class="list-group-item">${beer.name}</li></ul>`
        container.innerHTML += beerCard
    })
}

function singleBeerDetail(event){
    event.target.dataset.id = beer.id
    fetch(`http://localhost:3000/beers/${beer.id}`)
        .then(resp => resp.json())
        .then(beerDetails => injectBeerDetail(beerDetails))
        .catch(err => console.log(err))
}

function injectBeerDetail(beerDetails){
    
    beerDetails.forEach(singleBeer => {
        const beerCards = document.querySelector('#beer-detail')
        const beerData = `<h1>${singleBeer.name}</h1><img src=${singleBeer.image}><h3>${singleBeer.tagline}</h3><textarea>${singleBeer.description}</textarea><button id=${singleBeer.id} class="btn btn-info">Save</button>`
        beerCards.innerHTML += beerData
    })

}

//Display Single Beer Details
//click event happening on beer name
//when clicked, singleBeerDetail shows up
//  singleBeerDetail shows injectBeerDetail info


//Edit Beer Details




//Event Listeners
beerCardName.addEventListener('click', singleBeerDetail)


//Invoked Functions
getBeerData();
