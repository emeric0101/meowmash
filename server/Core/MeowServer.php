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
        $method = strval(!empty($_GET['method']) ? $_GET['method'] : '');
        $id = strval(!empty($_GET['id']) ? $_GET['id'] : '');

        $controller = $this->container->get('Emeric0101\Meowmash\Controller\Vote');
        if (method_exists($controller, $method)) {
            $controller->$method($id);
        }
        else {
            echo json_encode(['error' => 'Bad request']);
        }
        $this->db->close();
    }
}
