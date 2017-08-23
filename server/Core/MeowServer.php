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
        // Getting args
        $method = strval(!empty($_GET['method']) ? $_GET['method'] : '');
        $id = strval(!empty($_GET['id']) ? $_GET['id'] : '');

        // Calling Vote controller
        $controller = $this->container->get('Emeric0101\Meowmash\Controller\Vote');
        if (method_exists($controller, $method)) {
            $json = $controller->$method($id);
        }
        else {
            $json = ['error' => 'Bad request'];
        }
        // Avoid json issue with utf8
        echo json_encode(\ForceUTF8\Encoding::toUTF8($json));
        $this->db->close();
    }
}
