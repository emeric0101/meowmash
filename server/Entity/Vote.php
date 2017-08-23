<?php

namespace Emeric0101\Meowmash\Entity;
/**
 * User
 *
 * @Table(name="vote")
 * @Entity(repositoryClass="Emeric0101\Meowmash\Repository\VoteRepository")
 */
class Vote implements \JsonSerializable
{
    /**
     * @var int
     *
     * @Column(name="id", type="integer")
     * @Id
     * @GeneratedValue(strategy="AUTO")
     */
    private $id;

    public function getId() {
        return $this->id;
    }

    /**
     * @var string
     *
     * @Column(name="catid", type="string", length=100)
     */
    private $catId;
    public function getCatId() {return $this->catId;}
    public function setCatId($v) {$this->catId = $v;}

    /**
     * @var integer
     *
     * @Column(name="score", type="integer")
     */
    private $score;
    public function setScore($v) {$this->score = $v;}
    public function getScore() {return $this->score;}

    public function jsonSerialize() {
        return [
            'catid' => $this->getCatId(),
            'score' => $this->getScore()
        ];
    }

}
