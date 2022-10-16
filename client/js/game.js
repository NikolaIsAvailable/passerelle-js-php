//////////////////////////////////////////////
////-----Constante, variable globale-----////
////////////////////////////////////////////


let params = (new URL(document.location)).searchParams; // https://developer.mozilla.org/fr/docs/Web/API/URL/searchParams
let id = params.get('id');

const erreur = document.getElementById('erreur');

const buttonAvis = document.getElementById('new-avis');



//////////////////////////////////////
////-----------Fonction----------////
////////////////////////////////////


/*function displayFiche(dataGames)
{
    const fiche = document.getElementById('games-fiche');

    console.table(dataGames);

    fiche.innerHTML = null;

    for(let index = 0; index < dataGames.length; index++)
    {
        const dataGame = dataGames[index];

        console.log(dataGame);


       if(dataGame['Id'] == id)
       {
            fiche.innerHTML +=
            `<div id="detail-jeu" class="row flex-nowrap container">
                <div id="photo" class="mr-4">
                    <img src="${dataGame.UrlPochette}" alt="">
                </div>
                <div class="d-flex flex-column justify-content-between">
                    <div>
                        <div class="row justify-content-between mx-5">
                            <h3 id="note">${dataGame.Note}/20</h3>
                            <h2 id="prix">${dataGame.Prix} €</h2>
                        </div>
                        <div class="mt-5">
                            <h1 id="nom">${dataGame.Nom}</h1>
                            <article id="descritpion">${dataGame.Description}</article>
                        </div>
                    </div>
                    <h3 id="date-sortie">${dataGame.DateSortie}</h3>
                </div>
            </div>`;
       }
    }
}*/


function displayFiche(dataGames)
{
    const nom = document.getElementById('nom');
    const photo = document.getElementById('photo');
    const note = document.getElementById('note');
    const prix = document.getElementById('prix');
    const description = document.getElementById('description');
    const dateSortie = document.getElementById('date-sortie');

    console.log(dataGames);

    nom.innerHTML = null;
    photo.innerHTML = null;
    note.innerHTML = null;
    prix.innerHTML = null;
    description.innerHTML = null;
    dateSortie.innerHTML = null;

    nom.innerHTML = `${dataGames.Nom}`;
    photo.innerHTML = `<img src="${dataGames.UrlPochette}" alt="">`;
    note.innerHTML = `Note : ${dataGames.Note}/20`;
    prix.innerHTML = `Prix : ${dataGames.Prix} €`;
    description.innerHTML = `${dataGames.Description}`;
    dateSortie.innerHTML = `${dataGames.DateSortie}`;
}


function displayAvis(dataAvis)
{
    const avis = document.getElementById('games-avis');
    /*const pseudo = document.getElementById('pseudo');
    const commentaire = document.getElementById('commentaire');*/

    console.log(dataAvis);

    let html = "";

    /*pseudo.innerHTML = null;
    commentaire.innerHTML = null;*/

    html += `<div id="avis"><h1 id="titre-avis">Avis</h1>`;

    if (typeof dataAvis !== 'undefined' && dataAvis.length > 0) // Est-ce que l'array est défini, est a au moins 1 élement
    {
        for(let index = 0; index < dataAvis.length; index++)
        {
            html += `
            <h3 id="pseudo">${dataAvis[index].Pseudo} :</h3>
            <article id="commentaire" class="mb-5">${dataAvis[index].Commentaire}</article>`;
        }
    }
    else
    {
        html += `<h3 id="pseudo">Pas encore de commentaire sur ce jeu.</h3>`;
    }
    html += `</div>`;
    
    avis.innerHTML += html;
}


function preparerFormulaireAvis()
{
    // Construction d'un formulaire pour l'envoi au PHP dans variable $_POST
    let form = new FormData();
    // On peut aussi directement récupérer tout le contenu d'un <form> en le donnant à FormData :
    // exemple : let form = new FormData(document.getElementById('form-avis'));
    // https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch

    let newPseudo = document.getElementById('new-pseudo').value;
    let newCommentaire = document.getElementById('new-commentaire').value;

    // Ajout des champs au formulaire.
    form.append('new-pseudo', newPseudo); // 'new-pseudo' sera accessible en PHP via $_POST['new-pseudo']
    form.append('new-commentaire', newCommentaire);

    if(newPseudo.length == 0 || newCommentaire.length == 0)
    {
        erreur.innerHTML = null;

        erreur.innerHTML += `<h3>Erreur, il faut écrire un commentaire sinon cela ne marchera pas!!</h3>`;

        return
    }

    window.fetch(`http://localhost:80/jeux-videos/serveur/api/avis.php?id=${id}`, 
    {
        method: 'POST',
        body: form
    })
    .then(function (response)
    {
        return response.json();
    })
    .then(function (results)
    {
        console.log(results);
    });

    document.location.reload(true);
}


//////////////////////////////////////
////-------Code Principale-------////
////////////////////////////////////


buttonAvis.addEventListener('click', preparerFormulaireAvis);


window.fetch(`http://localhost:80/jeux-videos/serveur/api/jeu_video.php?id=${id}`)
    .then(function (response)
    {
        return response.json();
    })
    .then(function (dataGames)
    {
        window.fetch(`http://localhost:80/jeux-videos/serveur/api/avis.php?id=${id}`)
            .then(function (response)
            {
                return response.json();
            })
            .then(function (dataAvis)
            {
                displayFiche(dataGames);
                displayAvis(dataAvis);
            })
    })

/*window.fetch(`http://localhost:8888/jeux-videos/serveur/api/jeu_video.php`)
        .then(function (response)
            {
                return response.json();
            })
        .then(function (results)
        {
            games = results;

            displayFiche(games);        
        })*/

       




