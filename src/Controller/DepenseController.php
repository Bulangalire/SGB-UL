<?php

namespace App\Controller;

use App\Entity\Depense;
use App\Entity\Service;
use App\Entity\Personne;
use Doctrine\ORM\EntityRepository;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DepenseController extends AbstractController{

/**
 * @Route("/sgb/depense/addOp", name="depense_Op")
 */
public function frmOp(Depense $unedepense = null, Request $request){
if($this->getUser()===null) {              
    return $this->redirectToRoute('user_login');
   }
if(!$unedepense){
$unedepense= new Depense();
}
$userServ = $this->getUser()->getServices();
$user=$this->getUser();
$frmDepense= $this->createFormBuilder( $unedepense)
            ->add('libele')
            ->add('montantdepense')
            ->add('utilisateurdepense', EntityType::class, array(
                'class'  => Personne::class,

                'query_builder'=>function(EntityRepository $er){
                    return $er->createQueryBuilder('u')
                                ->where('u.services=:id')
                                ->setParameter('id',$this->getUser()->getServices());
                },
                'choice_label'=>'nom'
            ))
            ->add('service', EntityType::class, array(
                'class'  => Service::class,
                'choice_label' => 'designation'
                    ))
            ->add('etatbesoins')
            ->add('beneficiaire')
            ->add('chefDepartement')
            ->add('secGeneralConcerne')
            ->add('abOuDelegue')
            ->add('recteurOuDelegue')

            ->getForm();

            $frmDepense->handleRequest($request);
            if( $frmDepense->isSubmitted() &&  $frmDepense->isValid()){
                        
            } 
                  
         
            return $this->render('sgb/depense/addOp.html.twig',['frmAddOp' =>  $frmDepense->createView()]);
     }
        }