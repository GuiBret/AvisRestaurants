// Gestion de la vue plein écran

var contenu_panel; // Variable contenant le HTML du panel (stocké ici pendant qu'on est en plein écran, et réappliqué quand on en sort
function gestionFullScreen(e) {

    var isFullScreen = document.fullScreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen;
    if (isFullScreen) { // Entrée en mode full screen

        attributionClassesFullScreen(); // On attribue les classes qui permettront de tout positionner / dimensionner correctement en fullscreen

        let $rightpart = $("#right-part")[0]; // On récupère l'élément qu'on ajoutera comme contrôle, puis on le stocke pour le replacer quand on sortira du fullscreen
        contenu_panel = $rightpart;

        if(conf.isMobile) { // Si l'utilisateur utilise un mobile :
            $rightpart.classList.remove("hidden-sm-down");
            carte.controls[google.maps.ControlPosition.BOTTOM_CENTER].push($rightpart);



            // On affiche le "bouton" afficher résultats & on cache le panel de restaurants (économie dans le chargement de l'animation)
            $("#afficher-restaurants-fullscreen").show();
            //$("#panel-restaurants").hide();
            $("#afficher-restaurants-fullscreen").click(restaurantsOn); // Affichera la liste des restaurants



        } else { // Affichage PC
            attributionClassesFullScreen();
            let $rightpart = $("#right-part")[0];
            contenu_panel = $rightpart;

            rechercherGeolocInversee(carte.getCenter(), panelAffiche);


            $rightpart.classList.remove("hidden-sm-down");
            /* On met le panel en top left pour profiter de toute la hauteur */
            carte.controls[google.maps.ControlPosition.TOP_LEFT].push($rightpart);
        }




    } else { // Sortie du full screen

        $("#afficher-restaurants-fullscreen").hide();
        $("#panel-restaurants").show();

        $("#panel-restaurants").removeClass("panel-fullscreen");
        $("#carte").removeClass("carte-fullscreen");
        $("#interface").removeClass("interface-fullscreen");
        $("#liste_restaurants").removeClass("liste-restaurants-fullscreen");
        $("#right-part").removeClass("right-part-fullscreen");
        $("nav").removeClass("navbar-fullscreen");
        $(".page-header").removeClass("page-header-fullscreen");
        $(".page-title").removeClass("page-title-fullscreen");
        $(".content").removeClass("content-fullscreen");
        $("#avertissement-mobile").removeClass("avertissement-mobile-fullscreen");
        $(".footer").removeClass("footer-fullscreen");
        $("#filtre").removeClass("filtre-fullscreen");

        $("#filtre").show();

        // On ajoute cette classe puisqu'on aura besoin du contenu à partir de maintenant
        $("#right-part").addClass("hidden-sm-down");

        // On retire le contrôle, selon le périphérique on choisira le bon
        if(conf.isMobile) {
            carte.controls[google.maps.ControlPosition.BOTTOM_CENTER].clear();

        } else {
            carte.controls[google.maps.ControlPosition.TOP_LEFT].clear();
        }


        $(contenu_panel).removeAttr("style");
        $("#interface").append(contenu_panel);

    }
}

function attributionClassesFullScreen() {

    /* On ajoute les classes (principalement cacher, parfois annuler margin/padding) pour les élements non concernés par la manip

        - panel-restaurants : relative par rapport au parent (secondary_panel) + full width
        - carte : height à 0 (display none l'effacerait de l'écran)
        - interface : height à 0
        - liste_restaurants : width à 100%
        - navbar : display none + 0 padding
    */
    $("#panel-restaurants").addClass("panel-fullscreen");
    $("#carte").addClass("carte-fullscreen");
    $("#interface").addClass("interface-fullscreen");
    $("#liste_restaurants").addClass("liste-restaurants-fullscreen");
    $("#filtre").addClass("filtre-fullscreen");
    $("#right-part").addClass("right-part-fullscreen");
    $("nav").addClass("navbar-fullscreen");
    $(".page-header").addClass("page-header-fullscreen");
    $(".page-title").addClass("page-title-fullscreen");
    $(".content").addClass("content-fullscreen");
    $("#avertissement-mobile").addClass("avertissement-mobile-fullscreen");
    $(".footer").addClass("footer-fullscreen");




    // On enlève cette classe puisqu'on aura besoin du contenu à partir de maintenant
    $("#right-part").removeClass("hidden-sm-down");
}

function restaurantsOn(e) { // Callback de l'animation affichant la liste des restaurants dans un affichage mobile
    "use strict";

    $("#afficher-restaurants-fullscreen").html("");

    //$("#right-part").toggleClass("classe-animation-fullscreen");
    $("#right-part").bind("onanimationend animationend webkitAnimationEnd", panelAffiche);
    //$("#right-part").bind("ontransitionend transitionend webkitTransitionEnd", rechercheVilleFullScreen);
    $("#right-part").animate({"height": `${$(document.body).height()}px`}, 500, rechercheVilleFullScreen);

}

function rechercheVilleFullScreen(e) { // Fonction callback de rightpart.animate, recherchant la ville au centre de la carte, pour pouvoir l'afficher dans le titre

    rechercherGeolocInversee(carte.getCenter(), panelAffiche); // Fonction dans ajax.js

}

function panelAffiche(data) { // Callback de rechercheVilleFullScreen, affiche la ville et le panneau

    let ville = data.results[0].address_components[3].long_name;
    
    if(conf.isMobile) {
        $("#afficher-restaurants-fullscreen").html(`<img src='/p/AvisRestaurants/img/retour.png' id='btn-retour' /><span>Restaurants à ${ville}</span>`); // Contenu dans le "bouton"
        $("#panel-restaurants").fadeIn(200); // On affiche les restaurants
        $("#btn-retour").click(restaurantsOff); // Callback fermant la liste
    } else {
        $("#afficher-restaurants-fullscreen").html(`<span>Restaurants à ${ville}</span>`); // Contenu dans le "bouton"
        $("#afficher-restaurants-fullscreen").show();

    }




}

function restaurantsOff(e) { // Callback de btn-retour.click, fermant le panneau de la liste des restaurants
    "use strict";
    e.stopPropagation(); // Pour éviter de transmettre l'évenement au parent, sinon lance restaurantsOn

    $("#afficher-restaurants-fullscreen").html("Afficher les résultats");
    $("#panel-restaurants").fadeOut(200); // On efface la liste de la page
    $("#right-part").animate({"height": "50px"}, 500);

}