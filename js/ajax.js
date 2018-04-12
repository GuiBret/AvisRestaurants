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
    $.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${position}&key=AIzaSyBZL6hoTD5XKj49lE-88DCaW4WVpenW2d0`, function(data) {
        callback(data);
    });
}

function rechercherGeolocInversee(position, callback) { // Renvoie une ville à partir d'une position
    $.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.lat()},${position.lng()}&key=AIzaSyBZL6hoTD5XKj49lE-88DCaW4WVpenW2d0`, function(data) {
        callback(data);
    });
}

function getJSON(lang, localizer) {
    $.ajax({
        method: "GET",
        url: `/p/AvisRestaurants/trans/${lang}.json`,
        contentType: "application/json",
        beforeSend: function(xhr){
            if (xhr.overrideMimeType) {

                xhr.overrideMimeType("application/json");
            }
        },
    })
        .done(function (data, e) {
            console.log("Recup dico finie")
            localizer.initData(data);

        })
        .fail(function (e) {
            console.log("Erreur")
            console.log(e)
        });

}
