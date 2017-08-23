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
        return ['votes' => $votes];
    }
    function changeVote($id, $value) {
        $vote = $this->entityManager->getRepository("Emeric0101\Meowmash\Entity\Vote")->findByCatId($id);
        if (empty($vote)) {
            $vote = new VoteEntity();
            $vote->setCatId($id);
            $vote->setScore($value);
        }
        else {
            $vote = $vote[0];
            $vote->setScore($vote->getScore()+$value);
        }
        $this->entityManager->persist($vote);

    }

    /** voteFor()
    * Vote for a cat
    * @param string $id id of the cat
    */
    public function voteFor(){
        $more = strval($_POST['more']);
        $less = strval($_POST['less']);
        $voteMore = $this->entityManager->getRepository("Emeric0101\Meowmash\Entity\Vote")->findByCatId($more);
        $voteLess = $this->entityManager->getRepository("Emeric0101\Meowmash\Entity\Vote")->findByCatId($less);
        $this->changeVote($voteMore, 1);
        $this->changeVote($voteLess, -1);
        $this->entityManager->flush();
        return ['result' => true];
    }
}
