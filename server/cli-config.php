<?php
use Emeric0101\Meowmash\Core\MeowServer;
require_once "bootstrap.php";

$server = new MeowServer();
return \Doctrine\ORM\Tools\Console\ConsoleRunner::createHelperSet($server->getEntityManager());
