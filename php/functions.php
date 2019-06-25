<?php


function generateGetRestaurantsURL() {
    $url = "https://api.yelp.com/v3/businesses/search?latitude={$_GET["lat"]}&longitude={$_GET["lng"]}&categories=hotels,restaurants";

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


    $restaurants = array_map("traitementRestaurant", $data);


    echo json_encode($restaurants);

}

function traitementRestaurant($restaurantAAjouter) {
    $restaurant = [];
    $restaurant["nom"] = $restaurantAAjouter->name;
    $restaurant["id"] = $restaurantAAjouter->id;
    $restaurant["adresse"] = ($restaurantAAjouter->location->address1 != null) ? $restaurantAAjouter->location->address1 : "Aucune adresse trouvée";
    $restaurant["code_postal"] = $restaurantAAjouter->location->zip_code;
    $restaurant["ville"] = $restaurantAAjouter->location->city;
    $restaurant["latitude"] = $restaurantAAjouter->coordinates->latitude;
    $restaurant["longitude"] = $restaurantAAjouter->coordinates->longitude;
    $restaurant["rating"] = $restaurantAAjouter->rating;
    $restaurant["review_count"] = $restaurantAAjouter->review_count;
    $restaurant["custom"] = false;

    return $restaurant;

}

function getMapsAPIKey() {

    if(isset($_SESSION['maps_APIKEY'])) {
        $apikey = $_SESSION['maps_APIKEY'];
    } else {

        $maps_apikey_file = fopen($_SERVER['DOCUMENT_ROOT'] . 'AvisRestaurants/php/maps-api.key', 'r') or die ("Unable to read file ! ");
        $apikey = fread($maps_apikey_file, filesize('../maps-api.key'));
        fclose($maps_apikey_file);
    }

    return urlencode($apikey);
}


?>
