<?php

namespace App\Repository;

use App\Entity\SGBFunctionsRole;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method SGBFunctionsRole|null find($id, $lockMode = null, $lockVersion = null)
 * @method SGBFunctionsRole|null findOneBy(array $criteria, array $orderBy = null)
 * @method SGBFunctionsRole[]    findAll()
 * @method SGBFunctionsRole[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SGBFunctionsRoleRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, SGBFunctionsRole::class);
    }

//    /**
//     * @return SGBFunctionsRole[] Returns an array of SGBFunctionsRole objects
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
    public function findOneBySomeField($value): ?SGBFunctionsRole
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
