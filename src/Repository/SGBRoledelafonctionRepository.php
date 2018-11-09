<?php

namespace App\Repository;

use App\Entity\SGBRoledelafonction;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method SGBRoledelafonction|null find($id, $lockMode = null, $lockVersion = null)
 * @method SGBRoledelafonction|null findOneBy(array $criteria, array $orderBy = null)
 * @method SGBRoledelafonction[]    findAll()
 * @method SGBRoledelafonction[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SGBRoledelafonctionRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, SGBRoledelafonction::class);
    }

//    /**
//     * @return SGBRoledelafonction[] Returns an array of SGBRoledelafonction objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('s.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?SGBRoledelafonction
    {
        return $this->createQueryBuilder('s')
            ->andWhere('s.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
