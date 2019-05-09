<?php
    declare(strict_types=1);

    include(dirname(__FILE__). "/../php/functions.php");

    use PHPUnit\Framework\TestCase;

    final class RestaurantTest extends TestCase {


        public function GetMockData() {
            $mock_data = json_decode(file_get_contents("http://localhost/AvisRestaurants/phptests/mock_restaurant_data.json"))->businesses;

            return $mock_data;
        }

        public function testTraitementRestaurant() {
            $mock_data = $this->GetMockData();

            $restaurant = traitementRestaurant($mock_data[0]);

            $this->assertEquals(gettype($restaurant), "array");
            $this->assertEquals($restaurant["nom"], "Mad Dog's Café");
            $this->assertEquals($restaurant["adresse"], null);
            $this->assertEquals($restaurant["code_postal"], "29120");
            $this->assertEquals($restaurant["latitude"], 47.8405990600586);
            $this->assertEquals($restaurant["longitude"], -4.28170013427734);
            $this->assertEquals($restaurant["ville"], "Plomeur");
            $this->assertEquals($restaurant["rating"], 5.0);
            $this->assertEquals($restaurant["review_count"], 2);
            $this->assertEquals($restaurant["custom"], false);
        }

    }

 ?>
 "latitude": ,
 "longitude":
