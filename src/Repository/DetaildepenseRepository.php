<?php

namespace App\Repository;

use App\Entity\Detaildepense;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Detaildepense|null find($id, $lockMode = null, $lockVersion = null)
 * @method Detaildepense|null findOneBy(array $criteria, array $orderBy = null)
 * @method Detaildepense[]    findAll()
 * @method Detaildepense[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class DetaildepenseRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Detaildepense::class);
    }

//    /**
//     * @return Detaildepense[] Returns an array of Detaildepense objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('d.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Detaildepense
    {
        return $this->createQueryBuilder('d')
            ->andWhere('d.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
