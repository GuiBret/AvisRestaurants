/* jshint esversion:6 */

function genererIdRestaurant(nom_restaurant) { // Fonction transformant le nom d'un nouveau restaurant en id
    return nom_restaurant.toLowerCase().replace(/ /g, "-");
}



function rechargerListe() { // Recharge la liste de restaurant selon les critères de notes
    let restaurant,
        coords;

    $("#liste_restaurants").html("");

    liste_restaurants.rechargerListe();

    $("span.note").genElemNote();
}

function appliquerNote(e) { // Fonction changeant la note du filtre de notes de restaurants

    var note = Math.round(e.offsetX / 16), // On récupère l'emplacement auquel l'utilisateur a cliqué, puis on divise par 16 (taille de chaque étoile) pour connaître le nombre voulu par l'utilisateur
        elem = $(e.target);

    if(!elem.is($("span.filtre_min")) && !elem.is($("span.filtre_max"))) {
        elem = elem.parent();
    }

    elem.html(String(note)); // On récupère le nombre généré précedemment


    if(elem.hasClass("filtre_min")) {
        note_min = note;
    } else {
        note_max = note;
    }

    $("span.note").genElemNote();

    rechargerListe();

}



function sortieFicheRestaurant() { // Réaffiche la page correctement après l'ajout ou non d'un nouveau restaurant
    $("#container_fiche").remove();
    $("body").children().fadeTo("slow", 1);
}

function noteAvis(e) {
    var note = Math.round(e.offsetX / 16),
        elem = $(e.target);
    if(!elem.is($("span.avis_note"))) {
        elem = elem.parent();
    }

    elem.html(String(note));

    elem.genElemNote();
}

function recalculerMoyenne(liste_avis_custom, moyenne_actuelle, nb_avis_actuel) {
    "use strict";
    var avis_actuel,
        total_avis_custom = 0,
        note_moyenne = moyenne_actuelle,
        note_totale = parseInt(moyenne_actuelle * nb_avis_actuel);
    if(liste_avis_custom.length !== 0) {
            for(avis_actuel of liste_avis_custom) {
                total_avis_custom += avis_actuel.note;
            }
            note_moyenne = (note_totale + total_avis_custom) / (nb_avis_actuel + liste_avis_custom.length);
        }
    return note_moyenne;
}
