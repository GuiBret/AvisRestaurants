/* jshint esversion:6 */


// Classe contenant la liste des avis entrés par les utilisateurs (sera supprimée à la fermeture de l'app)
class ListeAvis {
    constructor() {
        this.liste_avis = [];
    }
    
    ajouterAvis(nom_util, note, txt_avis, id_resto) { // TODO : vérifier qu'un même utilisateur n'entre pas 2 avis pour le même restaurant
        var avis = {
            "nom_util":nom_util,
            "note":note,
            "txt_avis": txt_avis,
            "id_resto": id_resto,
            "date": new Date().toLocaleDateString("fr-FR", {hour:"numeric", minute:"numeric", second:"numeric"})
        }

        this.liste_avis.push(avis);
        
        return avis;
    }
    
    rechercherAvisDeResto(id_resto) { // Fonction réupérant les avis custom venant de ce restaurant
        var liste_finale = [],
            avis;
        
        this.liste_avis.forEach(function(avis) {
           if(avis.id_resto === id_resto) {
               liste_finale.push(avis);
           } 
        });
        
        return liste_finale;
    }
}