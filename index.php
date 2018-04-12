<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Application d'avis de restaurants</title>
        <link rel='stylesheet' href="css/main.css" type='text/css'/>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

    </head>

    <body>


        <div class="container-fluid">
            <h1 class="text-center">Application d'avis de restaurants</h1>
            <div id='interface' class="d-flex flex-row">

                <div id='carte' class="col-12 col-md-7 offset-md-1"></div>
                <div id="right-part" class="hidden-sm-down col-md-3">
                    <p id="afficher-restaurants-fullscreen">Afficher les résultats</p>
                    <div id='filtre' style='display:none;'><span>Afficher les restaurants <span class='note filtre_min'>0</span> et <span class='note filtre_max'>5</span>étoiles</span></div>
                    <div id="panel-restaurants">

                        <div id='liste_restaurants' class="d-flex flex-column"></div>
                    </div>

                </div>
                </div>
            </div>
        </div>


        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>



        <script type="text/javascript" src="js/markerclusterer.js"></script>
        <script type='text/javascript' src='js/Restaurant.js'></script>
        <script type='text/javascript' src='js/ListeAvis.js'></script>
        <script type='text/javascript' src='js/ListeRestaurants.js'></script>

        <script type='text/javascript' src='js/utils.js'></script>

        <script
			  src="https://code.jquery.com/jquery-3.2.1.min.js"
			  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
			  crossorigin="anonymous"></script>

        <script
			  src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
			  integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
			  crossorigin="anonymous"></script>

        <script type='text/javascript' src='js/fcts_avis.js'></script>
        <script type='text/javascript' src='js/add-new-restaurant.js'></script>
        <script type='text/javascript' src='js/fcts_restaurants.js'></script>
        <script type='text/javascript' src="js/ajax.js"></script>
        <script type="text/javascript" src="js/configuration.js"></script>
        <script type="text/javascript" src="js/localization.js"></script>
        <script type="text/javascript" src="js/fullscreenview.js"></script>
        <script type='text/javascript' src="js/main.js"></script>


        <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBZL6hoTD5XKj49lE-88DCaW4WVpenW2d0">
    </script>



    </body>

</html>
