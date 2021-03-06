<?php
header("Content-Type: application/json");
include "functions.php";

session_start();

try {

    $ch = curl_init(generateGetRestaurantsURL());

    $apikey = getAPIKey();




    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Authorization:". "Bearer ". $apikey));

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // Sert à supprimer le "1" en fin de chaîne pour parser le JSON correctement

    $response = json_decode(curl_exec($ch));

    curl_close($ch);

    traitementRestaurants($response->businesses);


}
catch(Exception $e) {
    echo $e;
}



?>
