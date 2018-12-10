<?php

namespace App\Controller;

use App\Entity\Depense;
use App\Entity\Service;
use App\Entity\Personne;
use App\Entity\Etatbesoin;
use App\Entity\Detaildepense;
use App\Entity\Anneebudgetaire;
use App\Entity\LigneBudgetaire;
use App\Entity\Previsionbudget;
use Doctrine\DBAL\Types\FloatType;
use Doctrine\ORM\EntityRepository;
use App\Repository\DepenseRepository;
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
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;



class CaisseController extends AbstractController{

    /**
     * @Route("/sgb/caisse/lesOP", name="servireOp")
     */
    public function getOpPaye(Session $session, Depense $unedepense = null, Request $request, ObjectManager $manager){
        if($this->getUser()===null) {              
            return $this->redirectToRoute('user_login');
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
           $em = $this->getDoctrine()->getManager();

          
                    // Lister les op encours de paiement
           $sqlOPAPaye = $em->createQuery('SELECT dop as lesdetails,
           sum(  dop.montantdetail) as dejaPayer, p, d 
           FROM  App\Entity\Detaildepense dop 
           JOIN dop.depenseId d 
           JOIN dop.lignebudgetdepense p
           WHERE 
              p.anneebudgetprevision=:anneebudgetselect 
           GROUP BY dop.depenseId 
           HAVING (sum( CASE WHEN d.autoriserAB=true AND d.autoriserSG=true AND d.autoriserRecteur=true THEN dop.montantdetail ELSE  d.montantdepense +1 END) < d.montantdepense ) ');
          $sqlOPAPaye->setParameters(array('anneebudgetselect'=> $anneebudgetselect));
          $queryListOpAPaye = $sqlOPAPaye->getResult();
        
        // Lister deja signe mais non payé
          $sqlOPAPayeDeux = $em->createQuery('SELECT d
          FROM  App\Entity\Depense d 
          JOIN d.ligneBudgetaire p
          WHERE
          d.autoriserAB=true 
          AND d.autoriserSG=true 
          AND d.autoriserRecteur=true
          AND p.anneebudgetprevision=:anneebudgetselect
          AND d.id NOT IN( SELECT IDENTITY(dd.depenseId)
                FROM App\Entity\Detaildepense dd ) 
            ');
         $sqlOPAPayeDeux->setParameters(array('anneebudgetselect'=> $anneebudgetselect));
         $queryListOpAPayeDeux = $sqlOPAPayeDeux->getResult();

        // Lister NON signe 
         $sqlOPNonSigne = $em->createQuery('SELECT d
         FROM  App\Entity\Depense d 
         JOIN d.ligneBudgetaire p
         WHERE
         d.autoriserAB=false 
         OR d.autoriserSG=false 
         OR d.autoriserRecteur=false
         AND p.anneebudgetprevision=:anneebudgetselect
         AND d.id NOT IN( SELECT IDENTITY(dd.depenseId)
               FROM App\Entity\Detaildepense dd ) 
           ');
        $sqlOPNonSigne->setParameters(array('anneebudgetselect'=> $anneebudgetselect));
        $queryListOPNonSigne = $sqlOPNonSigne->getResult();

          // $queryRecette = $em->createQuery('SELECT r as mesrecettes, sum(r.montantrecette) as montantrecette, p FROM  App\Entity\Recette r JOIN r.lignebudgetrecette p  WHERE p.service=:userservice AND p.anneebudgetprevision=:anneebudgetselect AND r.createAt BETWEEN :debut AND :fin group by p.lignebudgetprevision');
          // $queryRecette->setParameters(array('userservice' =>$service, 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
          // $queryRecetteGlobale = $queryRecette->getResult();
          return $this->render('sgb/caisse/lesOP.html.twig',[
          'queryListOpAPaye' => $queryListOpAPaye,
          'queryListOpAPayeDeux'=> $queryListOpAPayeDeux,
          'queryListOPNonSigne'=> $queryListOPNonSigne 
          ]);
        }
    
        
    /**
     * @Route("/sgb/caisse/decaisser/{id}", name="add_decaisser")
     * @Route("/sgb/caisse/decaisser/{id}", name="edit_decaisser")
     */
    public function getOpDecaisser( Depense $depense=null, Detaildepense $detaildepense = null, Session $session, Request $request, ObjectManager $manager){
        if($this->getUser()===null) {              
            return $this->redirectToRoute('user_login');
        }
        if(!$detaildepense && $depense){

        $detaildepense= new Detaildepense();
        }


             // Creation de variable de session pour les parametres des requêtes
         
            // Période  
            // Début periode
            if($request->request->get('datedebut')!==null && $request->request->get('datedebut') <> $session->get('datedebutselect') ){
                $session->set('datedebutselect',$request->request->get('datedebut') );
            }
            $datedebut = $session->get('datedebutselect');
    
            // Fin période
            if($request->request->get('datefin')!==null && $request->request->get('datefin') <> $session->get('datefinselect') ){
                $session->set('datefinselect',$request->request->get('datefin') );
            }
            $datefin =  $session->get('datefinselect');
            // Service
            if( $this->isGranted('ROLE_COMPTE_FAC') ){
                $session->set('servicesselectOp', $this->getUser()->getServices()->getId() );
                $service= $session->get('servicesselectOp');
            }else{
            // Service
            if($request->request->get('services')!==null && $request->request->get('services') <> $session->get('servicesselectOp') ){
                $session->set('servicesselectOp',$request->request->get('services') );
            }
            $service= $session->get('servicesselectOp');
            }

        // Année budgetaire
        if($request->request->get('annees')!==null && $request->request->get('annees') <> $session->get('anneeselectOp') ){
            $session->set('anneeselectOp', $request->request->get('annees') );
        }
        $anneebudgetselect= $session->get('anneeselectOp');
        $em = $this->getDoctrine()->getManager();
     
        


            $frmDecaisser = $this->createFormBuilder($detaildepense)
            ->add('lignebudgetdepense', EntityType::class, array(
                'class'  => Previsionbudget::class,
                'placeholder'=>'Choisissez une ligne de depense',
                'query_builder'=>function(EntityRepository $er) use ($depense, $detaildepense){
                    return $er->createQueryBuilder('p')
                                ->leftJoin('p.lignebudgetprevision', 'l')
                                ->where('p.id=:id')
                                ->setParameter('id', $depense==null? $detaildepense->getDepenseId()->getLigneBudgetaire()->getId(): $depense->getLigneBudgetaire()->getId() );
                },
                'choice_label'=>'lignebudgetprevision.intituleLigne',
                ))

            ->add('lignebudgetsource', EntityType::class, array(
                'class'  => Previsionbudget::class,
                'placeholder'=>'Choisissez une ligne de Recette',
                'query_builder'=>function(EntityRepository $er)use ($service, $anneebudgetselect){
                    return $er->createQueryBuilder('p')
                                ->join('p.lignebudgetprevision', 'l')
                                ->where('l.categorieLigne=:thisCat')
                                ->andWhere('p.service=:ceService')
                                ->andWhere('p.anneebudgetprevision=:annee')
                                ->setParameter('thisCat', 'Recette')
                                ->setParameter('ceService', $service)
                                ->setParameter('annee', $anneebudgetselect);
                            },
                'choice_label'=>'lignebudgetprevision.intituleLigne'))
            
            ->add('montantdetail', IntegerType::class, [
                'data'=> $depense==null?  $detaildepense->getMontantdetail() : $depense->getSoldeDepense(),
            ])
            ->add('descriptiondetaildepense')
            ->add('modepayement', ChoiceType::class,[
                'choices'=>[
                    'CHEQUE'=>'CHEQUE',
                    'CASH'=>'CASH',
                    'VIREMENT'=>'VIREMENT'
                ]
            ])
            
            ->getForm();
            
             $sqlDetailSortie = $em->createQuery('SELECT dop as lesdetails, d 
             FROM  App\Entity\Detaildepense dop 
             JOIN dop.depenseId d 
             WHERE dop.depenseId=:depense
            ');
            $sqlDetailSortie->setParameters(array('depense'=> $depense==null? $detaildepense->getDepenseId()->getId(): $depense->getId()));
            $queryListDetailSortie = $sqlDetailSortie->getResult();
 

            $sqlSoldeCompte = $em->createQuery('SELECT r as mesrecettes, 
            sum(r.montantrecette) as montantrecette, 
            p FROM  App\Entity\Recette r 
            JOIN r.lignebudgetrecette p  
            WHERE p.service=:userservice 
            AND p.anneebudgetprevision=:anneebudgetselect 
            group by p.id');
            $sqlSoldeCompte->setParameters(array('userservice' =>$service, 'anneebudgetselect'=> $anneebudgetselect));
           $querySoldeCompte = $sqlSoldeCompte->getResult();

            $detaildepense->setDepenseId($depense);
            $frmDecaisser->handleRequest($request);
            if( $frmDecaisser->isSubmitted() &&  $frmDecaisser->isValid()){
                
                if($detaildepense->getMontantdetail() > $detaildepense->getDepenseId()->getSoldeDepense() ){
                  echo '<h5 style="color:red;">le montant est superière à celui qui reste !!!'. $detaildepense->getDepenseId()->getSoldeDepense() .' $</h5>' ;

                }else if($detaildepense->getMontantdetail()>$detaildepense->getLignebudgetsource()->getLeSolde() ){
                    echo '<h5 style="color:red;">le montant est superière à celui qui reste !!!'. $detaildepense->getLignebudgetsource()->getLeSolde() .' $</h5>' ;
                }else{
                $manager->persist($detaildepense);
                $manager->flush(); 
                return $this->redirectToRoute('add_decaisser',['id'=> $detaildepense->getDepenseId()->getId()]);
            }
            }         
           
          return $this->render('sgb/caisse/decaisser.html.twig',[
            'frmDecaisser'=> $frmDecaisser->createView(),
            'editMode'=> $detaildepense->getId()!==null,
            'queryListDetailSortie'=>$queryListDetailSortie,
            'querySoldeCompte'=>$querySoldeCompte
          ]);
        
    }
    /**
     * @Route("/sgb/analyse/analyseGlobale", name="dataAnalys")
     */
    public function analyse( Depense $depense=null, Detaildepense $detaildepense = null, Session $session, Request $request, ObjectManager $manager){
        // Creation de variable de session pour les parametres des requêtes
        // Année budgetaire
        if($request->request->get('annees')!==null && $request->request->get('annees') <> $session->get('anneeselect') ){
         
            $session->set('anneeselect',$request->request->get('annees') );
           }
          $anneebudgetselect= $session->get('anneeselect');
        
        // Service
        if($request->request->get('services')!==null && $request->request->get('services') <> $session->get('servicesselect') ){
           
            $session->set('servicesselect',$request->request->get('services') );
        }
        $service= $session->get('servicesselect');
        // Période  
        // Début periode
        if($request->request->get('datedebut')!==null && $request->request->get('datedebut') <> $session->get('datedebutselect') ){
            $session->set('datedebutselect',$request->request->get('datedebut') );
        }
        $datedebut = $session->get('datedebutselect');

        // Fin période
        if($request->request->get('datefin')!==null && $request->request->get('datefin') <> $session->get('datefinselect') ){
            $session->set('datefinselect',$request->request->get('datefin') );
        }
        $datefin =  $session->get('datefinselect');



        if($this->dateDifference($datedebut ,  $datefin )){
            return $this->redirectToRoute('selectError', array(
                'error'=>'error'
            ));
        }


        $em = $this->getDoctrine()->getManager();
        if($service=='*'){
            $queryMaCaisse = $em->createQuery('SELECT r as mesrecettes, 
            sum(r.montantrecette) as montantrecette, p 
            FROM  App\Entity\Recette r 
            JOIN r.lignebudgetrecette p
            WHERE p.anneebudgetprevision=:anneebudgetselect 
            AND r.createAt BETWEEN :debut 
            AND :fin group by p.id ORDER BY p.service ASC');
            $queryMaCaisse->setParameters(array('anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));

            $queryDepense= $em->createQuery('SELECT d as mesdep, sum(d.montantdetail) as sommedepense 
            FROM   App\Entity\Detaildepense d 
            JOIN d.lignebudgetdepense p 
            WHERE p.anneebudgetprevision=:anneebudgetselect 
            AND d.createAt BETWEEN :debut 
            AND :fin 
            group by p.id ORDER BY p.service ASC');
            $queryDepense->setParameters(array('anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
    }else{
        $queryDepense= $em->createQuery('SELECT d as mesdep, sum(d.montantdetail) as sommedepense 
            FROM   App\Entity\Detaildepense d 
            JOIN d.lignebudgetdepense p 
            WHERE  p.service=:userservice 
            AND p.anneebudgetprevision=:anneebudgetselect 
            AND d.createAt BETWEEN :debut 
            AND :fin 
            group by p.id ORDER BY p.service ASC');
            $queryDepense->setParameters(array('userservice' =>$service,'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));

        $queryMaCaisse = $em->createQuery('SELECT r as mesrecettes, 
        sum(r.montantrecette) as montantrecette, 
        p FROM  App\Entity\Recette r 
        JOIN r.lignebudgetrecette p  
        WHERE p.service=:userservice 
        AND p.anneebudgetprevision=:anneebudgetselect 
        AND r.createAt BETWEEN :debut 
        AND :fin group by p.id');
        $queryMaCaisse->setParameters(array('userservice' =>$service, 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));

    }
        $maCaisse = $queryMaCaisse->getResult();
        $mesDepense = $queryDepense->getResult();
        return $this->render('sgb/analyse/analyseGlobale.html.twig',[
            'tblCaisse'=>$maCaisse,
            'tblDepense'=>$mesDepense
          ]);
    }


function dateDifference($datedebut ,  $datefin )
{
    $datetime1 = date_create($datedebut);
    $datetime2 = date_create($datefin);
  
    $interval = $datetime2->diff($datetime1);
  
    return $interval->days>366? true : false;
}

    /**
 * @Route("/sgb/analyse/selectAnalyse", name="selectAnalyse")
 * @Route("/sgb/analyse/selectAnalyse/{error}", name="selectError")
 */
public function getAnalyse($error=null){
 
     $em = $this->getDoctrine()->getManager();
     if($error){
        $error="Les nombres des jours pour l'année budgétaire depensent une année";
     }
     $annees = $em->getRepository(Anneebudgetaire::class)->findAll();
     $services = $em->getRepository(Service::class)->findAll();
     //$twig->addExtension(new Twig_Extensions_Extension_Date());
     return $this->render('sgb/analyse/selectAnalyse.html.twig',[
                     'annees'=>$annees,
                     'services'=> $services,
                     'error'=>$error
     ]);
 }
 
    /**
     * @Route("/sgb/caisse/decaisser/{id}/delete", name="delete_caisser")
     */
    public function deleteprevision(Detaildepense $detaildepense = null, Request $request, ObjectManager $manager){
        if(!$detaildepense){ 
          exit;
       } 
                       try{
                           $manager->remove($detaildepense);
                           $manager->flush(); 
                           return $this->redirectToRoute('servireOp');  
                       }catch(\Exception $e){
                        return $this->redirectToRoute('servireOp');  
                       }
   }


}


    