<?php

namespace App\Repository;

use App\Entity\Etatbesoin;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Etatbesoin|null find($id, $lockMode = null, $lockVersion = null)
 * @method Etatbesoin|null findOneBy(array $criteria, array $orderBy = null)
 * @method Etatbesoin[]    findAll()
 * @method Etatbesoin[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class EtatbesoinRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Etatbesoin::class);
    }

//    /**
//     * @return Etatbesoin[] Returns an array of Etatbesoin objects
//     */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('e.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Etatbesoin
    {
        return $this->createQueryBuilder('e')
            ->andWhere('e.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
