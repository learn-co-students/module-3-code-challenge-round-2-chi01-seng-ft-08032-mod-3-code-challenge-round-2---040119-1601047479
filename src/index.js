
function main(){
    getBeerData()
    renderBeer()
    editBeerDetails()
}

const beerUl = document.querySelector(".list-group")
const beerDetail = document.querySelector("#beer-detail")
const form = document.querySelector("#edit-beer") //not sure about this


function getBeerData(){
    fetch("http://localhost:3000/beers")
    .then(resp => resp.json())
    .then(beerData => {
        beerData.forEach(function(beer){
            beerUl.innerHTML += `<li class="list-group-item">${beer.name}</li>`
        })
    })
}

function renderBeer(){
    beerUl.addEventListener("click", function(event){
        const beerName = event.target.innerText
        fetch("http://localhost:3000/beers")
        .then(resp => resp.json())
        .then(beerData => {
        beerData.forEach(function(beer){
            if (beerName === beer.name){
                beerDetail.innerHTML =
                `<h1>${beer.name}</h1>
                <img src="${beer.image_url}">
                <h3>${beer.tagline}</h3>
                <textarea>${beer.description}</textarea>
                <button id="edit-beer" class="btn btn-info">Save</button>`
                }
            })
        })
    })
}



function editBeerDetails(){
    form.addEventListener("click", function(event){   //working on this now/last
        debugger                                       //can't hit debugger!?      
    })
    const reqObj = {
        method: "PATCH", 
        headers: {
            "Content-Type": "application/json",       //I knew i needed this stuff so i typed it out first
            "Accept": "application/json"                            
        },
        body: {
            description: "your new description"
        }
    }
    fetch("http://localhost:3000/beers/:id")
    .then(resp => resp.json())
    .then(beerData => {
        beerData.forEach(function(beer){            //also added this before trying to look at the event listener
            if (beerName === beer.name){
                beerDetail.innerHTML =
                `<h1>${beer.name}</h1>
                <img src="${beer.image_url}">
                <h3>${beer.tagline}</h3>
                <textarea>${beer.description}</textarea>
                <button id="edit-beer" class="btn btn-info">Save</button>`
            }
        })
    })
}


main()