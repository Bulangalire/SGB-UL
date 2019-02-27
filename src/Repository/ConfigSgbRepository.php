<?php

namespace App\Repository;

use App\Entity\ConfigSgb;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method ConfigSgb|null find($id, $lockMode = null, $lockVersion = null)
 * @method ConfigSgb|null findOneBy(array $criteria, array $orderBy = null)
 * @method ConfigSgb[]    findAll()
 * @method ConfigSgb[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ConfigSgbRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, ConfigSgb::class);
    }

//    /**
//     * @return ConfigSgb[] Returns an array of ConfigSgb objects
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
    public function findOneBySomeField($value): ?ConfigSgb
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
