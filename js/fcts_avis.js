function genererFormulaireNouvelAvis(id) {
    "use strict";

    var form_nvavis = $("<form class='form-group form-nv-avis'></form>"),
        $btn_ajoutavis = $(`<button id='btn-valider-avis_${id}' class="btn btn-primary btn-valider-avis" disabled >Ajouter votre avis</button>`),
        $avis_note = $("<span class='note avis_note'>0</span>"),
        $nom_avis = $("<input type='text' placeholder='Entrez votre nom' class='nom-util form-control' />"),
        $txt_avis = $("<textarea placeholder='Entrez votre avis' class='txt-avis form-control' rows='10'></textarea><br />");


    $btn_ajoutavis.on("click", function(e) { // On ajoute l'avis dans la liste d'avis custom et celle des restaurants affichée
        e.preventDefault();
        var nom_avis = $nom_avis.val(),
            txt_avis = $txt_avis.val(),
            note = parseInt($(".avis_note span:first-child").css("width").slice(0, -2)) / 16;

        $nom_avis.val("");
        $txt_avis.val("");

        var avis = avis_custom.ajouterAvis(nom_avis, note, txt_avis, id);

        var elem_avis = creerAvis(avis, true);
        form_nvavis.before(elem_avis); // on ajoute l'avis à la fin de la liste
        elem_avis.find("span.note").genElemNote();


        var restaurant = liste_restaurants.rechercherRestaurant(id);


        var elem_nb_avis = $(`span#btnavis_${id}`),
            elem_note = $(`span#note-moyenne_${id}`),
            nb_avis_actuel = parseInt(elem_nb_avis.html().slice(0, -5)),
            note_moyenne = recalculerMoyenne(avis_custom.rechercherAvisDeResto(restaurant.info.id), restaurant.info.rating, restaurant.info.review_count);

        elem_nb_avis.html(String(nb_avis_actuel + 1)+" "+ localizer.trans("AVIS"));



        elem_note.html(note_moyenne);
        elem_note.genElemNote();
    });

    $txt_avis.on("input", function(e) {
        if($(e.target).val() === "") {
            $btn_ajoutavis.prop("disabled", true);
        } else {
            $btn_ajoutavis.prop("disabled", false);
        }

    })

    form_nvavis.append($avis_note);
    form_nvavis.append($nom_avis);
    form_nvavis.append($txt_avis);



    form_nvavis.append($btn_ajoutavis);

    $avis_note.on("click", noteAvis);


    return form_nvavis;
}

function creerAvis(avis_util, custom) {
    "use strict";

    var avis,
        elem_avis = $("<div></div>");
    if(!custom) { // On reformate l'avis récupéré sur Yelp avant de le traiter
        avis = {
            "nom_util":avis_util.user.name,
            "txt_avis":avis_util.text,
            "note":avis_util.rating,
            "url":avis_util.url,
            "date":new Date(avis_util.time_created).toLocaleDateString("fr-FR", {hour:"numeric", minute:"numeric", second:"numeric"})
        };
    } else {
        avis = avis_util;
    }

    elem_avis.html(`<span class='nom_commentateur'>${avis.nom_util} </span><span class='note'>${avis.note}</span><span class='avis'><span class="contenu-avis">${avis.txt_avis}</span>`+ (!custom ? `<br /><a target='_blank' class="voir-suite-avis" href='${avis.url}'>Voir la suite de l'avis </a>` : "") + `</span><span class='date-avis text-right'>Publié le ${avis.date}</span><br />`);

    return elem_avis;

}

function creerListeAvis(response, args) { // Fct callback de getAvisRestaurants récupérant les avis sur un restaurant donné et les affichant sous la fiche de celui-ci, args : id sélectionné
    'use strict';
    if(response.code === "BUSINESS_UNAVAILABLE") {
    } else {
        var id = args[0],
            elem_selectionne = $(`div#div-${id}`),
            elem_avis,
            div_avis = $("<div class='avis'></div>"),
            i = 0,
            liste_avis_custom = avis_custom.rechercherAvisDeResto(id),
            fermerAvis = $(`<span class='btn-fermer-avis'>${localizer.trans("FERMER_AVIS")}</span>`); // Bouton de fermeture des avis

        div_avis.addClass("liste_avis");
        div_avis.css("height", "0vh");


        response.reviews.forEach(function(avis) {

            avis.id = id;
            elem_avis = creerAvis(avis, false);
            div_avis.append(elem_avis);
        });

        liste_avis_custom.forEach(function(avis) {
            elem_avis = creerAvis(avis, true);
            div_avis.append(elem_avis);
        });


        elem_selectionne.append(div_avis);

        div_avis.append(genererFormulaireNouvelAvis(id));
        div_avis.append(fermerAvis);


        fermerAvis.on("click", function(e) {
            e.stopPropagation();
            $(this).parent().animate({"height":"0vh"}, 1000, function() {
                $(this).css("display", "none");
            }); // On ferme la liste correspondante

        });





        $(".liste_avis").find("span.note").genElemNote();
        $(document.body).removeClass("cursor-wait");

        //div_avis.slideToggle(1000);
        div_avis.animate({"height":`${45+(20*response.reviews.length)}vh`}, 1000); // Formule : 45 (longueur form + marge à la fin) + (20 (longueur avis) * nb_avis)
        //div_avis.toggleClass("anim-avis");

    }
}
