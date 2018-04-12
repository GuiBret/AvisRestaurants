class Localization {
    constructor(lang) {
        this.lang = lang;
        
        getJSON(lang, this); // Recherche le dictionnaire, utilise un callback appelé initData contenant les données

    }

    initData(data) {

        this.dictionary = data

        initMap();
    }


    trans(str_name) { // Fonction recherchant dans le dictionnaire et récupérant la bonne chaîne selon la langue demandée
        let val = "";
        jQuery.each(this.dictionary, function(key, value) {
            if(key == str_name) {
                val = value;
                return false; // On renvoie false pour arrêter la fct callback de la boucle (et donc arrêter la boucle
            }
        });

        return val;
    }


};
