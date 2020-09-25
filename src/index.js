
const beerUl = document.querySelector('.list-group')
const outerDiv = document.querySelector('.row')
const beerDetailDiv = document.querySelector('#beer-detail')

const main = () => {
  fetchBeerNames()
  addClickListener()
}

const addClickListener = () => {
  outerDiv.addEventListener('click', e =>{
    let target = e.target.className
    switch (target) {
      case 'list-group-item':
        fetchBeerData(e)
        break;
      case 'btn btn-info':
        patchBeerDesc(e)
        break;
    }
  })
}

const fetchBeerNames = () => {
  fetch('http://localhost:3000/beers')
    .then(res => res.json())
    .then(displayBeerNames);
}

const displayBeerNames = beersData => {
  beersData.forEach(beer => {
  let beerLi = `<li class="list-group-item" data-id=${beer.id}>${beer.name}</li>`
  beerUl.innerHTML += beerLi
  })
}

const fetchBeerData = e => {
  let beerId = e.target.dataset.id
  fetch(`http://localhost:3000/beers/${beerId}`)
  .then(res => res.json())
  .then(displayBeerDetail);
}

const displayBeerDetail = beer => {
  let pairingLis = beer.food_pairing.map(pairing => {
    return `<li>${pairing}</li>`
  }).join('')
  let beerCard =
  `<h1>${beer.name}</h1>
  <img src=${beer.image_url}>
  <h3>${beer.tagline}</h3><br>
  <p><b>First brewed:</b> ${beer.first_brewed}</p>
  <p><b>Brewer's tips</b>: ${beer.brewers_tips}</p>
  <p><b>Pair with:</b></p>
  <ul>${pairingLis}</ul><br>
  <p><b>About this beer:</b></p>
  <textarea>${beer.description}</textarea>
  <button id="edit-beer" class="btn btn-info" data-id=${beer.id}>
    Save
  </button><br><br>
  <small>Contributed by: ${beer.contributed_by}</small>`
  beerDetailDiv.innerHTML = beerCard
}

const patchBeerDesc = e => {
  let beerId = parseInt(e.target.dataset.id)
  let newDesc = e.target.previousElementSibling.value
  const reqObj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({description: newDesc})
  }
  fetch(`http://localhost:3000/beers/${beerId}`, reqObj)
  .then(res => res.json())
  .then(displayNewBeerDesc);
}

const displayNewBeerDesc = updatedBeer => {
  alert('Cheers, your description\'s been saved! 🍻')
  let textArea = document.querySelector('textarea')
  textArea.innerHTML = updatedBeer.description
}

main()
