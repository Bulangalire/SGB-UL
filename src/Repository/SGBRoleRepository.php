<?php

namespace App\Repository;

use App\Entity\SGBRole;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method SGBRole|null find($id, $lockMode = null, $lockVersion = null)
 * @method SGBRole|null findOneBy(array $criteria, array $orderBy = null)
 * @method SGBRole[]    findAll()
 * @method SGBRole[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SGBRoleRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, SGBRole::class);
    }

//    /**
//     * @return SGBRole[] Returns an array of SGBRole objects
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
    public function findOneBySomeField($value): ?SGBRole
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
