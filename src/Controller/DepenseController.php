<?php

namespace App\Controller;

use App\Entity\Depense;
use App\Entity\Service;
use App\Entity\Personne;
use App\Entity\Etatbesoin;
use App\Entity\Anneebudgetaire;
use App\Entity\Previsionbudget;
use Doctrine\DBAL\Types\FloatType;
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
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
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
    if($request->request->get('services')!==null && $request->request->get('services') <> $session->get('servicesselectOp') ){
        $session->set('servicesselectOp', $request->request->get('services') );
       }
    $service= $session->get('servicesselectOp');

    // Année budgetaire
    if($request->request->get('annees')!==null && $request->request->get('annees') <> $session->get('anneeselectOp') ){
        $session->set('anneeselectOp', $request->request->get('annees') );
    }
    $anneebudgetselect= $session->get('anneeselectOp');

    $frmDepense= $this->createFormBuilder( $unedepense)
            
            ->add('id', HiddenType::class
                ,['mapped'=> false])
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
                'required'=> false,
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
               
                ],  'required'=> false,
            ])
            ->add('recteurOuDelegue', TextType::class, [
                'attr'=>[
                'placeholder'=>'Recteur ou son délégué',
                'required'=> false,
                ]
            ])

            ->add('autoriserChefService', CheckboxType::class, [
                'attr'=>[
                'label'=>'Autorisation du Chef de Service',
                 ]
            ])
            ->add('autoriserSG', CheckboxType::class, [
                'attr'=>[
                'label'=>'Autorisation du SG',
                 ]
            ])
            ->add('autoriserAB', CheckboxType::class, [
                'attr'=>[
                'label'=>'Autorisation de l\'AB',
                 ]
            ])
            ->add('autoriserRecteur', CheckboxType::class, [
                'attr'=>[
                'label'=>'Autorisation du Recteur',
                 ]
            ])

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
            ->add('service', EntityType::class, array(
                'class'  => Service::class,
                'choice_label' => 'designation',
                'data' => $this->getUser()->getServices(),
            ))
            ->getForm();
           
           $frmDepense->handleRequest($request);
           $em = $this->getDoctrine()->getManager();

           $sqlOpNonSigne="SELECT d as listOp  FROM 
           App\Entity\Depense d
           WHERE d.autoriserChefService=false
           AND d.autoriserSG=false
           AND d.autoriserAB=false
           AND d.autoriserRecteur=false";
           $queryOpNonSigne = $em->createQuery($sqlOpNonSigne);
           $resutatListOpNonSigne = $queryOpNonSigne->getResult();
                dump(  $resutatListOpNonSigne);
            if( $frmDepense->isSubmitted() && $frmDepense->isValid() ){
                    if($em->getRepository("\App\Entity\Depense")->findOneBy(
                        array('numOp'=>$unedepense->getNumOp(), 
                        'beneficiaire'=>$unedepense->getBeneficiaire(), 
                        'montantdepense'=>$unedepense->getMontantdepense(), 
                        'ligneBudgetaire'=>$unedepense->getLigneBudgetaire(),
                        'service'=>$unedepense->getService()
                        ) 
                        )&& $unedepense->getId()==null){
                            echo '<h2 style="color:red;"> Cet ordre de paiement existe déjà </h2>';
                        }else{

                            $sql="SELECT SUM(d.montantdepense) as totalDepense FROM 
                            App\Entity\Depense d WHERE d.ligneBudgetaire=:ligne ";
                            $queryTotalDepense = $em->createQuery($sql);
                            $queryTotalDepense->setParameters(array('ligne'=> $unedepense->getLigneBudgetaire()));
                            $resutatTotalDepense = $queryTotalDepense->getResult();
                            $totaleDepenseParLigne=$resutatTotalDepense[0]['totalDepense'];
                            $SoldeADepense =( $unedepense->getLigneBudgetaire()->getMontantprevision()) - $totaleDepenseParLigne;
                                
                            if($SoldeADepense >= $unedepense->getMontantdepense() ){
                               //$unedepense->setLigneBudgetaire($request->request->get('ligneBudgetaire'));
                               if($unedepense->getLibele()==null){
                                $unedepense->setLibele($unedepense->getLigneBudgetaire()->getLignebudgetprevision()->getIntituleLigne());
                            }
                               $manager->persist($unedepense);
                                $manager->flush();
                                return $this->render('sgb/depense/addOp.html.twig', ['frmAddOp' =>  $frmDepense->createView(),
                                'resutatListOpNonSigne'=>$resutatListOpNonSigne]);
                            }else{
                              echo $errorMessage= '<h5 style="color:red;">Le montant de depense depasse le solde à depenser pour cette ligne. reste est de :'.$SoldeADepense .' </h5>';
                               return $this->render('sgb/depense/addOp.html.twig',['frmAddOp' =>  $frmDepense->createView(),
                               'resutatListOpNonSigne'=>$resutatListOpNonSigne]);
                            }
                        }
                }
            
               
            
         
            return $this->render('sgb/depense/addOp.html.twig',['frmAddOp' =>  $frmDepense->createView(),
            'resutatListOpNonSigne'=>$resutatListOpNonSigne]);
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
                            )&& $etatbesoin->getId()==null){
                                echo '<h2 style="color:red;"> Cet etat de besoin existe déjà </h2>';
                            }else{
                                
                              
                                $manager->persist($etatbesoin);
                                $manager->flush();
                                return $this->render('sgb/depense/etatBesoin.html.twig',
                                ['frmEtatbesoin' =>  $frmEtatbesoin->createView(),
                                'lesEtatDeBesoins'=>$lesEtatDeBesoins, 'id'=>$id ]);
                            }
                    }
                            
                   
                    
                      
             
                return $this->render('sgb/depense/etatBesoin.html.twig',['frmEtatbesoin' =>  $frmEtatbesoin->createView(), 'id'=>$id ]);
         }

         /**
          * @Route("/sgb/depense/opPartiellement", name="op_partiellement")
          */
         public function op_partiellement(Request $request, ObjectManager $manager, Depense $unDepense ){
            $em = $this->getDoctrine()->getManager();
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

  //$queryRecette = $em->createQuery('SELECT r as mesrecettes, sum(r.montantrecette) as montantrecette, p FROM  App\Entity\Recette r JOIN r.lignebudgetrecette p  WHERE p.service=:userservice AND p.anneebudgetprevision=:anneebudgetselect AND r.createAt BETWEEN :debut AND :fin group by p.lignebudgetprevision');
  //$queryRecette->setParameters(array('userservice' =>$service, 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
 // $queryRecetteGlobale = $queryRecette->getResult();



           // $session = new Session();
   
           
            $annees = $em->getRepository(Anneebudgetaire::class)->findAll();
            $services = $em->getRepository(Service::class)->findAll();
            return $this->render('sgb/depense/opPartiellement.html.twig',[
                            'annees'=>$annees,
                            'services'=> $services
            ]);

         }

        }
        