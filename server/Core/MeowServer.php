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
        $controller = $this->container->get('Emeric0101\Meowmash\Controller\Vote');
        if (!empty($_POST)) {
            $controller->post();
        }
        else {
            $controller->index();
        }
        $this->db->close();
    }
}
