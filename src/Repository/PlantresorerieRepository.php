<?php

namespace App\Repository;

use App\Entity\Plantresorerie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Plantresorerie|null find($id, $lockMode = null, $lockVersion = null)
 * @method Plantresorerie|null findOneBy(array $criteria, array $orderBy = null)
 * @method Plantresorerie[]    findAll()
 * @method Plantresorerie[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class PlantresorerieRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Plantresorerie::class);
    }

//    /**
//     * @return Plantresorerie[] Returns an array of Plantresorerie objects
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
    public function findOneBySomeField($value): ?Plantresorerie
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
