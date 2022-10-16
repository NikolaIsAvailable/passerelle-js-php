<?php

function pdo()
{
    $pdo = new PDO('mysql:host=localhost:3308;dbname=videogames', // driver mysql + nom du serveur + nom de la BDD
    'root', // Pseudo de la BDD
    '', // '' Pour XAMP // Mot de passe de la BDD
    array(PDO::ATTR_ERRMODE => PDO::ERRMODE_WARNING, // Option pour afficher les erreurs SQL dans le navigateur
         PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8' // Jeu de caractères des échanges avec la BDD
         )     
                 
);
    return $pdo;
// $pdo est un objet issu de la classe prédéfinie PDO. Il représente la connexion à la base de données entreprise.
}