<?php

include "functions.php";

session_start();

try {

    $ch = curl_init(generateGetRestaurantsURL());

    if(!isset($_SESSION["APIKEY"])) {
        $apikey_file = fopen("apikey.txt", "r") or die("Unable to open file ! ");
        $apikey = fread($apikey_file, filesize("apikey.txt"));
    } else {
        $apikey = $_SESSION["APIKEY"];
    }

    fclose($apikey_file);

    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    "Authorization:". "Bearer ". $apikey));



    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // Sert à supprimer le "1" en fin de chaîne pour parser le JSON correctement

    $response = curl_exec($ch);


    $response = json_decode(curl_exec($ch));
    curl_close($ch);

    if(isset($_POST["data-type"]) && $_POST["data-type"] == "avis") {
        echo json_encode($response);
    } else {
        traitementRestaurants($response->businesses);
    }

}
catch(Exception $e) {
    echo $e;
}



?>
