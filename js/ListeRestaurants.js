/* jshint esversion:6 */
class ListeRestaurants {
    constructor() {
        this.liste_restaurants = [];
    }
    
    ajouterRestaurant(restaurant) {
        this.liste_restaurants.push(restaurant);
    }
    
    estNouveauRestaurant(nom_restaurant) { // Fonction vérifiant si un marqueur est déjà présent sur la carte
        var restaurant;

        for(restaurant of this.liste_restaurants) {
            if(restaurant.marqueur.getTitle() === nom_restaurant) {
                return false;
            }
        }

        return true;
    }
    
    rechercherRestaurant(id_restaurant) {
        for(let restaurant of this.liste_restaurants) {
            if(restaurant.info.id === id_restaurant) {
                return restaurant;
            }
        }
    }
    
    rechargerListe() {
        var restaurant,
            coords;
        for(restaurant of this.liste_restaurants) {
            coords = {lat:restaurant.info.latitude, lng:restaurant.info.longitude};
            
            if(carte.getBounds().contains(coords)) {

                if(note_min <= restaurant.info.rating && restaurant.info.rating <= note_max) {
                        restaurant.genFicheRestaurant();
                        restaurant.marqueur.setVisible(true);
                    }  else {
                        restaurant.marqueur.setVisible(false);
                    }

            }        
        }
    }
    
    getRestaurantsCustom() {
        var restaurant,
            liste = [];
        
        for(restaurant of this.liste_restaurants) {
            if(restaurant.info.custom === true) {
                liste.push(restaurant);
            }
        }
        
        return liste;
    }
    
}