<?php

namespace App\Repository;

use App\Entity\CompteJournaux;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method CompteJournaux|null find($id, $lockMode = null, $lockVersion = null)
 * @method CompteJournaux|null findOneBy(array $criteria, array $orderBy = null)
 * @method CompteJournaux[]    findAll()
 * @method CompteJournaux[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CompteJournauxRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, CompteJournaux::class);
    }

//    /**
//     * @return CompteJournaux[] Returns an array of CompteJournaux objects
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
    public function findOneBySomeField($value): ?CompteJournaux
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
