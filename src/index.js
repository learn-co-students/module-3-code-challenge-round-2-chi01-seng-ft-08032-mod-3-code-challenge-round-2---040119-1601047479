
//main executable functions
function main(){
    beerList()
    listClickEvent()
    showClickEvent()
}
//global variables
const beerListGroup = document.querySelector(".list-group")
const showBeerCont = document.querySelector('#beer-detail')

//event listeners

function listClickEvent() {
    beerListGroup.addEventListener("click", showBeer)
}

function showClickEvent(){
    showBeerCont.addEventListener("click", updateDescription)
 }

 //show beer list functions
function beerList() {
    fetch(`http://localhost:3000/beers`)
    .then(resp => resp.json())
    .then(beers => showBeers(beers))
}

function showBeers(beers) {
    beers.forEach(beer => {
        const newBeer = document.createElement("li")
        newBeer.className = "list-group-item"
        newBeer.innerHTML = beer.name
        newBeer.dataset.id = beer.id
        beerListGroup.append(newBeer)
    })
}


//show individual beer functions
 function showBeer(e) {
    if (e.target.className === 'list-group-item') { 
        const id = e.target.dataset.id 
        fetch(`http://localhost:3000/beers/${id}`)
        .then(resp => resp.json())
        .then(beer => {
            showBeerCont.innerHTML = beerInfo(beer)
            showBeerCont.dataset.id = beer.id
        })
        
    }
 }

 function beerInfo(beer) {
   return `<h1> ${beer.name} </h1>
   <img src="${beer.image_url}">
   <h3> ${beer.tagline} </h3>
   <textarea> ${beer.description} </textarea>
   <button id="edit-beer" class="btn btn-info"> Save </button>`
 }

 
//function to update the description of beer
 function updateDescription(e){
     if (e.target.className === "btn btn-info"){
         //no prevent default because it's not a submit button
         const id = e.target.parentNode.dataset.id    
         const description = e.target.previousElementSibling.value 
         const reqObj = {
             method: 'PATCH',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify({description})
         }
         fetch(`http://localhost:3000/beers/${id}`, reqObj)
         .then(resp => resp.json())
         .then(beer => { 
             showBeerCont.querySelector("textarea").innerHTML = beer.description 
         })
        }
 }
main()