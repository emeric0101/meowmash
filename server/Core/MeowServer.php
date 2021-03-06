<?php
namespace Emeric0101\Meowmash\Core;
use DI\ContainerBuilder;

class MeowServer {
    private $db = null;
    private $container = null;

    public function __construct() {
        $containerBuilder = new ContainerBuilder;
        $this->container = $containerBuilder->build();
        $this->db = $this->container->get('Emeric0101\Meowmash\Service\DbService');
    }
    public function getEntityManager() {
        return $this->db->getEntityManager();
    }

    public function Run() {
        header('Content-Type: application/json');
        // FIX ME : delete this in production !!!!!
        header('Access-Control-Allow-Origin: *');
        // Getting args
        $controllerName = strval(!empty($_GET['controller']) ? $_GET['controller'] : '');
        $method = strval(!empty($_GET['method']) ? $_GET['method'] : '');

        // Calling Vote controller
        $controller = $this->container->get('Emeric0101\\Meowmash\\Controller\\' . $controllerName);
        if ($controller != null && method_exists($controller, $method)) {
            $json = $controller->$method();
        }
        else {
            $json = ['error' => 'Bad request'];
        }
        if ($json != false) {
            // Avoid json issue with utf8
            echo json_encode(\ForceUTF8\Encoding::toUTF8($json));    
        }

        $this->db->close();
    }
}
