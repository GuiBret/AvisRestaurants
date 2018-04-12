class Restaurant {
    constructor(info) {
        "use strict";
        this.info = info;
        this.marqueur = new google.maps.Marker({
            position:{lat:this.info.latitude, lng:this.info.longitude},
            map:carte,
            title:this.info.nom
        });


        this.marqueur.info = new google.maps.InfoWindow({
            content:this.genererContenuMarqueur()
        });

        markerCluster.addMarker(this.marqueur);

        google.maps.event.addListener(this.marqueur, "click", function() { // Event ajoutant l'affichage de la bulle d'info
            this.info.open(carte, this);
        });



    }

    genFicheRestaurant() {

        var $elem_liste = $("#liste_restaurants"),
            $div_restaurant = $(`<div class='restaurant' id='div-${this.info.id}'></div>`),
            img_url = `https://maps.googleapis.com/maps/api/streetview?size=100x100&location=${this.info.latitude},${this.info.longitude}&key=AIzaSyBZL6hoTD5XKj49lE-88DCaW4WVpenW2d0`,
            liste_avis_custom = avis_custom.rechercherAvisDeResto(this.info.id),
            note_moyenne;

        note_moyenne = recalculerMoyenne(liste_avis_custom, this.info.rating, this.info.review_count)



        $div_restaurant.html(`<h3 class='text-center titre-restaurant' >${this.info.nom}</h3><div id="coords-photo-restaurant"><img class="img-restaurant" src=${img_url} /><div class='infos_restaurant'><span>${this.info.adresse}</span><br /><span>${this.info.code_postal} ${this.info.ville}</span><br/><span class='note note_liste_avis' id="note-moyenne_${this.info.id}" title='${this.info.rating} étoiles'>${note_moyenne}</span><br /><span href='#' id='btnavis_${this.info.id}' class='ouvrir-avis'>${this.info.review_count + liste_avis_custom.length} ${localizer.trans('AVIS')}</span></div></div>`);

        $elem_liste.append($div_restaurant); // On ajoute le div contenant les infos du restaurant à l'élement à droite de l'écran

        $div_restaurant.find("span.note").genElemNote();
        var $this = this;
        $(`#btnavis_${this.info.id}`).on("click", (e) => { // Création du listener d'affichage des avis
            e.preventDefault();


            if(!$this.info.custom) { // Si on a un restaurant récupéré par Yelp
                let elem_restaurant = $(`#div-${$this.info.id}`);

                let id = this.info.id,
                    callbackArgs;


                if(elem_restaurant.has(".liste_avis").length === 0) { // On vérifie s'il n'y a pas encore de liste d'avis stockée pour ce restaurant
                    callbackArgs = [id, "avis"]

                    $(document.body).addClass("cursor-wait")

                    get(`https://api.yelp.com/v3/businesses/${id}/reviews?locale=${conf.getLocale()}${conf.isMobile ? `&limit=10` : ``}`, creerListeAvis, callbackArgs);

                } else { // Pour éviter d'avoir à la recharger, on l'affiche
                    let review_count = elem_restaurant.find(".liste_avis").find(".avis").length;

                    elem_restaurant.find(".liste_avis").show();
                    elem_restaurant.find(".liste_avis").animate({"height":`${40+(20*review_count)}vh`}, 1000); // Formule : 40 (longueur form) + (20 (longueur avis) * nb_avis)
                }
            } else { // Si on est sur un restaurant custom
                let div_avis = $("<div class='liste_avis'></div>"),
                    liste_avis_custom = avis_custom.rechercherAvisDeResto(id),
                    form_nouvel_avis = genererFormulaireNouvelAvis(id),
                    elem_avis;

                liste_avis_custom.forEach(function(avis) {
                    elem_avis = creerAvis(avis, true);
                    div_avis.append(elem_avis);
                });

                div_avis.append(form_nouvel_avis);
                $div_restaurant.append(div_avis);
                div_avis.find("span.note").genElemNote();


            }


        });// On met un listener pour afficher les avis sur ce restaurant

        $div_restaurant.on("click", function(e) {
            //e.stopPropa

            let parent = $(e.target).closest(".restaurant"),
                restaurant = liste_restaurants.rechercherRestaurant(parent.attr("id").substr(4)),
                position = restaurant.getPosition();

        });

    }

    genererContenuMarqueur() {
        let contenu = "",
            img_url = `https://maps.googleapis.com/maps/api/streetview?size=200x200&location=${this.info.latitude},${this.info.longitude}&key=AIzaSyBZL6hoTD5XKj49lE-88DCaW4WVpenW2d0`;

        contenu += `<h3 class="text-center">${this.info.nom}</h3><div class="d-flex flex-row"><img class="img-restaurant"src=${img_url} ></img><div class="info-resto-fiche"><span>${this.info.adresse}</span><br /><span>${this.info.code_postal} ${this.info.ville}<br /></span><br/><span>Note moyenne : ${this.info.rating} étoiles</span></div></div>`;
        return contenu;
    }

    getPosition() {
        let pos = this.marqueur.getPosition();
        return {lat:pos.lat(), lng:pos.lng()};
    }
}
