<?php
namespace Emeric0101\Meowmash\Controller;
use Emeric0101\Meowmash\Service\DbService;

class Vote
{
    private $dbService = null;
    public function __construct(DbService $db) {
        $this->dbService = $db;
    }
    /**
    * index()
    * When GET request, returns all Votes
    */
    public function getAll() {

    }

    /** voteFor()
    * Vote for a cat
    * @param string $id id of the cat
    */
    public function voteFor($id){
        
    }
}
