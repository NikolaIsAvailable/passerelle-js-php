<?php

include '../lib/database.php';

include '../models/avis.php';

if(!empty($_POST))
{
    // HTTP POST : donc on veut ajouter un nouvel avis dans la BDD
    
    ajouterAvis($_GET['id'], $_POST['new-pseudo'], $_POST['new-commentaire']);
}
else
{
    // HTTP GET : donc on veut lister tous les avis d'un jeu vidéo spécifique
    echo json_encode(listerAvis($_GET['id']));
}