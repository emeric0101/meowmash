<?php
namespace Emeric0101\Meowmash;
use DI\ContainerBuilder;

require "bootstrap.php";

class UnitTest {
    static $_instance = null;
    public static function GetInstance() {
        if (self::$_instance == null) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    private function __construct() {
        $containerBuilder = new ContainerBuilder;
        $this->container = $containerBuilder->build();
    }

    public function getContainer() {
        return $this->container;
    }
}
