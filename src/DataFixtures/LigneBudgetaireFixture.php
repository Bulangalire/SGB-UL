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
//require_once 'fzaninotto\faker\src\autoload.php';
class LigneBudgetaireFixture extends Fixture
{
    public function load(ObjectManager $manager)
    {
        //J'Utilise le pacquet Faker pour creer des données de test
        $faker = \Faker\Factory::create('fr_FR');
               
        for($s=1; $s<=4; $s++){
            $service = new Service();
            $service->setDesignation( $faker->sentence())
                    ->setEmailservice($faker->email())
                    ->setDescription($faker->paragraph(2));

            $manager->persist($service);

            for($j = 1; $j<=mt_rand(4, 6); $j++){
                $personne = new Personne();
                $personne->setNom($faker->name())
                         ->setPostnom($faker->name())
                         ->setPrenom($faker->name())
                         ->setUsername($faker->name())
                         ->setPassword($faker->password())
                         ->setSignature($faker->imageUrl($width = 120, $height = 80))
                         ->setServices( $service);
                $manager->persist($personne);
                
                for($dep=1; $dep<=12; $dep++){
                    $depense = new Depense();
                    $depense->setLibele($faker->sentence())
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
                            ->setCategorieLigne(\Faker\Provider\Base::randomElement($array = array ('Recette','Depense')))
                            ->setDescription("Une autre ligne budgetaire $i");
            $manager->persist($ligneBudgetaire);
        }


        $manager->flush();

        for($i=1; $i<=4; $i++){
            $rubrique = new Rubrique();
            $rubrique->setNom("Foctionnement");
            $manager->persist($rubrique);
    
            for($j=1; $j<=10; $j++){
                $sourRubrique = new SousRubrique();
                $sourRubrique->setNom("Recettes sur services académiques");
                $sousRubrique->setRubrique($rubrique);
            }
        }
        $manager->flush();

    }

    
}
