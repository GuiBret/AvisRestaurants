// Exécute un appel AJAX POST
// Prend en paramètres l'URL cible, la donnée à envoyer et la fonction callback appelée en cas de succès


function get(url, callback, callbackArgs) {


    $.ajax({
        "type":"POST",
        "url":ORIGIN + "php/index.php",
        data: {
            "url":url,
            "type":"GET",
            "data-type": callbackArgs[1]
        },
        success : function(data) {
            var data_json = JSON.parse(decodeURIComponent(data));

            callback(data_json, callbackArgs);

        }, fail:function(response) {

        }
    });


}


function rechercherLocalisation(position, callback) { // Fonction recherchant une adresse avec Geocode quand c'est nécessaire (procédure secondaire au début, ajout restaurant custom)
    $.get(`php/utils/get-localization.php?position=${position}`, function(data) {
        callback(data);
    });
}

function rechercherGeolocInversee(position, callback) { // Renvoie une ville à partir d'une position
    $.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat()},${position.lng()}&key=AIzaSyBZL6hoTD5XKj49lE-88DCaW4WVpenW2d0`, function(data) {
        callback(data);
    });
}

function getJSON(lang, localizer) {
    let path = (conf.mode === "LOCAL" | conf.mode === "VPS") ? `trans/${lang}.json` : `/p/AvisRestaurants/trans/${lang}.json`;
    $.ajax({
        method: "GET",
        url: path,
        contentType: "application/json",
        beforeSend: function(xhr){
            if (xhr.overrideMimeType) {

                xhr.overrideMimeType("application/json");
            }
        },
    })
        .done(function (data, e) {
            localizer.initData(data);

        })
        .fail(function (e) {
            console.log("Erreur")
            console.log(e)
        });

}

function getRestaurants(coords, _callback) {
    $.ajax({
        method: "GET",
        url: ORIGIN + "php/get-restaurants.php",
        data: {lat: coords.latitude, lng: coords.longitude, mobile: conf.isMobile},
        dataType: "json"
    }).done((data, e) => {
        _callback(data);
    })
}

function getNewRestaurantAddress(coords, _callback) {
    $.get({
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat()},${coords.lng()}&key=AIzaSyBZL6hoTD5XKj49lE-88DCaW4WVpenW2d0`,
        success: _callback,
        dataType:"json"
    });
}

function getRestaurantReviews(restaurant_id, _callback) {
    $.get({
        url: ORIGIN + "php/get-reviews.php",
        data: {locale: conf.getLocale(), id: restaurant_id, mobile: conf.isMobile},
        success: _callback
    });
}
