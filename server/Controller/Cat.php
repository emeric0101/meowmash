<?php
namespace Emeric0101\Meowmash\Controller;
use Emeric0101\Meowmash\Entity\Vote as VoteEntity;
class Cat
{
    public function __construct() {
    }
    /**
    * index()
    * When GET request, returns all Cat from server PROXY
    */
    public function getAll() {
        $url = 'https://latelier.co/data/cats.json';
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_USERAGENT, 'meowmash');
        $resultat = curl_exec ($ch);
        curl_close($ch);
        echo $resultat;
        exit();
    }

}
