<?php

function listerJeux()
{
    $pdo = pdo();

    $resultat = $pdo -> query("SELECT JeuVideo.Id, JeuVideo.Nom, JeuVideo.Description, JeuVideo.DateSortie, JeuVideo.Note, JeuVideo.Prix, JeuVideo.UrlPochette,Genre.Nom AS Genre, Editeur.Nom AS Editeur
                               FROM JeuVideo 
                               INNER JOIN Genre 
                               ON JeuVideo.IdGenre = Genre.Id
                               INNER JOIN Editeur 
                               ON JeuVideo.IdEditeur = Editeur.id");

    $listJeux = $resultat -> fetchAll(PDO::FETCH_ASSOC);

    for($i = 0; $i < count($listJeux); $i++)
    {
        $listJeux[$i]["UrlPochette"] = "../serveur/www/img/" . $listJeux[$i]["UrlPochette"];
    }

    return $listJeux;
}   

function lireJeux()
{
    $id = $_GET['id'];

    $pdo = pdo();

    $resultat = $pdo -> prepare("SELECT JeuVideo.Id, JeuVideo.Nom, JeuVideo.Description, JeuVideo.DateSortie, JeuVideo.Note, JeuVideo.Prix, JeuVideo.UrlPochette,Genre.Nom AS Genre, Editeur.Nom AS Editeur
                               FROM JeuVideo
                               INNER JOIN Genre
                               ON JeuVideo.IdGenre = Genre.Id
                               INNER JOIN Editeur
                               ON JeuVideo.IdEditeur = Editeur.Id
                               WHERE JeuVideo.Id = :id");

    $resultat -> execute([':id' => $id]);

    $donneeFiche = $resultat -> fetch(PDO::FETCH_ASSOC);

    $donneeFiche["UrlPochette"] = "../serveur/www/img/" . $donneeFiche["UrlPochette"];

    return $donneeFiche;
}