<?php

function generateGetRestaurantsURL() {
    $url = "https://api.yelp.com/v3/businesses/search?latitude={$_GET["lat"]}&longitude={$_GET["lng"]}&categories=hotels, restaurants";

    if($_GET["mobile"]) { // If the user is using a mobile device
        $url .= "&limit=10";
    }

    return $url;

}

function generateGetReviewsURL() {
    $url = "https://api.yelp.com/v3/businesses/{$_GET['id']}/reviews?locale={$_GET['locale']}";

    if($_GET['mobile']) {
        $url .= "&limit=10";
    }

    return $url;
}

function getAPIKey() {
    if(!isset($_SESSION["APIKEY"])) {
        $apikey_file = fopen("apikey.txt", "r") or die("Unable to open file ! ");
        $apikey = fread($apikey_file, filesize("apikey.txt"));
        fclose($apikey_file);
    } else {
        $apikey = $_SESSION["APIKEY"];
    }

    return $apikey;
}

function traitementRestaurants($data) {
    $restaurants = [];

    foreach($data as $element) {

        $restaurant = [];
        //echo serialize($element->location) . "\n";
        $restaurant["nom"] = $element->name;
        $restaurant["id"] = $element->id;
        $restaurant["adresse"] = $element->location->address1;
        $restaurant["code_postal"] = $element->location->zip_code;
        $restaurant["ville"] = $element->location->city;
        $restaurant["latitude"] = $element->coordinates->latitude;
        $restaurant["longitude"] = $element->coordinates->longitude;
        $restaurant["rating"] = $element->rating;
        $restaurant["review_count"] = $element->review_count;
        $restaurant["custom"] = false;


        array_push($restaurants, $restaurant);


    }
    echo json_encode($restaurants);

}



?>
