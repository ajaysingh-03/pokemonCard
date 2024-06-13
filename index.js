let pokemonCardContainer = document.getElementById("pokemon-card-container");
let searchInput = document.getElementById("search");
let ResetBtn = document.getElementById("ResetBtn");
let filterBtn = document.getElementById("filterBtn");

function createPokemonCard(detail){
    let card  = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <div class = "card-inner" id="${detail.types[0].type.name}">

    <div class = "card-content">

    <div class = "card-front">
    <div class ="id">#${detail.id}</div>
    <img src ='${detail.sprites.front_default}' class="front-image"/>
    <div class ="name">${detail.name}</div>
    <div class ="type">${detail.types[0].type.name}</div>
    </div>

    <div class="card-back">
    <img src ='${detail.sprites.back_default}' class="back-image"/>
    <div class ="abilities">
    <p>Abilities:</p>
    ${detail.abilities[0].ability.name}</div>
    </div>

    </div>

    </div>
    `;
    return card;

    // console.log  (card);
    
}

filterBtn.addEventListener("click", function(){
    let allCard = document.querySelectorAll(".card");
    allCard.forEach(function(card){
        console.log(card);
        let pokeType = card.children[0].children[0].children[0].children[3].innerText;
        
        if(pokeType === types.value){
            card.style.display="block";
        }else{
            card.style.display="none";
        }
    })
    // console.log(allCard);
})

searchInput.addEventListener("input", function(){
    let serachValue = searchInput.value;
    // console.log(serachValue);
    let allCard = document.querySelectorAll(".card");
    
    allCard.forEach(function(card){
        let pokeName = card.children[0].children[0].children[0].children[2].innerText;
        
        // console.log(pokeName);
        if(pokeName.startsWith(serachValue)){
            card.style.display = "block";
            
        }else{
            card.style.display = "none";
        }
    })
})

ResetBtn.addEventListener("click", function(){
    window.location.reload();
})

async function fetchPoke(i){
    let data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    let result = await data.json();
    // console.log(result);
    return result;
}

async function maindata(){
    for(let i=1; i<=151; i++){
        let pokemon = await fetchPoke(i);
        // console.log(pokemon);
        let card = createPokemonCard(pokemon);
        pokemonCardContainer.appendChild(card);
    }
}
maindata();


let arr = [1,2,3,4,5,6,7];
let stringifyArr = JSON.stringify(arr);
localStorage.setItem("arr", stringifyArr);
console.log(JSON.parse(localStorage.getItem("arr")));