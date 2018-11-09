<?php

namespace App\Repository;

use App\Entity\Anneebudgetaire;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Anneebudgetaire|null find($id, $lockMode = null, $lockVersion = null)
 * @method Anneebudgetaire|null findOneBy(array $criteria, array $orderBy = null)
 * @method Anneebudgetaire[]    findAll()
 * @method Anneebudgetaire[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AnneebudgetaireRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Anneebudgetaire::class);
    }

//    /**
//     * @return Anneebudgetaire[] Returns an array of Anneebudgetaire objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('a.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Anneebudgetaire
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
