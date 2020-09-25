function main() {
    fetchBeers()
    beerInfo()
    //editBeer()
}


function fetchBeers(){
    fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    .then(beers => {
        beers.forEach(beer => {

            const listGroup = document.querySelector('.list-group')
            listGroup.innerHTML += `<li class="list-group-item"> ${beer.name} </li>`

        })
    })
}

function beerInfo() {
    const listGroup = document.querySelector('.list-group')

    fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    .then(beers => {
        beers.forEach(beer => {


            listGroup.addEventListener('click', function(e) {

                const beerDetail = document.querySelector('#beer-detail')
                debugger
                // come back to this append
                //get the id ${beer.id}
                beerDetail.innerHTML += `<h1 data-set=${beer.id}>${beer.name}</h1>
                <img src=${beer.image_url}>
                <h3>${beer.tagline}</h3>
                <textarea>${beer.description}</textarea>
                <button id="edit-beer" class="btn btn-info">
                Save
                </button>`

                
            })
        })
    })
}

// When looking at the details of a beer, I can edit the current description of a beer. 
// Clicking the 'Save' button will save any changes added to the description in the database. 
// The edited beer should also update the DOM. 

// function editBeer() {
//     const saveBtn = document.querySelector('#edit-beer')

//     saveBtn.addEventListener('submit', function(e) {
//         e.preventDefault()

        
//         const getText = e.target[3].value

//         const reqObj = {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Accept': 'application/json'
//               },
//               Body: JSON.stringify({getText})
//             }
//         }

//         fetch('http://localhost:3000/beers', reqObj)
//         .then(resp => resp.json())
//         .then(beers => {
//             saveBtn.append(getText)
//         })




    
    
//     })
    
// }






main();