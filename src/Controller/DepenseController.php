<?php

namespace App\Controller;

use App\Entity\Depense;
use App\Entity\Service;
use App\Entity\Personne;
use App\Entity\Etatbesoin;
use App\Entity\Previsionbudget;
use Doctrine\ORM\EntityRepository;
use App\Repository\EtatbesoinRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\HiddenType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;



class DepenseController extends AbstractController{

/**
 * @Route("/sgb/depense/addOp", name="depense_create")
 * @Route("/sgb/depense/addOp/{id}/edit", name="depense_edit")
 */
public function frmOp(Session $session, Depense $unedepense = null, Request $request, ObjectManager $manager){
if($this->getUser()===null) {              
    return $this->redirectToRoute('user_login');
   }
if(!$unedepense){
$unedepense= new Depense();
}

    // Service
    if($request->request->get('services')!=null || $request->request->get('services') <> $session->get('servicesselect') ){
        $session->set('servicesselect',$request->request->get('services') );
       }
    $service= $session->get('servicesselect');

  // Année budgetaire
  if($request->request->get('annees')!=null || $request->request->get('annees') <> $session->get('anneeselect') ){
    $session->set('anneeselect',$request->request->get('annees') );
   }
  $anneebudgetselect= $session->get('anneeselect');
  dump( $anneebudgetselect);
  dump($service);
$userServ = $this->getUser()->getServices();
$user=$this->getUser();
$frmDepense= $this->createFormBuilder( $unedepense)
            ->add('id', HiddenType::class)
            ->add('libele')
            ->add('createAt', DateType::class)
            ->add('montantdepense')
            ->add('utilisateurdepense', EntityType::class, array(
                'class'  => Personne::class,

                'query_builder'=>function(EntityRepository $er){
                    return $er->createQueryBuilder('u')
                                ->where('u.services=:id')
                                ->setParameter('id',$this->getUser()->getServices());
                },
                'choice_label'=>'nom',
                'label'=>'Comptable'
            ))
            ->add('numOp')
            ->add('dateEmission', DateType::class)
            ->add('modePaiement', ChoiceType::class, [
                'choices'=>[
                    'CASH'=>'CASH',
                    'CHEQUE'=>'CHEQUE',
                    'VIREMENT'=>'VIREMENT'
                ],
                'placeholder'=>'Mode de paiement'
            ])
            ->add('beneficiaire', TextType::class, [
                'attr'=>[
                'placeholder'=>'Nom du bénéficiaire',
                ]
            ])
            ->add('chefDepartement', TextType::class, [
                'attr'=>[
                'placeholder'=>'Chef de Service',
                ]
            ])
            ->add('secGeneralConcerne', TextType::class, [
                'attr'=>[
                'placeholder'=>'Secrétaire Gén. Concerné',
                ]
            ])
            ->add('abOuDelegue', TextType::class, [
                'attr'=>[
                'placeholder'=>'AB ou son délégué',
                ]
            ])
            ->add('recteurOuDelegue', TextType::class, [
                'attr'=>[
                'placeholder'=>'Recteur ou son délégué',
                ]
            ])->add('service', EntityType::class, array(
                'class'  => Service::class,
                'choice_label' => 'Designation',
                'label'=>'Service'
                ))
            ->add('ligneBudgetaire', EntityType::class, array(
                'class'=>Previsionbudget::class,
                'query_builder'=>function(EntityRepository $er)use ($anneebudgetselect, $service) {
                    
                    return $er->createQueryBuilder('p') 
                                ->select("p, l")
                                ->join("p.lignebudgetprevision", 'l')
                                ->join("p.anneebudgetprevision", 'a')
                                ->where("p.service=:userservice AND l.categorieLigne = :ladepense AND a.id = :annnebudget")
                                ->setParameter('userservice',$service)
                                ->setParameter('ladepense','Depense')
                                ->setParameter('annnebudget', $anneebudgetselect);
                            },
                                'choice_label'=>'lignebudgetprevision.intituleLigne',
                                )) 

            ->getForm();
dump($frmDepense->getData()->getId());
            $frmDepense->handleRequest($request);
            if( $frmDepense->isSubmitted() &&  $frmDepense->isValid()){

                    $em = $this->getDoctrine()->getManager();
                    if($em->getRepository("\App\Entity\Depense")->findOneBy(
                        array('numOp'=>$unedepense->getNumOp(), 
                        'beneficiaire'=>$unedepense->getBeneficiaire(), 
                        'montantdepense'=>$unedepense->getMontantdepense()) 
                        )&& $unedepense->getId()!==null){
                            echo '<h2 style="color:red;"> Cet ordre de paiement existe déjà </h2>';
                        }else{
                            if($unedepense->getUtilisateurdepense()==null && $user !=null ){
                                $unedepense->setUtilisateurdepense($user);
                             }
                          
                            $manager->persist($unedepense);
                            $manager->flush();
                            return $this->render('sgb/depense/addOp.html.twig',['frmAddOp' =>  $frmDepense->createView()]);
                        }
                }
                        
            
                  
         
            return $this->render('sgb/depense/addOp.html.twig',['frmAddOp' =>  $frmDepense->createView()]);
     }


     


/**
 * @Route("/sgb/depense/etatBesoin", name="etatBesoin_create")
 * @Route("/sgb/depense/etatBesoin/{id}/edit", name="etatBesoin_edit")
 * @Route("/sgb/depense/etatBesoin/{id}/filtre", name="etatBesoin_par_op")
 */
public function frmEtatBesoin(EtatbesoinRepository $repositoryEtatbesoin, Etatbesoin $etatbesoin = null, $id=null, Request $request, ObjectManager $manager){
    if($this->getUser()===null) {              
        return $this->redirectToRoute('user_login');
       }
    if(!$etatbesoin){
    $etatbesoin= new Etatbesoin();
    }
    $userServ = $this->getUser()->getServices();
    $user=$this->getUser();
    $frmEtatbesoin= $this->createFormBuilder( $etatbesoin)
                ->add('designation')
                ->add('quantite')
                ->add('prixunitaire')
                ->add('prixtotal')
                ->add('depense', EntityType::class, array(
                    'class'  => Depense::class,
                    'query_builder'=>function(EntityRepository $er) use ($id){
                        return $er->createQueryBuilder('u')
                                    ->where('u.id=:id')
                                    ->setParameter('id',$id);
                    },
                    'choice_label'=>'numOp',
                    'label'=>'Ordre de paiement'
                ))
               
                ->getForm();
                $em = $this->getDoctrine()->getManager();
                $frmEtatbesoin->handleRequest($request);
                if( $frmEtatbesoin->isSubmitted() &&  $frmEtatbesoin->isValid()){
    
                       
                    if($id!==null){
                        $depense=$em->getRepository("\App\Entity\Depense");
                        $lesEtatDeBesoins = $repositoryEtatbesoin->findByDepense($depense->findById($id)); 
                        
                    }
                        if($em->getRepository("\App\Entity\Etatbesoin")->findOneBy(
                            array('depense'=>$etatbesoin->getDepense(), 
                            'designation'=>$etatbesoin->getDesignation()) 
                            )&& $etatbesoin->getId()!==null){
                                echo '<h2 style="color:red;"> Cet etat de besoin existe déjà </h2>';
                            }else{
                                
                              
                                $manager->persist($etatbesoin);
                                $manager->flush();
                                return $this->render('sgb/depense/etatBesoin.html.twig',['frmEtatbesoin' =>  $frmEtatbesoin->createView(),
                                'lesEtatDeBesoins'=>$lesEtatDeBesoins, 'id'=>$id ]);
                            }
                    }
                            
                   
                    
                      
             
                return $this->render('sgb/depense/etatBesoin.html.twig',['frmEtatbesoin' =>  $frmEtatbesoin->createView(), 'id'=>$id ]);
         }

        }