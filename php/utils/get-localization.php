<?php

include('../functions.php');

// Recherche de coordonnées selon une localisation
if(!isset($_GET['position'])) {
    exit();
}

$position = urlencode($_GET['position']);

$maps_apikey = getMapsAPIKey();



$ch_get_localization = curl_init("https://maps.googleapis.com/maps/api/geocode/json?address=${position}&key=${maps_apikey}");
curl_setopt($ch_get_localization, CURLOPT_RETURNTRANSFER, 1);

$localization = json_decode(curl_exec($ch_get_localization), true);

if($localization['status'] == 'ZERO_RESULTS') {
    echo json_encode(array('status' => 'KO'));
} else { // Si on a trouvé quelque chose
    $position = $localization['results'][0]['geometry']['location'];
    echo json_encode(array('status' => 'OK', 'lng' => $position['lng'], 'lat' => $position['lat']));
}


?>
