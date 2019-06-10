<?php
require_once($_SERVER['DOCUMENT_ROOT'] . 'AvisRestaurants/vendor/autoload.php');

$loader = new \Twig\Loader\FilesystemLoader($_SERVER['DOCUMENT_ROOT'] . '/AvisRestaurants/templates');
$twig = new \Twig\Environment($loader);
 ?>
