<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use App\Entity\LigneBudgetaire;
class LigneBudgetaireFixture extends Fixture
{
    public function load(ObjectManager $manager)
    {
        // $product = new Product();
        // $manager->persist($product);
        for($i = 1; $i<=10; $i++){
            $ligneBudgetaire = new LigneBudgetaire();
            $ligneBudgetaire->setIntituleLigne("Salaire Agent n°$i")
                            ->setCompteLigne(5455+$i)
                            ->setCategorieLigne("Recette")
                            ->setDescription("Une autre ligne budgetaire $i");
            $manager->persist($ligneBudgetaire);
        }


        $manager->flush();
    }
}
