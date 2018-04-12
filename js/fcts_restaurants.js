/* FONCTIONS RESTAURANTS EXISTANTS */

function ajouterRestaurants(restaurants) { // Fonction callback de getRestaurants() ajoutant les restaurants à liste_restaurants et les affiche dans la liste à l'écran

    let restaurant, // Element de classe Restaurant qui sera créé
        iter_restaurant, // Itérateur dans les réponses
        restaurants_custom = liste_restaurants.getRestaurantsCustom();

    $("#liste_restaurants").html("");

    var bounds = carte.getBounds();

    restaurants.forEach(function(iter_restaurant) {
        coords = {lat:iter_restaurant.latitude, lng:iter_restaurant.longitude};
        if(bounds.contains(coords)) {


            if(liste_restaurants.estNouveauRestaurant(iter_restaurant.nom)) { // Si le restaurant n'est pas encore dans le tableau

                restaurant = new Restaurant(iter_restaurant);
                liste_restaurants.ajouterRestaurant(restaurant);

                if(note_min <= restaurant.info["rating"] && restaurant.info["rating"] <= note_max)
                    restaurant.genFicheRestaurant();



            } else {
                var restaurant_actuel = liste_restaurants.rechercherRestaurant(iter_restaurant.id);

                if(note_min <= restaurant_actuel.info.rating && restaurant_actuel.info.rating <= note_max) {

                    restaurant_actuel.genFicheRestaurant();
                    restaurant_actuel.marqueur.setVisible(true);
                }  else {
                    restaurant_actuel.marqueur.setVisible(false);
                }


            }
        }




    });

    restaurants_custom.forEach(function(iter_restaurant){
            var coords = {lat:iter_restaurant.info.latitude, lng:iter_restaurant.info.longitude};

            if(bounds.contains(coords)) { // On vérifie que le restaurant se trouve dans les coordonnées
                if(note_min <= iter_restaurant.info.rating && iter_restaurant.info.rating <= note_max) {
                    iter_restaurant.genFicheRestaurant();
                    iter_restaurant.marqueur.setVisible(true);
                }  else {
                    iter_restaurant.marqueur.setVisible(false);
                }
            }
        });
    if($("#liste_restaurants > div").length === 0) { // Si aucun restaurant ne matche les critères, on affiche un texte l'expliquant
        $("#liste_restaurants").html("<p>Aucun restaurant n'a été trouvé selon ces critères. <br /> <br /> Veuillez rééssayer sur une autre zone ou en retirant la restriction de notes.");
    }


    if(!launched) {
        launched = true;
        google.maps.event.addListener(carte, "tilesloaded", afficherListeRestaurants); // On utilise l'évènement idle pour charger une seule fois la liste

    }

}

function afficherListeRestaurants(position_util = "") { // Fonction nécessaire pour introduire les arguments de la fonction, position_util : utilisé avec la géoloc, s'il est vide, indique que l'on est au premier affichage (la carte n'étant pas chargée, on ne peut pas avoir ses infos)

    $("#liste_restaurants").scrollTop();

    if(position_util !== "") { // Si position_util est définie, on l'utilise
        coords = {
            latitude:position_util.lat,
            longitude:position_util.lng
        };


    } else {// Sinon, on utilise les données de la carte
        coords = {
            latitude: carte.getCenter().lat(),
            longitude: carte.getCenter().lng()
        };

    }
    getRestaurants(coords, ajouterRestaurants); // Dans ajax.js
}

/* FONCTIONS NOUVEAU RESTAURANT */

// Generates #container_fiche & #fiche_restaurant
function genFicheNouveauRestaurant(event) { // L'image et l'adresse seront recherchées grâce à l'API google maps

    $("body").children(":not(#fiche_restaurant)").fadeTo("slow", 0.1);

    let $fiche = $("<div id='container_fiche'></div>"),
        coords = event.latLng,
        $formulaire = generateRestaurantForm(coords),
        $buttons_div = generateButtonsDiv();



    getNewRestaurantAddress(coords, handleNewRestaurantAddress); // In ajax.js, searches the address of the restaurant we've clicked using Geocode


    $formulaire.append($buttons_div);
    $fiche.append($formulaire);

    $("body").append($fiche);

}

function handleNewRestaurantAddress(response) {
    var adresse = response.results[0].formatted_address;

    $("#adresse_nv_restaurant").val(adresse);
}


/*
    #container_fiche
    ---- #fiche_restaurant
    -------- #titre
    -------- #form_container
    ----------------- #div_img
    ----------------- #info_container
    ---------------------- #div_nom
    ---------------------- #div_adresse
    -------- #boutons

*/
function generateRestaurantForm(coords) {
    let $restaurant_form = $("<div id='fiche_restaurant'></div>"),
        $title = generateTitle(),
        $form_container = generateFormContainer(coords);

    $restaurant_form.append($title, [$form_container]);

    return $restaurant_form;
}

function generateInfoContainer() {
    let $info_container = $("<div class='col-8'></div>"),
        $name_div = generateNameInputDiv(),
        $address_div = generateAddressDiv();

    $info_container.append($name_div, [$address_div]);

    return $info_container;

}

function generateFormContainer(coords) {
    let $container = $("<div class='row'></div>"),
        $image_div = generateImageDiv(coords),
        $info_container = generateInfoContainer(coords);

    $container.append($image_div, [$info_container]);

    return $container;
}

function generateTitle() {
    return $("<h3 class='text-center' id='add-new-restaurant-title'>Ajout d'un nouveau restaurant</h3>");
}

function generateAddressDiv() {
    return $(`<div class="form-group"><label for='adresse_nv_restaurant'>Adresse du restaurant : </label>
                <textarea id='adresse_nv_restaurant' readonly cols='35' rows='3' class='form-control'></textarea>
              </div>`);

}

function generateNameInputDiv() {
    return $(`<div id='div_nom' class='d-flex flex-column form-group'>
                        <label for='nom_nv_restaurant'>Nom du restaurant : </label>
                        <input type='text' id='nom_nv_restaurant' class='form-control'/>
              </div>`);
}

function generateImageDiv(coords) {
    return $(`<div id='div_image' class='col-4'>
                        <img id='image_nv_restaurant' src='http://maps.googleapis.com/maps/api/streetview?size=225x225&location=${coords.lat()},${coords.lng()}&key=AIzaSyBZL6hoTD5XKj49lE-88DCaW4WVpenW2d0' />
              </div>`);
}

function generateButtonsDiv() {
    let $elem_boutons = $("<div class='d-flex flex-row justify-content-around' id='add-restaurant-btns'></div>"),
        $btn_valider = $("<button class='btn'>Valider</button>"),
        $btn_annuler = $("<button class='btn'>Annuler</button>");



    /* Adding listeners */

    $btn_annuler.on("click", function(e) {
        e.preventDefault();
        sortieFicheRestaurant();

    });

    $btn_valider.on("click", function(e) {
        e.preventDefault();

    var adresse = $("#adresse_nv_restaurant").val().split(","),
        codepostal_ville = adresse[1].trim().split(" ");

    let infosRestaurant = {
        "nom":$("#nom_nv_restaurant").val(),
        "id":genererIdRestaurant($("#nom_nv_restaurant").val()),
        "image":$("#image_nv_restaurant").attr("src"),
        "adresse":adresse[0],
        "code_postal":codepostal_ville[0],
        "ville":codepostal_ville[1],
        "rating": 0,
        "review_count":0,
        "latitude":coords.lat(),
        "longitude":coords.lng(),
        custom:true
    },
        restaurant;


    restaurant = new Restaurant(infosRestaurant);

    liste_restaurants.ajouterRestaurant(restaurant);

    restaurant.genFicheRestaurant();


    sortieFicheRestaurant();

    });

    $elem_boutons.append($btn_valider);
    $elem_boutons.append($btn_annuler);

    return $elem_boutons;

}
