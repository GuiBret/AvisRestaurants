<?php

if($_POST["type"] == "GET") {
    get();
} else {
    post();
}

function get() {

    $url = $_POST["url"];
    try {

        $ch = curl_init($url);
        $apikey_file = fopen("apikey.txt", "r") or die("Unable to open file ! ");

        $apikey = fread($apikey_file, filesize("apikey.txt"));

        fclose($apikey_file);

        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Authorization:". "Bearer ". $apikey));



        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1); // Sert à supprimer le "1" en fin de chaîne pour parser le JSON correctement
        

        $response = json_decode(curl_exec($ch));
        curl_close($ch);

    }

    catch(Exception $e) {
        echo $e;
    }

    if(isset($_POST["data-type"]) && $_POST["data-type"] == "avis") {
        echo json_encode($response);
    } else {
        traitementRestaurants($response->businesses);
    }






}

/*
function post() { // Sera utilisée uniquement pour récupérer le token
    $url = $_POST["url"];

    $ch = curl_init($url);
    $data = array("grant_type" => "client_credentials", "client_id" => "0gtiOiA8hfBc_GKLH-JA1g", "client_secret" => "XeTS6vYPwNdOlP3OACgopP3o3fDoBkNcbWJtnQKqZsnHC63EMbO4UMkb5aDvuxnp");
    $data_string = http_build_query($data);


    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $response = curl_exec($ch);

    echo $response;
}
*/

function traitementAvis($data) {

}


    ?>
