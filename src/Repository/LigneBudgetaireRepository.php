<?php

namespace App\Repository;

use App\Entity\LigneBudgetaire;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method LigneBudgetaire|null find($id, $lockMode = null, $lockVersion = null)
 * @method LigneBudgetaire|null findOneBy(array $criteria, array $orderBy = null)
 * @method LigneBudgetaire[]    findAll()
 * @method LigneBudgetaire[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class LigneBudgetaireRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, LigneBudgetaire::class);
    }

//    /**
//     * @return LigneBudgetaire[] Returns an array of LigneBudgetaire objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('l.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?LigneBudgetaire
    {
        return $this->createQueryBuilder('l')
            ->andWhere('l.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
