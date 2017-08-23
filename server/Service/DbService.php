<?php
namespace Emeric0101\Meowmash\Service;
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;
class DbService  {
    private $entityManager = null;

    public function getEntityManager() {
        return $this->entityManager;
    }

    public function close() {
        $this->entityManager->getConnection()->close();
    }
    // database configuration parameters
    private $conn = array(
        'driver'   => 'pdo_mysql',
        'host'     => DOCTRINE_HOST,
        'user'     => DOCTRINE_USER,
        'password' => DOCTRINE_PASSWORD,
        'dbname'   => DOCTRINE_DB,
    );
    private $config = null;
    private $evm = null;
    public function __construct() {
        // config
        $this->config = Setup::createAnnotationMetadataConfiguration(["Entity"], false);

        // obtaining the entity manager
        $this->entityManager = EntityManager::create($this->conn, $this->config, $this->evm);
    }

}
