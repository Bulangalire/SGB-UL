<?php

namespace App\Repository;

use App\Entity\CaisseCentrale;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method CaisseCentrale|null find($id, $lockMode = null, $lockVersion = null)
 * @method CaisseCentrale|null findOneBy(array $criteria, array $orderBy = null)
 * @method CaisseCentrale[]    findAll()
 * @method CaisseCentrale[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CaisseCentraleRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, CaisseCentrale::class);
    }

//    /**
//     * @return CaisseCentrale[] Returns an array of CaisseCentrale objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?CaisseCentrale
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
