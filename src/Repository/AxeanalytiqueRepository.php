<?php

namespace App\Repository;

use App\Entity\Axeanalytique;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Axeanalytique|null find($id, $lockMode = null, $lockVersion = null)
 * @method Axeanalytique|null findOneBy(array $criteria, array $orderBy = null)
 * @method Axeanalytique[]    findAll()
 * @method Axeanalytique[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class AxeanalytiqueRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Axeanalytique::class);
    }

//    /**
//     * @return Axeanalytique[] Returns an array of Axeanalytique objects
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
    public function findOneBySomeField($value): ?Axeanalytique
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
