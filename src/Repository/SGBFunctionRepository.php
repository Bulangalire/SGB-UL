<?php

namespace App\Repository;

use App\Entity\SGBFunction;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method SGBFunction|null find($id, $lockMode = null, $lockVersion = null)
 * @method SGBFunction|null findOneBy(array $criteria, array $orderBy = null)
 * @method SGBFunction[]    findAll()
 * @method SGBFunction[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SGBFunctionRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, SGBFunction::class);
    }

//    /**
//     * @return SGBFunction[] Returns an array of SGBFunction objects
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
    public function findOneBySomeField($value): ?SGBFunction
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
