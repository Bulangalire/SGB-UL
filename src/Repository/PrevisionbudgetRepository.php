<?php

namespace App\Repository;

use App\Entity\Previsionbudget;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Previsionbudget|null find($id, $lockMode = null, $lockVersion = null)
 * @method Previsionbudget|null findOneBy(array $criteria, array $orderBy = null)
 * @method Previsionbudget[]    findAll()
 * @method Previsionbudget[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PrevisionbudgetRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Previsionbudget::class);
    }

//    /**
//     * @return Previsionbudget[] Returns an array of Previsionbudget objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Previsionbudget
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
