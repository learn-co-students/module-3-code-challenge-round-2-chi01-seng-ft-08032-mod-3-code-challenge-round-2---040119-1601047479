function main(){
clickListener()
editListener()
}
//fetching beer list and appending it to the DOM
fetch('http:localhost:3000/beers')
.then(resp => resp.json())
.then(beers => {
    beers.forEach(beer => {
        const container = document.querySelector('.col-md-4')
        const beerListing = `<ul class="list-group">
        <li class="list-group-item" data-id=${beer.id}>${beer.name}</li></ul>`
        container.innerHTML += beerListing
    })
})
// adding click listener to each beer name
// showpage data populates the screen for individual beer
// beer has been assigned data-id
function clickListener(){
    const form = document.querySelector('.col-md-4')
    form.addEventListener('click', function(e){
        const beerShowInfo = e.target.innerText
        fetch('http://localhost:3000/beers')
        .then(resp => resp.json())
        .then(beerData => {
            e.preventDefault()
            beerData.forEach(function(beer){
            if(beerShowInfo === beer.name){
                form.innerHTML = 
                `<div id="beer-detail">
                <h1>${beer.name}</h1>
                <img src="${beer.image_url}">
                <h3>${beer.tagline}</h3>
                <textarea>${beer.description}</textarea>
                <button id="edit-beer" class="btn btn-info">Save</button>)</div>`
            }

            })
            })
      
    }
    )
}
    
// grabbing the area for text entry
// adding event listener of submit to scrape data from textarea 
    function editListener(){
        const form = document.querySelector('textarea')
        form.addEventListener('submit', function(e){
            const formData = {
                description: e.target['textarea'].value
            }

        })
    }
// reqObj for PATCH, since default is GET
// formatting payload in JSON.stringify
    const reqObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }

// fetch request of PATCH to backend to update

    function editBeerDetails(){
        fetch(`http://localhost:3000/beers/${beer.id}`, reqObj)
        .then(resp => resp.json())
        .then(beerData => {
            const container = document.querySelector('textarea')


            

        })

    }

    
    






















main()