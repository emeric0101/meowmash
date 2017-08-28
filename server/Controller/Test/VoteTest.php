<?php
use PHPUnit\Framework\TestCase;
use Emeric0101\Meowmash\UnitTest;
class VoteTest extends TestCase
{
    public function testGetAll()
    {
        $phpUnitInstance = UnitTest::GetInstance();
        $voteController = $phpUnitInstance->getContainer()->get('Emeric0101\Meowmash\Controller\Vote');
        $votes = $voteController->getAll();
        $this->assertEquals(is_array($votes), true);
    }
}
