/*jshint esversion:6*/
/* globals $, document, console, navigator, google */
$(document).ready(function () {

    "use strict";

    $.fn.genElemNote = function () { // Note entre 1 et 5 étoiles

        $(this).each(function() {
            var val = parseFloat($(this).html());

            if(!isNaN(val)) { // s'il y a un nombre (l'élément n'ayant pas été parsé), on le fait

                var size = Math.max(0, (Math.min(5, val))) * 16; // Vérification du nombre dans la case et calcul de la taille de l'élément
                // Create stars holder
                var $span = $('<span />').width(size);

                $span.css("vertical-align", "super"); // Vertically aligns the part with the yellow start with the one underneath
                // Replace the numerical value with stars
                $(this).html($span);
            }

        });

    };


    $("#filtre").find("span.note").genElemNote();
    $("#filtre").fadeTo(800, 1);

});

const ORIGIN = (window.location.hostname === "localhost") ? "" : "/p/AvisRestaurants/";

var carte,
    liste_restaurants = new ListeRestaurants(),
    avis_custom = new ListeAvis(),
    launched = false, // Booléen disant si on a déjà fait une requête
    note_min = 0,
    note_max = 5, // Notes utilisées pour le filtre et modifiables par la fct appliquerNote (fonction dans utils.js)
    coords,
    markerCluster, // Coordonnées du centre actuel, sera utilisé pour éviter de tout recharger en cas de resize
    conf = new Configuration(),
    localizer = new Localization(conf.lang);


$(".filtre_min").on("click", appliquerNote);
$(".filtre_max").on("click", appliquerNote);






/* FONCTIONS CREATION CARTE */

function initMap() {
	console.log("Init map");

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(creationCarte, gestionErreur, {maximumAge:600000, enableHighAccuracy:true});

    } else {
        gestionErreur();
    }
}

function creationCarte(position) { // Procédure normale (avec géoloc)
    var marqueur,
        position_util = {lat:position.coords.latitude, lng:position.coords.longitude};
    afficherListeRestaurants(position_util);


    carte = new google.maps.Map(document.getElementById("carte"), {
        center: position_util,
        zoom: 15,
        fullScreenControl:true,
        zoomControl:false,
        streetViewControl:false,
        mapTypeControl:false

    });
    markerCluster = new MarkerClusterer(carte, [], {imagePath:"/p/AvisRestaurants/img/cluster/m"});
    appliquerListeners()



}


function gestionErreur(error) { // Callback pointant vers la fct suivante

    $("body").hide();
    console.log(error);
    console.log(localizer)
    var position = prompt(localizer.trans("MESSAGE_GEOLOC"));


    if(position == null) {
        position = "Paris";
    }
    position = position.replace(/ /g, "+"); // On formate l'entrée utilisateur pour passer correctement dans le lien

    rechercherLocalisation(position, rechercherVille);

    //get(`https://maps.googleapis.com/maps/api/geocode/json?address=${position}&key=AIzaSyBZL6hoTD5XKj49lE-88DCaW4WVpenW2d0`, rechercherVille, [], "");

}

function rechercherVille(response) { // Callback de gestionErreur récupérant les données envoyées par Geocode
    if(response.status === "ZERO_RESULTS") {
        gestionErreur();
    } else {
        var resultat = response.results[0].geometry.location;

        carte = new google.maps.Map(document.getElementById("carte"), {
                        center: resultat,
                        zoom: 15,
                        fullScreenControl:true,
                        zoomControl:false,
                        streetViewControl:false,
                        mapTypeControl:false
                    });

        appliquerListeners(); // Fonction permettant de gérer les entrées utilisateurs (mouvement de la carte pour recharger la liste & clic droit pour ajout nv restaurant)
        markerCluster = new MarkerClusterer(carte, [], {imagePath:"/p/AvisRestaurants/img/cluster/m"});

        afficherListeRestaurants();
        $("body").show();

    }

}

function appliquerListeners() {


    $(document).bind("webkitfullscreenchange mozfullscreenchange fullscreenchange", gestionFullScreen);

    google.maps.event.addListener(carte, "rightclick", genFicheNouveauRestaurant); // Event permettant d'ajouter un nouveau restaurant

}
