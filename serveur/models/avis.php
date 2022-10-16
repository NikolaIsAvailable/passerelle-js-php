<?php

function listerAvis($idJeu)
{
    $pdo = pdo();

    $resultat = $pdo -> prepare("SELECT IdJeuVideo, Pseudo, Commentaire
                                 FROM Avis
                                 WHERE IdJeuVideo = :idJeu");

    $resultat -> bindParam(':idJeu', $idJeu);

    $resultat -> execute();

    $donneeAvis = $resultat -> fetchAll(PDO::FETCH_ASSOC);

    return $donneeAvis;
}


function ajouterAvis($idJeu, $newPseudo, $newCommentaire)
{
    $pdo = pdo();

    $resultatAjout = $pdo -> prepare("INSERT INTO Avis (IdJeuVideo, Pseudo, Commentaire)
                                      VALUES (:idJeu, :pseudo, :commentaire)");


    $resultatAjout -> bindParam(':idJeu', $idJeu);

    $resultatAjout -> bindParam(':pseudo', $newPseudo);
    $resultatAjout -> bindParam(':commentaire', $newCommentaire);


    $resultatAjout -> execute();
}
