//Variables
const beerList = document.getElementById("list-group")
const beerDetail = document.getElementById("beer-detail")

//Function
function getBeersData() {
  fetch("http://localhost:3000/beers")
    .then(resp => resp.json())
    .then(beersData => appendBeersToList(beersData))
    .catch(err => console.log(err))
}

function appendBeersToList(beersData) {
  let beerString = ""
  beersData.forEach(beer => {
    beerString += `<li class="list-group-item" data-beerid=${beer.id}>${beer.name}</li>`
  })
  beerList.innerHTML = beerString
}

function beerDetailHandler() {
  if (event.target.className === "list-group-item"){
    appendBeerDetailFetch(event.target.dataset.beerid)
  }
}

function appendBeerDetailFetch(id) {
  fetch(`http://localhost:3000/beers/${id}`)
    .then(resp => resp.json())
    .then(beerData => appendBeerDetail(beerData))
    .catch(err => console.log(err))
}

function appendBeerDetail(beerData) {
  beerDetail.innerHTML = `
    <h1>${beerData.name}</h1>
    <img src=${beerData.image_url}>
    <h3>${beerData.tagline}</h3>
    <textarea>${beerData.description}</textarea>
    <button data-id=${beerData.id} class="btn btn-info">Save</button>
  `
}

function editBeerDetailHandler() {
  if (event.target.innerText === "Save") {
    editBeerDetail(event.target.dataset.id)
  }
}

function editBeerDetail(id) {
  const newDescription = event.target.previousElementSibling.value
  const patchObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({description: newDescription})
  }

  fetch(`http://localhost:3000/beers/${id}`, patchObj)
    .then(resp => resp.json())
    .then(beerData => console.log(beerData))
    .catch(err => console.log(err))
}

//Event Listeners
beerList.addEventListener("click", beerDetailHandler)
beerDetail.addEventListener("click", editBeerDetailHandler)

//Invoked Functions
getBeersData()
