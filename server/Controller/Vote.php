<?php
namespace Emeric0101\Meowmash\Controller;
use Emeric0101\Meowmash\Service\DbService;
use Emeric0101\Meowmash\Entity\Vote as VoteEntity;
class Vote
{
    private $entityManager = null;
    public function __construct(DbService $db) {
        $this->entityManager = $db->getEntityManager();
    }
    /**
    * index()
    * When GET request, returns all Votes
    */
    public function getAll() {
        $votes = $this->entityManager->getRepository("Emeric0101\Meowmash\Entity\Vote")->findAll();
        return json_encode($votes);
    }

    /** voteFor()
    * Vote for a cat
    * @param string $id id of the cat
    */
    public function voteFor($id){
        $vote = $this->entityManager->getRepository("Emeric0101\Meowmash\Entity\Vote")->findByCatId($id);
        if (empty($vote)) {
            $vote = new VoteEntity();
            $vote->setCatId($id);
            $vote->setScore(1);
        }
        else {
            $vote = $vote[0];
            $vote->setScore($vote->getScore()+1);
        }
        $this->entityManager->persist($vote);
        $this->entityManager->flush();
        return ['result' => true];
    }
}
