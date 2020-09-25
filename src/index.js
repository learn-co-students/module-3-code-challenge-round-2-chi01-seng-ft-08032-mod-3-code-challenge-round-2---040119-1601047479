const beerUl = document.getElementById('list-group'),
beerCont = document.getElementById('beer-detail'),
body = document.querySelector('body')


// For buttons to work please uncomment the related functions and event handler tasks.
function main(){
    loadBeers()
    // createForm()
    beerUl.addEventListener('click', eventHandler)
}

function loadBeers(){
    fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    .then(beers => renderBeers(beers))
}

function renderBeers(beers){
    beers.forEach(beer => {
        beerUl.innerHTML += `
        <li data-id=${beer.id} class="list-group-item">${beer.name}</li>
        `
    })
}



function eventHandler(e){
    if (e.target.className === 'list-group-item'){
        showBeer(e)
    // } else if (e.target.id === 'like'){
    //     // mockLikeReq(e)
    //     let likes = parseInt(e.target.innerText.split(' ')[0])
    //     e.target.innerHTML = `${likes += 1} Likes`
    // } else if (e.target.id === 'delete'){
    //     deleteBeer(e)
    }
}

function showBeer(e){
    let beerId = e.target.dataset.id

    fetch(`http://localhost:3000/beers/${beerId}`)
    .then(resp => resp.json())
    .then(beer =>  renderShow(beer))
}


function renderShow(beer){
    beerCont.innerHTML = `
        <h1>${beer.name}</h1>
<img src=${beer.image_url}>
<h3>${beer.tagline}</h3>
<textarea>${beer.description}</textarea>
<button class='btn btn-info' id="like">0 Likes </button>
<button class='btn btn-info' id="delete">Delete</button>
<button data-id=${beer.id} id="edit-beer" class="btn btn-info">
    Save
</button>
`
let saveBtn = document.getElementById('edit-beer')
// let likeBtn = document.getElementById('like'),
// dltBtn = document.getElementById('delete')

// dltBtn.addEventListener('click', eventHandler)
// likeBtn.addEventListener('click', eventHandler)
saveBtn.addEventListener('click', editBeer)
}

function editBeer(e){
    let newDesc = e.target.parentElement.children[3].value,
    beerId = e.target.dataset.id,
    reqObj = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({description: newDesc})
    }

    fetch(`http://localhost:3000/beers/${beerId}`, reqObj)
    .then(resp => resp.json())
    .then(beer => renderShow(beer))
    
}

// function mockLikeReq(e){                                         Don't uncomment this, it wont work because there is
//     let likes = parseInt(e.target.innerText.split(' ')[0]),      no likes category in the database. This is strictly
//     beerId = e.target.nextElementSibling.dataset.id,             for demonstration purposes. And boredom
//     reqObj = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({likes: likes += 1})
//     }

//     fetch(`http://localhost:3000/beers/${beerId}`, reqObj)
// }

// function createForm(){
//     form = `
//     <form>
//   <label for="beer-name">Name:</label><br>
//   <input type="text" id="beer-bame" name="name"><br>

//   <label for="tagline">Tag line:</label><br>
//   <input type="text" id="tag-line" name="tag"><br><br>

//   <label for="description">Description:</label><br>
//   <textarea id='beer-desc'>Describe your beer</textarea>

//   <label for="image">Image Url:</label><br>
//   <input type="text" id="image-url" name="image"><br><br>

//   <input type="submit" value="Submit">
// </form>
//     `
//     let formDiv = document.createElement('div')
//     formDiv.className = 'new-form'
//     formDiv.innerHTML = form
//     body.append(formDiv)
//     formDiv.addEventListener('submit', createBeer)
// }

// function createBeer(e){
//     let beerName = e.target['name'].value,
//     tagline = e.target['tag'].value,
//     description = e.target.children[11].value,
//     image = e.target['image'].value,
//     newBeer = {
//         name: beerName,
//         tagline,
//         description,
//         image_url: image
//     },
//     reqObj = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newBeer)
//     }

//     fetch('http://localhost:3000/beers', reqObj)
// }

// function deleteBeer(e){
//     let beerId = e.target.nextElementSibling.dataset.id

//     fetch(`http://localhost:3000/beers/${beerId}`, {method: 'DELETE'})
// }


main()