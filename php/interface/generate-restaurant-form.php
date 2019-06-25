<?php

// Generates the form creating a new custom restaurant (will be stored in session only)
// TODO : handle restaurant creation server-side
include_once('../globals.php');
include_once('../functions.php');


// Checking existence of lat & lng, handled client-side
if(!isset($_GET['lat']) || !isset($_GET['lng'])) {
    echo json_encode(array("source" => "", "error" => 1));
    return;
} else {
    $lat = $_GET['lat'];
    $lng = $_GET['lng'];
}

$maps_apikey = getMapsAPIKey();

// TODO : store the API key in a separate file
$ch_get_address = curl_init("https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${maps_apikey}");
curl_setopt($ch_get_address, CURLOPT_RETURNTRANSFER, 1);

$res_address = json_decode(curl_exec($ch_get_address), true);

$address = $res_address['results'][0]['formatted_address'];

echo $twig->render('new-restaurant-form.html.twig', array(
    'maps_apikey' => $maps_apikey,
    "lat" => $lat,
    "lng" => $lng,
    "address" => $address
));

 ?>
