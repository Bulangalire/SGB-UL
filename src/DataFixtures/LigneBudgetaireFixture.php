<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Validator\Constraints\DateTime;
use App\Entity\LigneBudgetaire;
use App\Entity\Service;
use App\Entity\Personne;
use App\Entity\Depense;
use App\Entity\recette;

class LigneBudgetaireFixture extends Fixture
{
    public function load(ObjectManager $manager)
    {
        //J'Utilise le pacquet Faker pour creer des données de test
        $faker = Faker\Factory::create('fr_FR');
               
        for($s=1; $s<=4; $s++){
            $service = new Service();
            $service->setDesignation( $faker->sentencece())
                    ->setEmailservice("davidbulangalire$s@gmail.com")
                    ->setDescription("Un petit text descriptif $s");

            $manager->persist($service);

            for($j = 1; $j<=mt_rand(4, 6); $j++){
                $personne = new Personne();
                $personne->setNom("Anget Nom $j")
                         ->setPostnom("AngetPostnom $j")
                         ->setPrenom("Anget prenom $j")
                         ->setLogin("Login $j")
                         ->setPassword("Anget $j")
                         ->setSignature("http://placehold.it/80x30")
                         ->setServices( $service);
                $manager->persist($personne);
                
                for($dep=1; $dep<=12; $dep++){
                    $depense = new Depense();
                    $depense->setLibele(date("F d"))
                            ->setMontantdepense(mt_rand(20, 100))
                            ->setCreateAt(new \DateTime())
                            ->setUtilisateurdepense($personne);
                 $manager->persist($depense);
                }
            } 

                $manager->flush();
        }


        
        
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
