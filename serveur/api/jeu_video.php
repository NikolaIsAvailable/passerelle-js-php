<?php

include '../models/jeu-video.php';

include '../models/avis.php';

include '../lib/database.php';


if(array_key_exists('id', $_GET) == true)
{
    echo json_encode(lireJeux());
    /*echo json_encode(lireAvis());*/
}
else
{
    echo json_encode(listerJeux());
}
