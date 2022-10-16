//////////////////////////////////////////////
////-----Constante, variable globale-----////
////////////////////////////////////////////

let games = new Array();

let audio = new Audio('https://www.youtube.com/watch?v=gN_x1rpGbY8');

const buttonMorve = document.querySelector('.bouton-morve');
const morveBoy = document.querySelector('.morve-au-nez');
const redLion = document.querySelector('.lion-rouge2');
const sortGame = document.getElementById('sort');


//////////////////////////////////////
////-----------Fonction----------////
////////////////////////////////////


function displayMorveBoy()
{
    morveBoy.classList.toggle('morve');
    redLion.classList.toggle('end');
}


function refresh(dataGames)
{
    const ul = document.getElementById('games-results');

    console.table(dataGames);

    ul.innerHTML = null;

    for(let index = 0; index < dataGames.length; index++)
    {
        const dataGame = dataGames[index];

        ul.innerHTML +=
            `<li class="card mb-5" style="width: 20rem;">
                <a href="game.html?id=${dataGame.Id}">
                    <img class="card-img-top" src="${dataGame.UrlPochette}" alt="Card image cap">
                </a>
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                    <h5 class="card-title">${dataGame.Nom}</h5>
                    <h6 class="card-text"><strong>Éditeur : </strong>${dataGame.Editeur}</h6>
                    <p class="card-text"><strong>Année : </strong>${dataGame.DateSortie}</p>
                    <p class="card-text"><strong>Description : </strong>${dataGame.Description.substr(0,100)}...</p>
                    </div>

                    <div class="mt-2">
                    <p class="card-text"><strong>Note : </strong>${dataGame.Note}/20</p>
                    <p class="card-text float-right"><strong>Prix : </strong>${dataGame.Prix} €</p>
                    </div>
                </div>
            </li>`;
    }
}


function sortByName(a, b)
{
    if(a.Nom < b.Nom)
    {
        return -1;
    }
    if(a.Nom > b.Nom)
    { 
        return 1; 
    }

    return 0;
}


function sortByLowPrice(a, b)
{
    
    if(parseFloat(a.Prix) < parseFloat(b.Prix))
    {
        return -1;
    }
    if(parseFloat(a.Prix) > parseFloat(b.Prix))
    {
        return 1;
    }

    return 0;
}


function sortByHighPrice(a, b)
{
    if(parseFloat(a.Prix) < parseFloat(b.Prix))
    {
        return 1;
    }
    if(parseFloat(a.Prix) > parseFloat(b.Prix))
    {
        return -1;
    }

    return 0;
}


function sortByDate(a, b)
{
    aDate = new Date(a.DateSortie);
    bDate = new Date(b.DateSortie);

    return aDate>bDate ? 1 : aDate<bDate ? -1 : 0;
}


function onChangeSort(event)
{
    let gameValue = event.currentTarget;

    const valueGames = gameValue.value;

    switch (valueGames) 
    {
        case 'Nom' :
            games.sort(sortByName);
        break;

        case 'Prix-' :
            games.sort(sortByLowPrice);
        break;

        case 'Prix+' :
            games.sort(sortByHighPrice);
        break;

        case 'Date_de_sortie' :
            games.sort(sortByDate);
        break;
    }
    
    return refresh(games);
}


//////////////////////////////////////
////-------Code Principale-------////
////////////////////////////////////


buttonMorve.addEventListener('click', displayMorveBoy);
sortGame.addEventListener('change', onChangeSort);


window.fetch(`http://localhost:80/jeux-videos/serveur/api/jeu_video.php`)
        .then(function (response)
            {
                return response.json();
            })
        .then(function (results)
        {
            games = results;

            refresh(games);        
        })

       




