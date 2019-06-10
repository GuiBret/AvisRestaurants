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
