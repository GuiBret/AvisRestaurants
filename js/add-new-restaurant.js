function generateRestaurantForm(new_restaurant_coords) {
    let $restaurant_form = $("<div id='fiche_restaurant'></div>"),
        $title = generateTitle(),
        $form_container = generateFormContainer(new_restaurant_coords);

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

function generateFormContainer(new_restaurant_coords) {
    let $container = $("<div class='row'></div>"),
        $image_div = generateImageDiv(new_restaurant_coords),
        $info_container = generateInfoContainer(new_restaurant_coords);

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

function generateImageDiv(new_restaurant_coords) {
    return $(`<div id='div_image' class='col-4'>
                        <img id='image_nv_restaurant' src='http://maps.googleapis.com/maps/api/streetview?size=225x225&location=${new_restaurant_coords.lat()},${new_restaurant_coords.lng()}&key=AIzaSyBZL6hoTD5XKj49lE-88DCaW4WVpenW2d0' />
              </div>`);
}

function generateButtonsDiv(new_restaurant_coords) {
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
    console.log('Clic')

    var adresse = $("#adresse_nv_restaurant").val().split(","),
        codepostal_ville = adresse[1].trim().split(" ");


    console.log(new_restaurant_coords);
    let infosRestaurant = {
        "nom":$("#nom_nv_restaurant").val(),
        "id":genererIdRestaurant($("#nom_nv_restaurant").val()),
        "image":$("#image_nv_restaurant").attr("src"),
        "adresse":adresse[0],
        "code_postal":codepostal_ville[0],
        "ville":codepostal_ville[1],
        "rating": 0,
        "review_count":0,
        "latitude":new_restaurant_coords.lat(),
        "longitude":new_restaurant_coords.lng(),
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
