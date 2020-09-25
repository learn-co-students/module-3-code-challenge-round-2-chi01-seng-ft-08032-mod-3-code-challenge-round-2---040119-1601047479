
//event listeners

const addBeerListeners = () => {
    const beerRow = document.getElementById('row');
    beerRow.addEventListener('click', e => {
        if(e.target.className === 'list-group-item'){
            individualBeer(e);
        }
        else if(e.target.id === 'edit-beer') {
            updateBeer(e);
        }
    });

}

//functions

const fetchAllBeers = () =>{
    fetch('http://localhost:3000/beers')
    .then(response => response.json())
    .then(response => {
        renderBeers(response);
        addBeerListeners();
    })
    .catch(error => {
        alert(error)
        return Promise.reject()
    });
}

const renderBeers = beers => {
    const beerUl = document.getElementById('list-group');
    let beerLis = ''
    beers.forEach(beer => {
        beerLis += `<li class="list-group-item" id="${beer.id}">${beer.name}</li>`
    });
    beerUl.innerHTML = beerLis;

}

const individualBeer = e => {
    const beerId = e.target.id;
    fetch(`http://localhost:3000/beers/${beerId}`)
    .then(response => response.json())
    .then(response => {
        renderIndivBeer(response);
    });
}

const renderIndivBeer = beer => {
    let beerDiv = document.getElementById('beer-detail');
    let beerInfo = 
    `<h1>${beer.name}</h1>
    <img src="${beer.image_url}">
    <h3>${beer.tagline}</h3>
    <textarea>${beer.description}</textarea>
    <button id="edit-beer" class="btn btn-info" data-id= ${beer.id}>
      Save
    </button>`
    beerDiv.innerHTML = beerInfo;
}

const updateBeer = (e) => {
    const beerId = e.target.dataset.id;
    const textArea = e.target.previousElementSibling;
    const updatedText = textArea.value;
    const data = {
        description: updatedText
    }
    const configObj = 
        {
            method: 'PATCH',
            headers: {
                "Content-Type" : "application/json", 
                "Accept" : "application/json"
              },
              body: JSON.stringify(data)
        }
    fetch(`http://localhost:3000/beers/${beerId}`, configObj)
    .then(response => response.json())
    .then(beer => {
        textArea.innerText = beer.description;
        alert(`${beer.name}'s description has been updated!`);
    });
}

//execution order 

const main = () => {
    fetchAllBeers();
}

main()