<?php

namespace App\DataFixtures;

use App\Entity\Card;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CardFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $cards = [
            // TO DO
            ['Engage Jupiter Express for outer solar system travel', 'todo', 'SPACE TRAVEL PARTNERS', 'orange', 'TIS-25', 5, 0, 'JE', 'e8a545'],
            ['Create 90 day plans for all departments in the Mars Office', 'todo', 'LOCAL MARS OFFICE', 'blue', 'TIS-12', 9, 1, null, null],
            ['Engage Saturn\'s Rings Resort as a preferred provider', 'todo', 'SPACE TRAVEL PARTNERS', 'orange', 'TIS-17', 3, 2, 'SR', '7a6ad8'],
            ['Enable Speedy SpaceCraft as the preferred', 'todo', 'SPACE TRAVEL PARTNERS', 'orange', 'TIS-20', 3, 3, null, null],

            // IN PROGRESS
            ['Requesting available flights is now taking > 5 seconds', 'in_progress', 'SEESPACEEZ PLUS', 'green', 'TIS-8', 3, 0, 'RF', '6c8ebf'],
            ['Engage Saturn Shuttle Lines for group tours', 'in_progress', 'SPACE TRAVEL PARTNERS', 'orange', 'TIS-15', 4, 1, 'SS', '6c8ebf'],
            ['Establish a catering vendor to provide meal service', 'in_progress', 'LOCAL MARS OFFICE', 'blue', 'TIS-15', 4, 2, 'CV', 'e8a545'],
            ['Engage Saturn Shuttle Lines for group tours', 'in_progress', 'SPACE TRAVEL PARTNERS', 'orange', 'TIS-16', 3, 3, null, null],

            // CODE REVIEW
            ['Register with the Mars Ministry of Revenue', 'code_review', 'LOCAL MARS OFFICE', 'blue', 'TIS-11', 3, 0, null, null],
            ['Draft network plan for Mars Office', 'code_review', 'LOCAL MARS OFFICE', 'blue', 'TIS-15', 3, 1, 'DN', '6c8ebf'],

            // DONE
            ['Homepage footer uses an inline style - should use a class', 'done', 'LARGE TEAM SUPPORT', 'yellow', 'TIS-68', null, 0, 'HF', '6c8ebf'],
            ['Engage JetShuttle SpaceWays for travel', 'done', 'SPACE TRAVEL PARTNERS', 'orange', 'TIS-23', 5, 1, 'JS', 'e8a545'],
            ['Engage Saturn Shuttle Lines for group tours', 'done', 'SPACE TRAVEL PARTNERS', 'orange', 'TIS-15', null, 2, 'SL', '7a6ad8'],
            ['Establish a catering vendor to provide meal service', 'done', 'LOCAL MARS OFFICE', 'blue', 'TIS-14', 4, 3, null, null],
        ];

        foreach ($cards as [$title, $status, $label, $labelColor, $key, $points, $pos, $avatar, $avatarColor]) {
            $card = new Card();
            $card->setTitle($title);
            $card->setStatus($status);
            $card->setLabel($label);
            $card->setLabelColor($labelColor);
            $card->setCardKey($key);
            $card->setPoints($points);
            $card->setPosition($pos);
            $card->setAvatarInitials($avatar);
            $card->setAvatarColor($avatarColor);
            $manager->persist($card);
        }

        $manager->flush();
    }
}
