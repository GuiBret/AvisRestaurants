<?php
// /**
//  * Generates a review form for a specified restaurant
//  *
//  * @var [type]
//  */
include_once('../globals.php');
//
//
echo $twig->render('review-form.html.twig',
    array(
        'review_id' => $_GET['id']
    )

);


 ?>
