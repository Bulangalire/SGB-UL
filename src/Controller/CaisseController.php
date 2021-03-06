<?php

namespace App\Controller;

use App\Entity\Depense;
use App\Entity\Service;
use App\Entity\Personne;
use App\Entity\Etatbesoin;
use App\Entity\Axeanalytique;
use App\Entity\CompteJournaux;
use App\Entity\CaisseCentrale;
use App\Entity\Anneebudgetaire;
use App\Entity\LigneBudgetaire;
use App\Entity\Previsionbudget;
use App\Entity\Detaildepense;
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
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;



class CaisseController extends AbstractController{

    /**
     * @Route("/sgb/caisse/lesOP", name="servireOp")
     */
    public function getOpPaye(Depense $unedepense = null, Request $request, ObjectManager $manager){
        if($this->getUser()===null) {              
            return $this->redirectToRoute('user_login');
           }
           $session = $request->getSession();
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
              
          if($service=='*'){   
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
      
        }else{
            
            if( $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE') ){
                $sqlOPAPaye = $em->createQuery('SELECT dop as lesdetails,
                sum(  dop.montantdetail) as dejaPayer, p, d 
                FROM  App\Entity\Detaildepense dop 
                JOIN dop.depenseId d 
                JOIN dop.lignebudgetdepense p
                WHERE 
                    p.anneebudgetprevision=:anneebudgetselect
                AND d.isCentralyzed=false    
                AND 
                    d.service=:ceservice
                GROUP BY dop.depenseId 
                HAVING (sum( CASE WHEN d.autoriserChefService=true 
                    THEN dop.montantdetail
                    ELSE  d.montantdepense + 1 END) < d.montantdepense ) ');
                
            }else{
                $sqlOPAPaye = $em->createQuery('SELECT dop as lesdetails,
                sum(  dop.montantdetail) as dejaPayer, p, d 
                FROM  App\Entity\Detaildepense dop 
                JOIN dop.depenseId d 
                JOIN dop.lignebudgetdepense p
                WHERE p.anneebudgetprevision=:anneebudgetselect
                AND d.isCentralyzed=true
                AND d.service=:ceservice
                GROUP BY dop.depenseId 
                HAVING (sum( CASE WHEN d.autoriserAB=true AND d.autoriserSG=true AND d.autoriserRecteur=true THEN dop.montantdetail ELSE  d.montantdepense +1 END) < d.montantdepense ) ');
             
            }
            $sqlOPAPaye->setParameters(array('anneebudgetselect'=> $anneebudgetselect, 'ceservice'=> $service));
            }
            $queryListOpAPaye = $sqlOPAPaye->getResult();
        



        // Lister deja signe mais non payé
        if($service=='*'){   
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
        }else{
            if( $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE') ){
                    $sqlOPAPayeDeux = $em->createQuery('SELECT d
                FROM  App\Entity\Depense d 
                JOIN d.ligneBudgetaire p
                WHERE
                    d.service=:ceservice
                AND d.isCentralyzed=false
                AND d.autoriserChefService=true
                AND p.anneebudgetprevision=:anneebudgetselect
                AND d.id NOT IN( SELECT IDENTITY(dd.depenseId)
                        FROM App\Entity\Detaildepense dd ) 
                    ');
            }else{
                $sqlOPAPayeDeux = $em->createQuery('SELECT d
                FROM  App\Entity\Depense d 
                JOIN d.ligneBudgetaire p
                WHERE
                    d.service=:ceservice
                AND d.autoriserAB=true 
                AND d.autoriserSG=true 
                AND d.autoriserRecteur=true
                AND p.anneebudgetprevision=:anneebudgetselect
                AND d.id NOT IN( SELECT IDENTITY(dd.depenseId)
                    FROM App\Entity\Detaildepense dd ) 
                ');  
        } 
        $sqlOPAPayeDeux->setParameters(array('ceservice'=>$service, 'anneebudgetselect'=> $anneebudgetselect));
        }
        $queryListOpAPayeDeux = $sqlOPAPayeDeux->getResult();






         // Lister NON signe
         if($service=='*'){    
            $sqlOPNonSigne = $em->createQuery('SELECT d
            FROM  App\Entity\Depense d 
            JOIN d.ligneBudgetaire p
            WHERE
            d.autoriserAB=false 
            AND d.autoriserSG=false 
            AND d.autoriserRecteur=false
            AND p.anneebudgetprevision=:anneebudgetselect
            AND d.id NOT IN( SELECT IDENTITY(dd.depenseId)
                FROM App\Entity\Detaildepense dd ) 
            ');
            $sqlOPNonSigne->setParameters(array('anneebudgetselect'=> $anneebudgetselect));
        }else{
            if( $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE') ){
                $sqlOPNonSigne = $em->createQuery('SELECT d
                FROM  App\Entity\Depense d 
                JOIN d.ligneBudgetaire p
                WHERE d.service=:ceservice
                AND p.anneebudgetprevision=:anneebudgetselect
                AND  d.isCentralyzed=false 
                AND d.id NOT IN( SELECT IDENTITY(dd.depenseId)
                    FROM App\Entity\Detaildepense dd ) 
                    HAVING (CASE WHEN 
                 d.autoriserChefService=false 
                THEN FALSE ELSE  TRUE END)=FALSE
                
                ');
            }else{
                $sqlOPNonSigne = $em->createQuery('SELECT d
                FROM  App\Entity\Depense d 
                JOIN d.ligneBudgetaire p
                WHERE d.service=:ceservice
                AND d.isCentralyzed=true 
                AND p.anneebudgetprevision=:anneebudgetselect
                AND d.id NOT IN( SELECT IDENTITY(dd.depenseId)
                    FROM App\Entity\Detaildepense dd ) 
                    HAVING (CASE WHEN 
                d.autoriserAB=false OR
                d.autoriserSG=false OR
                d.autoriserRecteur=false 
                THEN FALSE ELSE  TRUE END)=FALSE
                
                ');

            }
            $sqlOPNonSigne->setParameters(array('ceservice'=>$service, 'anneebudgetselect'=> $anneebudgetselect));
        
            }
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
     * @Route("/sgb/caisse/decaisser/{id}/new", name="add_decaisser")
     * @Route("/sgb/caisse/decaisser/{id}/{error}", name="add_decaisser_error")
     */
    public function getOpDecaisser(Depense $depense, Detaildepense $detaildepense=null, Request $request, ObjectManager $manager, $error=null  ){
        if($this->getUser()===null) {              
            return $this->redirectToRoute('user_login');
        }
        if(!$detaildepense){
         $detaildepense = new Detaildepense();
        }
        $session = $request->getSession();
           
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
                'query_builder'=>function(EntityRepository $er) use ($depense, $detaildepense){
                    return $er->createQueryBuilder('p')
                                ->leftJoin('p.lignebudgetprevision', 'l')
                                ->where('p.id=:id')
                                ->setParameter('id', $depense==null? $detaildepense->getDepenseId()->getLigneBudgetaire()->getId(): $depense->getLigneBudgetaire()->getId() );
                },
                'choice_label'=>'lignebudgetprevision.intituleLigne',
                'label'=>'Depense'
                ))

            ->add('lignebudgetsource', EntityType::class, array(
                'class'  => Previsionbudget::class,
                'placeholder' => 'Choix source',
                'required' => false,
                'empty_data' => null,
                'query_builder'=>function(EntityRepository $er)use ($service, $anneebudgetselect){
                    if( $this->isGranted('ROLE_COMPTE_FAC') ){
                    return $er->createQueryBuilder('p')
                                ->select("p, l")
                                ->join('p.lignebudgetprevision', 'l')
                                ->where('l.categorieLigne=:thisCat')
                                ->andWhere('p.service=:ceService')
                                ->andWhere('p.iscentraliser=false')
                                ->andWhere('p.anneebudgetprevision=:annee')
                                //->having('p.recettes - recettesUtiliseesEnDepenses > 0')
                                ->setParameter('thisCat', 'Recette')
                                ->setParameter('ceService', $service)
                                ->setParameter('annee', $anneebudgetselect)
                                ->orderBy('l.categorieLigne');
                            }else{
                                return $er->createQueryBuilder('p')
                                ->join('p.lignebudgetprevision', 'l')
                                ->where('l.categorieLigne=:thisCat')
                                ->andWhere('p.anneebudgetprevision=:annee')
                                ->andWhere('p.iscentraliser=true')
                                ->setParameter('thisCat', 'Recette')
                                ->setParameter('annee', $anneebudgetselect);
                                }

                        },
                          'choice_label'=> function( Previsionbudget $previsionbudget) {
                           
                                return   $previsionbudget->getLeSolde()<=0?false: $previsionbudget->getLeSolde()."$ /". $previsionbudget->getLignebudgetprevision()->getIntituleLigne()."/(". $previsionbudget->getService()->getDesignation() .")";

                             
                        },
                        'group_by' => function($previsionbudget, $key, $value) {
                            // randomly assign things into 2 groups
                            return $previsionbudget->getLeSolde()<=0 ?false: 'Caisse';
                        },

                'label'=>'Recette')
                )
            
            ->add('montantdetail', NumberType::class, [
                'data'=> $depense==null?  $detaildepense->getMontantdetail() : $depense->getSoldeDepense(),
                'label'=>'Montant'
            ] )
            ->add('descriptiondetaildepense', TextType::class, array(
                'label'=>'Description'
                ))
            ->add('createAt', DateType::class, array(
                'widget' => 'single_text',
                // this is actually the default format for single_text
                'format' => 'yyyy-MM-dd',
                'label'=>'Date'
            ))
            ->add('modepayement', ChoiceType::class,[
                'choices'=>[
                    'CASH'=>'CASH',
                    'CHEQUE'=>'CHEQUE',
                    'VIREMENT'=>'VIREMENT'
                ],
                'label'=>'Mode de payement'
            ])
            ->add('caisseCentrale', EntityType::class, array(
                'class'  => CompteJournaux::class,
                'placeholder' => 'Choix journal',
                'required' => false,
                'empty_data' => null,
                'choice_label' => 'intitule',
                'label'=>'code Journaux' 
    
            ))
            
            ->getForm();
            $querySoldeCompteAutres=null;
            if( $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE') ){
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
                AND p.iscentraliser=false  
                AND p.anneebudgetprevision=:anneebudgetselect 
                group by p.id');
                $sqlSoldeCompte->setParameters(array('userservice' =>$service, 'anneebudgetselect'=> $anneebudgetselect));
                $querySoldeCompte = $sqlSoldeCompte->getResult();

                $sqlCaisseCentrale = $em->createQuery('SELECT caisse as soldeCaisse,  
                sum(caisse.montantrecette) as totalrecette
                FROM  App\Entity\Recette caisse 
                JOIN caisse.codeJournaux j  
                JOIN caisse.lignebudgetrecette p 
                WHERE p.anneebudgetprevision=:anneebudgetselect 
                group by j.id');
                $sqlCaisseCentrale->setParameters(array('anneebudgetselect'=> $anneebudgetselect));
                $resultatCaisseCentrale = $sqlCaisseCentrale->getResult();    
                $isCentralized = $em->createQuery('SELECT ca.isCentraleCaisse  as central 
                                                    FROM  App\Entity\ConfigSgb ca') ;
                                     $resultatIsCentralized  =     $isCentralized->getResult();        
            }else{

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

                $sqlSoldeCompteAutres = $em->createQuery('SELECT r as mesrecettes, 
                sum(r.montantrecette) as montantrecette, 
                p FROM  App\Entity\Recette r 
                JOIN r.lignebudgetrecette p  
                WHERE p.anneebudgetprevision=:anneebudgetselect 
                group by p.id');
                $sqlSoldeCompteAutres->setParameters(array('anneebudgetselect'=> $anneebudgetselect));
                $querySoldeCompteAutres = $sqlSoldeCompteAutres->getResult();
            

                $sqlCaisseCentrale = $em->createQuery('SELECT caisse as soldeCaisse,  
                sum(r.montantrecette) as totalrecette
                FROM  App\Entity\CompteJournaux caisse 
                JOIN caisse.recettes r  
                JOIN r.lignebudgetrecette p 
                WHERE p.anneebudgetprevision=:anneebudgetselect 
                group by caisse.id');
                $sqlCaisseCentrale->setParameters(array('anneebudgetselect'=> $anneebudgetselect));
                $resultatCaisseCentrale = $sqlCaisseCentrale->getResult(); 


 $sqlCaisseCentrale = $em->createQuery('SELECT caisse as soldeCaisse,  
            sum(caisse.montantrecette) as totalrecette
            FROM  App\Entity\Recette caisse 
            JOIN caisse.codeJournaux c  
            JOIN caisse.lignebudgetrecette p 
            WHERE p.anneebudgetprevision=:anneebudgetselect 
            group by c.id');
            $sqlCaisseCentrale->setParameters(array('anneebudgetselect'=> $anneebudgetselect));
            $resultatCaisseCentrale = $sqlCaisseCentrale->getResult();    
            $isCentralized = $em->createQuery('SELECT ca.isCentraleCaisse  as central 
                                                FROM  App\Entity\ConfigSgb ca') ;
                                 $resultatIsCentralized  =     $isCentralized->getResult(); 


                $isCentralized = $em->createQuery('SELECT ca.isCentraleCaisse  as central 
                FROM  App\Entity\ConfigSgb ca') ;


       $resultatIsCentralized  =   $isCentralized->getResult();        
            }
            $frmDecaisser->handleRequest($request);
          
            if($detaildepense->getDepenseId()==null){
                $detaildepense->setDepenseId($depense);
            }

            if( $frmDecaisser->isSubmitted() &&  $frmDecaisser->isValid()){
                
                if($detaildepense->getId()==null){
                    if($detaildepense->getMontantdetail() >  $detaildepense->getDepenseId()->getSoldeDepense() ){
                        return $this->redirectToRoute('add_decaisser_error',['id'=> $detaildepense->getDepenseId()->getId(),
                        'error'=>"le montant est superière à celui de l'OP !!!". $detaildepense->getDepenseId()->getSoldeDepense().'$' ]);
                    }
                if($detaildepense->getLignebudgetsource()!==null){
                    if($detaildepense->getMontantdetail()>$detaildepense->getLignebudgetsource()->getLeSolde() ){
                        return $this->redirectToRoute('add_decaisser_error',['id'=> $detaildepense->getDepenseId()->getId(),
                        'error'=>'le montant est superière à celui qui reste en caisse!!!'. $detaildepense->getLignebudgetsource()->getLeSolde() .'$' ]);
    
                    }
                }
                }elseif($detaildepense->getLignebudgetsource()!==null){

                if($detaildepense->getMontantdetail()>$detaildepense->getLignebudgetsource()->getLeSolde() ){
                        return $this->redirectToRoute('add_decaisser_error',['id'=> $detaildepense->getDepenseId()->getId(),
                        'error'=>'le montant est superière à celui qui reste en caisse!!!'. $detaildepense->getLignebudgetsource()->getLeSolde() .'$' ]);
    
                    }
                }
                if($detaildepense->getCaisseCentrale()===null && $detaildepense->getLignebudgetsource()===null ){
                    return $this->redirectToRoute('add_decaisser_error',['id'=> $detaildepense->getDepenseId()->getId(),
                    'error'=>'Veuillez indiquez la source svp !!!']);

                }
                
                if($detaildepense->getDepenseId()==null){
                    $detaildepense->setDepenseId($em->getRepository(Detaildepense::class)->find($detaildepense)->getDepenseId()->getId());
                }
                $manager->persist($detaildepense);
                $manager->flush(); 
                if($detaildepense->getCaisseCentrale()!==null){
                    $caisseCentrale = new CaisseCentrale();
                    $caisseCentrale->setDateSortie($detaildepense->getCreateAt());
                    $caisseCentrale->setMontantSortie($detaildepense->getMontantdetail());
                    $caisseCentrale->setDepense($detaildepense);
                    $manager->persist($caisseCentrale);
                    $manager->flush();
                }
                return $this->redirectToRoute('add_decaisser',['id'=> $detaildepense->getDepenseId()->getId()
                ]);
            
            }         
           
          return $this->render('sgb/caisse/decaisser.html.twig',[
            'frmDecaisser'=> $frmDecaisser->createView(),
            'editMode'=> $detaildepense->getId()!==null,
            'queryListDetailSortie'=>$queryListDetailSortie,
            'querySoldeCompte'=>$querySoldeCompte,
            'querySoldeCompteAutres' =>$querySoldeCompteAutres,
            'resultatCaisseCentrale'=>$resultatCaisseCentrale,
            'resultatIsCentralized'=>$resultatIsCentralized,
            'error'=>$error
          ]);
        
    }

/**
     * @Route("/sgb/caisse/decaisser/{id}/edit/", name="edit_decaisser")
     * @Route("/sgb/caisse/decaisser/{id}/{error}", name="edit_decaisser_error")
     */
    public function editDecaisser( Detaildepense $detaildepense, Request $request, ObjectManager $manager, $error=null){
        if($this->getUser()===null) {              
            return $this->redirectToRoute('user_login');
        }

        if(!$detaildepense){

            $detaildepense= new Detaildepense();
            }
            $session = $request->getSession();
           
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
                'query_builder'=>function(EntityRepository $er) use ($detaildepense){
                    return $er->createQueryBuilder('p')
                                ->leftJoin('p.lignebudgetprevision', 'l')
                                ->where('p.id=:id')
                                ->setParameter('id',$detaildepense->getDepenseId()->getLigneBudgetaire()->getId() );
                },
                'choice_label'=>'lignebudgetprevision.intituleLigne',
                'label'=>'Depense'
                ))

            ->add('lignebudgetsource', EntityType::class, array(
                'class'  => Previsionbudget::class,
                'placeholder' => 'Choix source',
                'required' => false,
                'empty_data' => null,
                'query_builder'=>function(EntityRepository $er)use ($service, $anneebudgetselect){
                    if( $this->isGranted('ROLE_COMPTE_FAC') ){
                    return $er->createQueryBuilder('p')
                                ->select("p, l")
                                ->join('p.lignebudgetprevision', 'l')
                                ->where('l.categorieLigne=:thisCat')
                                ->andWhere('p.service=:ceService')
                                ->andWhere('p.iscentraliser=false')
                                ->andWhere('p.anneebudgetprevision=:annee')
                                //->having('p.recettes - recettesUtiliseesEnDepenses > 0')
                                ->setParameter('thisCat', 'Recette')
                                ->setParameter('ceService', $service)
                                ->setParameter('annee', $anneebudgetselect)
                                ->orderBy('l.categorieLigne');
                            }else{
                                return $er->createQueryBuilder('p')
                                ->join('p.lignebudgetprevision', 'l')
                                ->where('l.categorieLigne=:thisCat')
                                ->andWhere('p.anneebudgetprevision=:annee')
                                ->andWhere('p.iscentraliser=true')
                                ->setParameter('thisCat', 'Recette')
                                ->setParameter('annee', $anneebudgetselect);
                                }

                        },
                          'choice_label'=> function( Previsionbudget $previsionbudget) {
                           
                                return    $previsionbudget->getLeSolde()<=0?false: $previsionbudget->getLeSolde()."$ /". $previsionbudget->getLignebudgetprevision()->getIntituleLigne()."/(". $previsionbudget->getService()->getDesignation() .")";

                             
                        },
                        'group_by' => function($previsionbudget, $key, $value) {
                            // randomly assign things into 2 groups
                            return $previsionbudget->getLeSolde()<=0 ?false: 'Caisse';
                        },

                'label'=>'Recette')
                )
            
            ->add('montantdetail', NumberType::class, [
                'data'=>  $detaildepense->getMontantdetail(),
                'label'=>'Montant'
            ] )
            ->add('descriptiondetaildepense', TextType::class, array(
                'label'=>'Description'
                ))
            ->add('createAt', DateType::class, array(
                'widget' => 'single_text',
                // this is actually the default format for single_text
                'format' => 'yyyy-MM-dd',
                'label'=>'Date'
            ))
            ->add('modepayement', ChoiceType::class,[
                'choices'=>[
                    'CASH'=>'CASH',
                    'CHEQUE'=>'CHEQUE',
                    'VIREMENT'=>'VIREMENT'
                ],
                'label'=>'Mode de payement'
            ])
            ->add('caisseCentrale', EntityType::class, array(
                'class'  => CompteJournaux::class,
                'placeholder' => 'Choix journal',
                'required' => false,
                'empty_data' => null,
                'choice_label' => 'intitule',
                'label'=>'code Journaux' 
    
            ))
            
            ->getForm();
            $querySoldeCompteAutres=null;
            if( $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE') ){
                $sqlDetailSortie = $em->createQuery('SELECT dop as lesdetails, d 
                FROM  App\Entity\Detaildepense dop 
                JOIN dop.depenseId d 
                WHERE dop.depenseId=:depense
                ');
                $sqlDetailSortie->setParameters(array('depense'=> $detaildepense->getDepenseId()->getId()));
                $queryListDetailSortie = $sqlDetailSortie->getResult();
    

                $sqlSoldeCompte = $em->createQuery('SELECT r as mesrecettes, 
                sum(r.montantrecette) as montantrecette, 
                p FROM  App\Entity\Recette r 
                JOIN r.lignebudgetrecette p  
                WHERE p.service=:userservice
                AND p.iscentraliser=false  
                AND p.anneebudgetprevision=:anneebudgetselect 
                group by p.id');
                $sqlSoldeCompte->setParameters(array('userservice' =>$service, 'anneebudgetselect'=> $anneebudgetselect));
                $querySoldeCompte = $sqlSoldeCompte->getResult();

                $sqlCaisseCentrale = $em->createQuery('SELECT caisse as soldeCaisse,  
                sum(r.montantrecette) as totalrecette
                FROM  App\Entity\CompteJournaux caisse 
                JOIN caisse.recettes r  
                JOIN r.lignebudgetrecette p 
                WHERE p.anneebudgetprevision=:anneebudgetselect 
                group by caisse.id');
                $sqlCaisseCentrale->setParameters(array('anneebudgetselect'=> $anneebudgetselect));
                $resultatCaisseCentrale = $sqlCaisseCentrale->getResult();
                $isCentralized = $em->createQuery('SELECT ca.isCentraleCaisse  as central 
                FROM  App\Entity\ConfigSgb ca') ;
        $resultatIsCentralized  =  $isCentralized->getResult();         

            }else{

                $sqlDetailSortie = $em->createQuery('SELECT dop as lesdetails, d 
                FROM  App\Entity\Detaildepense dop 
                JOIN dop.depenseId d 
                WHERE dop.depenseId=:depense
                ');
                $sqlDetailSortie->setParameters(array('depense'=> $detaildepense->getDepenseId()->getId() ));
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

                $sqlSoldeCompteAutres = $em->createQuery('SELECT r as mesrecettes, 
                sum(r.montantrecette) as montantrecette, 
                p FROM  App\Entity\Recette r 
                JOIN r.lignebudgetrecette p  
                WHERE p.anneebudgetprevision=:anneebudgetselect 
                group by p.id');
                $sqlSoldeCompteAutres->setParameters(array('anneebudgetselect'=> $anneebudgetselect));
                $querySoldeCompteAutres = $sqlSoldeCompteAutres->getResult();
            
                $sqlCaisseCentrale = $em->createQuery('SELECT caisse as soldeCaisse,  
                sum(r.montantrecette) as totalrecette 
                FROM  App\Entity\CompteJournaux caisse 
                JOIN caisse.recettes r  
                JOIN r.lignebudgetrecette p 
                WHERE p.anneebudgetprevision=:anneebudgetselect 
                group by caisse.id');
                $sqlCaisseCentrale->setParameters(array('anneebudgetselect'=> $anneebudgetselect));
                $resultatCaisseCentrale = $sqlCaisseCentrale->getResult();    
                
                $isCentralized = $em->createQuery('SELECT ca.isCentraleCaisse  as central 
                                                    FROM  App\Entity\ConfigSgb ca') ;
                                            $resultatIsCentralized  =  $isCentralized->getResult();            
            }
       
           
            $frmDecaisser->handleRequest($request);
          
            if($detaildepense->getDepenseId()==null){
                $detaildepense->setDepenseId($depense);
            }

            if( $frmDecaisser->isSubmitted() &&  $frmDecaisser->isValid()){
            
                if($detaildepense->getCaisseCentrale()===null && $detaildepense->getLignebudgetsource()===null){
                    return $this->redirectToRoute('edit_decaisser_error',['id'=> $detaildepense->getDepenseId()->getId(),
                        'error'=>'Veuillez indiquez la source svp !!!']);
                }else{
                        if($detaildepense->getId()===null){
                            if($detaildepense->getMontantdetail() >  $detaildepense->getDepenseId()->getSoldeDepense() ){
                                return $this->redirectToRoute('edit_decaisser_error',['id'=> $detaildepense->getDepenseId()->getId(),
                                'error'=>"le montant est superière à celui de l'OP !!!". $detaildepense->getDepenseId()->getSoldeDepense().'$' ]);
                            }
                            //Test si la caisse par ligne est superieure à la somme saisie
                            if($detaildepense->getCaisseCentrale()===null && $detaildepense->getLignebudgetsource()!==null){
                                if($detaildepense->getMontantdetail()>$detaildepense->getLignebudgetsource()->getLeSolde() ){
                                    return $this->redirectToRoute('edit_decaisser_error',['id'=> $detaildepense->getDepenseId()->getId(),
                                    'error'=>'le montant est superière à celui qui reste en caisse!!!'. $detaildepense->getLignebudgetsource()->getLeSolde() .'$' ]);
                                }
                            }
                            //Test si la caisse centrale est superieure à la somme saisie
                            if($detaildepense->getCaisseCentrale()!==null && $detaildepense->getLignebudgetsource()===null){
                                if($detaildepense->getMontantdetail()>$detaildepense->getLignebudgetsource()->getLeSolde() ){
                                    return $this->redirectToRoute('edit_decaisser_error',['id'=> $detaildepense->getDepenseId()->getId(),
                                    'error'=>'le montant est superière à celui qui reste en caisse!!!'. $detaildepense->getLignebudgetsource()->getLeSolde() .'$' ]);
                                }
                            }
                        }elseif($detaildepense->getCaisseCentrale()===null &&  $detaildepense->getMontantdetail()>$detaildepense->getLignebudgetsource()->getLeSolde() ){
                                return $this->redirectToRoute('edit_decaisser_error',['id'=> $detaildepense->getDepenseId()->getId(),
                                'error'=>'le montant est superière à celui qui reste en caisse!!!'. $detaildepense->getLignebudgetsource()->getLeSolde() .'$' ]);
                        }
                    }
                        
                if($detaildepense->getDepenseId()===null){
                    $detaildepense->setDepenseId($em->getRepository(Detaildepense::class)->find($detaildepense)->getDepenseId()->getId());
                }
                $manager->persist($detaildepense);
                $manager->flush(); 
                if($detaildepense->getCaisseCentrale()!==null){
                    
                    $caisseCentrale=$em->getRepository(CaisseCentrale::class)->findOneBy(['depense'=>$detaildepense->getId()]);
                    if($caisseCentrale==null){
                        $caisseCentrale = new CaisseCentrale();
                    }
                    $caisseCentrale->setDateSortie($detaildepense->getCreateAt());
                    $caisseCentrale->setMontantSortie($detaildepense->getMontantdetail());
                    $caisseCentrale->setDepense($detaildepense);
                    $manager->persist($caisseCentrale);
                    $manager->flush();
                }
                return $this->redirectToRoute('edit_decaisser',['id'=> $detaildepense->getId()
                ]);
            
            }         
           
          return $this->render('sgb/caisse/decaisser.html.twig',[
            'frmDecaisser'=> $frmDecaisser->createView(),
            'editMode'=> $detaildepense->getId()!==null,
            'queryListDetailSortie'=>$queryListDetailSortie,
            'querySoldeCompte'=>$querySoldeCompte,
            'querySoldeCompteAutres' =>$querySoldeCompteAutres,
            'resultatCaisseCentrale'=>$resultatCaisseCentrale,
            'resultatIsCentralized'=>$resultatIsCentralized,
            'error'=>$error
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
        
         // Service limité au rôle de l'utilisateur
         if( $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE') )
         {
             $session->set('servicesselect', $this->getUser()->getServices()->getId() );
             $service= $session->get('servicesselect');
         }else{
             // Service accès compltet
             if($request->request->get('services')!==null && $request->request->get('services') <> $session->get('servicesselect') )
             {
                 $session->set('servicesselect',$request->request->get('services') );
             }
             $service= $session->get('servicesselect');
         }
        
        // Axe
         if($request->request->get('axe')!==null && $request->request->get('axe') <> $session->get('axeselect') ){
           
            $session->set('axeselect',$request->request->get('axe') );
        }
        $axe= $session->get('axeselect');
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
            $error="Les nombres des jours pour l'année budgétaire depesent une année";
            return $this->redirectToRoute('selectError', array(
                'error'=> $error
            ));
        }

try{


        $em = $this->getDoctrine()->getManager();
        
        if($service!==""){
        if($service=='*'){
            $queryMaCaisse = $em->createQuery('SELECT r as mesrecettes, 
            sum(r.montantrecette) as montantrecette, p 
            FROM  App\Entity\Recette r 
            JOIN r.lignebudgetrecette p
            JOIN  p.lignebudgetprevision l
            WHERE p.anneebudgetprevision=:anneebudgetselect 
            AND r.createAt >=:debut  
            AND r.createAt <=:fin group by p.id ORDER BY p.service ASC, l.intituleLigne ASC');
            $queryMaCaisse->setParameters(array('anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
           
            $queryDepense= $em->createQuery('SELECT d as mesdep, sum(d.montantdetail) as sommedepense 
            FROM   App\Entity\Detaildepense d 
            JOIN d.lignebudgetdepense p 
            JOIN  p.lignebudgetprevision l
            WHERE p.anneebudgetprevision=:anneebudgetselect 
            AND d.createAt >=:debut 
            AND d.createAt <=:fin 
            group by p.id ORDER BY p.service ASC, l.intituleLigne ASC');
            $queryDepense->setParameters(array('anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
    }else{
        $queryDepense= $em->createQuery('SELECT d as mesdep, sum(d.montantdetail) as sommedepense 
            FROM   App\Entity\Detaildepense d 
            JOIN d.lignebudgetdepense p 
            JOIN  p.lignebudgetprevision l
            WHERE  p.service=:userservice 
            AND p.anneebudgetprevision=:anneebudgetselect 
            AND d.createAt >=:debut  
            AND d.createAt <=:fin
            group by p.id ORDER BY l.intituleLigne ASC');
            $queryDepense->setParameters(array('userservice' =>$service,'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));

            $queryMaCaisse = $em->createQuery('SELECT r as mesrecettes, 
            sum(r.montantrecette) as montantrecette, 
            p FROM  App\Entity\Recette r 
            JOIN r.lignebudgetrecette p  
            JOIN  p.lignebudgetprevision l
            WHERE p.service=:userservice 
            AND p.anneebudgetprevision=:anneebudgetselect 
            AND r.createAt >=:debut 
            AND r.createAt <=:fin group by p.id ORDER BY l.intituleLigne ASC');
            $queryMaCaisse->setParameters(array('userservice' =>$service, 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));

    }
}elseif($axe!==""){
    if($axe==='*'){
        $queryMaCaisse = $em->createQuery('SELECT r as mesrecettes, 
        sum(r.montantrecette) as montantrecette, p 
        FROM  App\Entity\Recette r 
        JOIN r.lignebudgetrecette p
        JOIN  p.lignebudgetprevision l
        WHERE p.anneebudgetprevision=:anneebudgetselect 
        AND r.createAt >=:debut  
        AND r.createAt <=:fin group by p.id ORDER BY p.service ASC, l.intituleLigne ASC');
        $queryMaCaisse->setParameters(array('anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));

        $queryDepense= $em->createQuery('SELECT d as mesdep, 
        sum(d.montantdetail) as sommedepense 
        FROM   App\Entity\Detaildepense d 
        JOIN d.lignebudgetdepense p
        JOIN  p.lignebudgetprevision l 
        WHERE p.anneebudgetprevision=:anneebudgetselect 
        AND d.createAt >=:debut 
        AND d.createAt <=:fin 
        group by p.id ORDER BY p.service ASC, l.intituleLigne ASC');
        $queryDepense->setParameters(array('anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
}else{
       $queryDepense= $em->createQuery('SELECT d as mesdep, sum(d.montantdetail) as sommedepense 
        FROM   App\Entity\Detaildepense d 
        JOIN d.lignebudgetdepense p 
        JOIN  p.service s
        JOIN  p.lignebudgetprevision l
        WHERE  s.axeAnalytique=:axeAnalytique 
        AND p.anneebudgetprevision=:anneebudgetselect 
        AND d.createAt >=:debut  
        AND d.createAt <=:fin
        group by p.id ORDER BY p.service ASC, l.intituleLigne ASC');
        $queryDepense->setParameters(array('axeAnalytique' =>$axe,'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));

    $queryMaCaisse = $em->createQuery('SELECT r as mesrecettes, 
    sum(r.montantrecette) as montantrecette, 
    p FROM  App\Entity\Recette r 
    JOIN r.lignebudgetrecette p  
    JOIN  p.service s
    JOIN  p.lignebudgetprevision l
    WHERE s.axeAnalytique=:axeAnalytique 
    AND p.anneebudgetprevision=:anneebudgetselect 
    AND r.createAt >=:debut 
    AND r.createAt <=:fin 
    group by p.id ORDER BY p.service ASC, l.intituleLigne ASC');
    $queryMaCaisse->setParameters(array('axeAnalytique' =>$axe, 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));

}

}
    
        $maCaisse = $queryMaCaisse->getResult();
        $mesDepense = $queryDepense->getResult();
        return $this->render('sgb/analyse/analyseGlobale.html.twig',[
            'tblCaisse'=>$maCaisse,
            'tblDepense'=>$mesDepense
          ]);
    }catch(\Exception $e){
        return $this->redirectToRoute('selectError', array(
        'error'=>'Veuillez indiquer les criteres correctement'
    ));
        
    }
}


    //suivi de compte
//---------------
 /**
  * @Route("/sgb/analyse/analyseCompte/{id}", name="analyseCompte")
  */
public function etatCompte(Request $request, ObjectManager $manager){

    $session = $request->getSession();
    // Creation de variable de session pour les parametres des requêtes
    // Année budgetaire
    if($request->request->get('annees')!==null && $request->request->get('annees') <> $session->get('anneeselect') ){
     
        $session->set('anneeselect',$request->request->get('annees') );
       }
      $anneebudgetselect= $session->get('anneeselect');
    
        // Service
        if( $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE') ){
            $session->set('servicesselect', $this->getUser()->getServices()->getId() );
            $service= $session->get('servicesselect');
        }else{
        // Service
        if($request->request->get('services')!==null && $request->request->get('services') <> $session->get('servicesselect') ){
            $session->set('servicesselect',$request->request->get('services') );
        }
        $service= $session->get('servicesselect');
        }
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
    $comptesRecettes=array();
    $comptesDepenses=array();
    $em = $this->getDoctrine()->getManager();
    $comptesRecettes= $em->createQuery(' SELECT DISTINCT r as recette, sum(r.montantrecette) as entree
                       FROM  App\Entity\Recette r
                       JOIN r.lignebudgetrecette p
                       JOIN  p.lignebudgetprevision l
                       WHERE p.anneebudgetprevision=:anneebudgetselect
                       AND r.createAt >=:debut  
                       AND r.createAt <=:fin 
                       GROUP BY l.id ORDER BY l.intituleLigne ASC');
    $comptesRecettes->setParameters(array('anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
    $resulEtatcomptesRecettes = $comptesRecettes->getResult();

 return $this->render('sgb/analyse/analyseCompte.html.twig',[
        'comptesRecettes'=>$resulEtatcomptesRecettes,
       
        
]);

}


//suivi de compte par service
//---------------
 /**
  * @Route("/sgb/analyse/analyseCompteParService/{id}", name="zoomSurCompte")
  */
  public function etatCompteParservice(LigneBudgetaire $ligneBudgetaire=null, Request $request, ObjectManager $manager){

    $session = $request->getSession();
    
    // Creation de variable de session pour les parametres des requêtes
    // Année budgetaire
    if($request->request->get('annees')!==null && $request->request->get('annees') <> $session->get('anneeselect') ){
     
        $session->set('anneeselect',$request->request->get('annees') );
       }
      $anneebudgetselect= $session->get('anneeselect');
    
           // Axe
        if($request->request->get('axe')!==null && $request->request->get('axe') <> $session->get('axeselect') ){
           
            $session->set('axeselect',$request->request->get('axe') );
        }
        $axe= $session->get('axeselect');
        // Service
        if( $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE') ){
            $session->set('servicesselect', $this->getUser()->getServices()->getId() );
            $service= $session->get('servicesselect');
        }else{
        // Service
        if($request->request->get('services')!==null && $request->request->get('services') <> $session->get('servicesselect') ){
            $session->set('servicesselect',$request->request->get('services') );
        }
        $service= $session->get('servicesselect');
        }
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
    $comptesRecettes=array();
    $comptesDepenses=array();
    $comptesRecettesparservice=array();
    $resultatRecettesparserviceGraphic=array();
    $resultatDepenseparserviceGraphic=array();
    $comptesDepenseparserviceGraphic=array();
    $comptesDepenseparservice=array();

    $em = $this->getDoctrine()->getManager();
    if( $this->isGranted('ROLE_COMPTABILITE') or $this->isGranted('ROLE_AB') or $this->isGranted('ROLE_ADMIN') or $this->isGranted('ROLE_RECTOR')  or $this->isGranted('ROLE_SG')  ){
        if($ligneBudgetaire->getCategorieLigne()=="Recette"){
            if($service!=""){
                if($service=="*"){
                    $comptesRecettes= $em->createQuery(' SELECT DISTINCT r as recette, sum(r.montantrecette) as entree
                    FROM  App\Entity\Recette r
                    JOIN r.lignebudgetrecette p
                    JOIN  p.lignebudgetprevision l
                    WHERE p.anneebudgetprevision=:anneebudgetselect
                    AND l.id=:cetteLigne
                    AND r.createAt >=:debut  
                    AND r.createAt <=:fin 
                    GROUP BY p.service ORDER BY p.service ASC');
                    $comptesRecettes->setParameters(array('cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));

                    $comptesRecettesparserviceGraphic = $em->createQuery(
                    "SELECT 
                        SUM(r.montantrecette) as  montantrecette, 
                        date_format(r.createAt, '%M %Y') as createAt
                    FROM  
                    App\Entity\Recette r
                    JOIN r.lignebudgetrecette p
                    JOIN  p.lignebudgetprevision l
                    WHERE p.anneebudgetprevision=:anneebudgetselect
                    AND l.id=:cetteLigne
                    AND r.createAt >=:debut  
                    AND r.createAt <=:fin 
                    GROUP BY createAt ORDER BY r.createAt  ASC");    
                    
                    $comptesRecettesparserviceGraphic->setParameters(array('cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
                
                }else{

                    $comptesRecettes= $em->createQuery(' SELECT DISTINCT r as recette, sum(r.montantrecette) as entree
                    FROM  App\Entity\Recette r
                    JOIN r.lignebudgetrecette p
                    JOIN  p.lignebudgetprevision l
                    WHERE p.anneebudgetprevision=:anneebudgetselect
                    AND p.service=:selectService
                    AND l.id=:cetteLigne
                    AND r.createAt >=:debut  
                    AND r.createAt <=:fin 
                    GROUP BY p.service ORDER BY p.service ASC');
                    $comptesRecettes->setParameters(array('selectService'=>$service,'cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
                    

                    $comptesRecettesparserviceGraphic = $em->createQuery(
                        "SELECT 
                            SUM(r.montantrecette) as  montantrecette, 
                            date_format(r.createAt, '%M %Y') as createAt
                        FROM  
                        App\Entity\Recette r
                        JOIN r.lignebudgetrecette p
                        JOIN  p.lignebudgetprevision l
                        WHERE p.anneebudgetprevision=:anneebudgetselect
                        AND p.service=:selectService
                        AND l.id=:cetteLigne
                        AND r.createAt >=:debut  
                        AND r.createAt <=:fin 
                        GROUP BY createAt ORDER BY r.createAt  ASC");    
                        
                        $comptesRecettesparserviceGraphic->setParameters(array('selectService'=>$service,'cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
                }
                        $comptesRecettesparservice = $comptesRecettes->getResult();
                         $resultatRecettesparserviceGraphic = $comptesRecettesparserviceGraphic->execute();
                }elseif($axe!==""){
                    if($axe==='*'){
                        
                        $comptesRecettes= $em->createQuery(' SELECT DISTINCT r as recette, sum(r.montantrecette) as entree
                        FROM  App\Entity\Recette r
                        JOIN r.lignebudgetrecette p
                        JOIN  p.lignebudgetprevision l
                        WHERE p.anneebudgetprevision=:anneebudgetselect
                        AND l.id=:cetteLigne
                        AND r.createAt >=:debut  
                        AND r.createAt <=:fin 
                        GROUP BY p.service ORDER BY p.service ASC');
                        $comptesRecettes->setParameters(array('cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));

                        $comptesRecettesparserviceGraphic = $em->createQuery(
                        "SELECT 
                            SUM(r.montantrecette) as  montantrecette, 
                            date_format(r.createAt, '%M %Y') as createAt
                        FROM  
                        App\Entity\Recette r
                        JOIN r.lignebudgetrecette p
                        JOIN  p.lignebudgetprevision l
                        WHERE p.anneebudgetprevision=:anneebudgetselect
                        AND l.id=:cetteLigne
                        AND r.createAt >=:debut  
                        AND r.createAt <=:fin 
                        GROUP BY createAt ORDER BY r.createAt  ASC");    
                        
                        $comptesRecettesparserviceGraphic->setParameters(array('cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
                        
                    }else{
                        $comptesRecettes= $em->createQuery(' SELECT DISTINCT r as recette, sum(r.montantrecette) as entree
                        FROM  App\Entity\Recette r
                        JOIN r.lignebudgetrecette p
                        JOIN  p.lignebudgetprevision l
                        JOIN p.service s
                        WHERE p.anneebudgetprevision=:anneebudgetselect
                        AND s.axeAnalytique=:axeAnalytique
                        AND l.id=:cetteLigne
                        AND r.createAt >=:debut  
                        AND r.createAt <=:fin 
                        GROUP BY p.service ORDER BY p.service ASC');
                        $comptesRecettes->setParameters(array('axeAnalytique'=>$axe,'cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
                        

                        $comptesRecettesparserviceGraphic = $em->createQuery(
                        "SELECT 
                            SUM(r.montantrecette) as  montantrecette, 
                            date_format(r.createAt, '%M %Y') as createAt
                        FROM  
                        App\Entity\Recette r
                        JOIN r.lignebudgetrecette p
                        JOIN  p.lignebudgetprevision l
                        JOIN p.service s
                        WHERE p.anneebudgetprevision=:anneebudgetselect
                        AND s.axeAnalytique=:axeAnalytique
                        AND l.id=:cetteLigne
                        AND r.createAt >=:debut  
                        AND r.createAt <=:fin 
                        GROUP BY createAt ORDER BY r.createAt  ASC");    
                        
                        $comptesRecettesparserviceGraphic->setParameters(array('axeAnalytique'=>$axe, 'cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));

                    }
                    $comptesRecettesparservice = $comptesRecettes->getResult();
                    $resultatRecettesparserviceGraphic = $comptesRecettesparserviceGraphic->execute();
                }
}elseif($ligneBudgetaire->getCategorieLigne()=="Depense"){
    if($service!==""){
            if($service=="*"){
                    $comptesDepense= $em->createQuery("SELECT DISTINCT d as mesdep, sum(d.montantdetail) as sommedepense,
                    date_format(d.createAt, '%M %Y') as createAt
                    FROM   App\Entity\Detaildepense d 
                    JOIN d.lignebudgetdepense p 
                    JOIN  p.lignebudgetprevision l
                    WHERE p.anneebudgetprevision=:anneebudgetselect 
                    AND l.id=:cetteLigne
                    AND d.createAt >=:debut 
                    AND d.createAt <=:fin 
                    GROUP BY p.service ORDER BY p.service ASC");
                    $comptesDepense->setParameters(array('cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
                
                    
                    $comptesDepenseparserviceGraphic = $em->createQuery(
                        "SELECT sum(d.montantdetail) as sommedepense,
                        date_format(d.createAt, '%M %Y') as createAt
                    FROM   App\Entity\Detaildepense d 
                    JOIN d.lignebudgetdepense p 
                    JOIN  p.lignebudgetprevision l
                    WHERE p.anneebudgetprevision=:anneebudgetselect 
                    AND l.id=:cetteLigne
                    AND d.createAt >=:debut 
                    AND d.createAt <=:fin 
                    GROUP BY createAt ORDER BY d.createAt  ASC");    
                        
                        $comptesDepenseparserviceGraphic->setParameters(array('cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
            }else{
                $comptesDepense= $em->createQuery("SELECT DISTINCT d as mesdep, sum(d.montantdetail) as sommedepense,
                date_format(d.createAt, '%M %Y') as createAt
                FROM   App\Entity\Detaildepense d 
                JOIN d.lignebudgetdepense p 
                JOIN  p.lignebudgetprevision l
                WHERE p.anneebudgetprevision=:anneebudgetselect 
                AND p.service=:selectService
                AND l.id=:cetteLigne
                AND d.createAt >=:debut 
                AND d.createAt <=:fin 
                GROUP BY p.service ORDER BY p.service ASC");
                $comptesDepense->setParameters(array('selectService'=>$service,'cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
                
                $comptesDepenseparserviceGraphic = $em->createQuery(
                    "SELECT sum(d.montantdetail) as sommedepense,
                    date_format(d.createAt, '%M %Y') as createAt
                FROM   App\Entity\Detaildepense d 
                JOIN d.lignebudgetdepense p 
                JOIN  p.lignebudgetprevision l
                WHERE p.anneebudgetprevision=:anneebudgetselect 
                AND p.service=:selectService
                AND l.id=:cetteLigne
                AND d.createAt >=:debut 
                AND d.createAt <=:fin 
                GROUP BY createAt ORDER BY d.createAt  ASC");    
                    
                    $comptesDepenseparserviceGraphic->setParameters(array('selectService'=>$service,'cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
                
            }
        }elseif($axe!==""){
            if($axe==='*'){

                $comptesDepense= $em->createQuery("SELECT DISTINCT d as mesdep, sum(d.montantdetail) as sommedepense,
                date_format(d.createAt, '%M %Y') as createAt
                FROM   App\Entity\Detaildepense d 
                JOIN d.lignebudgetdepense p 
                JOIN  p.lignebudgetprevision l
                WHERE p.anneebudgetprevision=:anneebudgetselect 
                AND l.id=:cetteLigne
                AND d.createAt >=:debut 
                AND d.createAt <=:fin 
                GROUP BY p.service ORDER BY p.service ASC");
                $comptesDepense->setParameters(array('cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
            
                
                $comptesDepenseparserviceGraphic = $em->createQuery(
                    "SELECT sum(d.montantdetail) as sommedepense,
                    date_format(d.createAt, '%M %Y') as createAt
                FROM   App\Entity\Detaildepense d 
                JOIN d.lignebudgetdepense p 
                JOIN  p.lignebudgetprevision l
                WHERE p.anneebudgetprevision=:anneebudgetselect 
                AND l.id=:cetteLigne
                AND d.createAt >=:debut 
                AND d.createAt <=:fin 
                GROUP BY createAt ORDER BY d.createAt  ASC");    
                    
                    $comptesDepenseparserviceGraphic->setParameters(array('cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
            }else{

                $comptesDepense= $em->createQuery("SELECT DISTINCT d as mesdep, sum(d.montantdetail) as sommedepense,
                date_format(d.createAt, '%M %Y') as createAt
                FROM   App\Entity\Detaildepense d 
                JOIN d.lignebudgetdepense p 
                JOIN  p.lignebudgetprevision l
                JOIN p.service s
                WHERE p.anneebudgetprevision=:anneebudgetselect 
                AND s.axeAnalytique=:axeAnalytique
                AND l.id=:cetteLigne
                AND d.createAt >=:debut 
                AND d.createAt <=:fin 
                GROUP BY p.service ORDER BY p.service ASC");
                $comptesDepense->setParameters(array('axeAnalytique'=>$axe,'cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
                
                $comptesDepenseparserviceGraphic = $em->createQuery(
                    "SELECT sum(d.montantdetail) as sommedepense,
                    date_format(d.createAt, '%M %Y') as createAt
                FROM   App\Entity\Detaildepense d 
                JOIN d.lignebudgetdepense p 
                JOIN  p.lignebudgetprevision l
                JOIN p.service s
                WHERE p.anneebudgetprevision=:anneebudgetselect 
                AND s.axeAnalytique=:axeAnalytique
                AND l.id=:cetteLigne
                AND d.createAt >=:debut 
                AND d.createAt <=:fin 
                GROUP BY createAt ORDER BY d.createAt  ASC");    
                    
                $comptesDepenseparserviceGraphic->setParameters(array('axeAnalytique'=>$axe, 'cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
           

            }

        }
$comptesDepenseparservice = $comptesDepense->getResult();
$resultatDepenseparserviceGraphic = $comptesDepenseparserviceGraphic->execute();
    }    
}else{

    if($ligneBudgetaire->getCategorieLigne()=="Recette"){
        $comptesRecettes= $em->createQuery(" SELECT DISTINCT r as recette, sum(r.montantrecette) as entree,
        date_format(r.createAt, '%M %Y') as createAt
        FROM  App\Entity\Recette r
        JOIN r.lignebudgetrecette p
        JOIN  p.lignebudgetprevision l
        WHERE p.anneebudgetprevision=:anneebudgetselect
        AND p.service=:sonService
        AND l.id=:cetteLigne
        AND r.createAt >=:debut  
        AND r.createAt <=:fin 
        GROUP BY createAt  ORDER BY createAt ASC ");
            $comptesRecettes->setParameters(array('sonService'=>$service, 'cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));

            $comptesRecettesparservice = $comptesRecettes->getResult();

            $comptesRecettesparserviceGraphic = $em->createQuery(
            "
            SELECT 
            SUM(r.montantrecette) as  montantrecette, 
            date_format(r.createAt, '%M %Y') as createAt
            FROM  
            App\Entity\Recette r
            JOIN r.lignebudgetrecette p
            JOIN  p.lignebudgetprevision l
            WHERE p.anneebudgetprevision=:anneebudgetselect
            AND p.service=:sonService
            AND l.id=:cetteLigne
            AND r.createAt >=:debut  
            AND r.createAt <=:fin 
            GROUP BY createAt ORDER BY r.createAt ASC");    

            $comptesRecettesparserviceGraphic->setParameters(array('sonService'=>$service, 'cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
            $resultatRecettesparserviceGraphic = $comptesRecettesparserviceGraphic->execute();
        }elseif($ligneBudgetaire->getCategorieLigne()=="Depense"){
            $comptesDepense= $em->createQuery("SELECT DISTINCT d as mesdep, sum(d.montantdetail) as sommedepense,
             date_format(d.createAt, '%M %Y') as createAt
            FROM   App\Entity\Detaildepense d 
            JOIN d.lignebudgetdepense p 
            JOIN  p.lignebudgetprevision l
            WHERE p.anneebudgetprevision=:anneebudgetselect
            AND p.service=:sonService 
            AND l.id=:cetteLigne
            AND d.createAt >=:debut 
            AND d.createAt <=:fin 
            GROUP BY createAt  ORDER BY d.createAt  ASC");
            $comptesDepense->setParameters(array('sonService'=>$service, 'cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
            $comptesDepenseparservice = $comptesDepense->getResult();
            
            $comptesDepenseparserviceGraphic = $em->createQuery(
                "SELECT sum(d.montantdetail) as sommedepense,
                date_format(d.createAt, '%M %Y') as createAt
               FROM   App\Entity\Detaildepense d 
               JOIN d.lignebudgetdepense p 
               JOIN  p.lignebudgetprevision l
               WHERE p.anneebudgetprevision=:anneebudgetselect
               AND p.service=:sonService 
               AND l.id=:cetteLigne
               AND d.createAt >=:debut 
               AND d.createAt <=:fin 
               GROUP BY createAt  ORDER BY d.createAt ASC");    
                
                $comptesDepenseparserviceGraphic->setParameters(array('sonService'=>$service,'cetteLigne'=>$ligneBudgetaire->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
            $resultatDepenseparserviceGraphic = $comptesDepenseparserviceGraphic->execute();
        }

    }

 return $this->render('sgb/analyse/analyseCompteParService.html.twig',[
        'comptesRecettesparservice'=>$comptesRecettesparservice,
        'resultatRecettesparserviceGraphic'=>$resultatRecettesparserviceGraphic,
        'resultatDepenseparserviceGraphic'=>$resultatDepenseparserviceGraphic,
        'comptesDepenseparservice'=> $comptesDepenseparservice
       
        
]);

}




//suivi de compte par service avec detail
//---------------
 /**
  * @Route("/sgb/analyse/analyseCompteParServiceDetail/{id}", name="zoomSurCompteDetail")
  */
  public function etatCompteParserviceDetail(Previsionbudget $previsionbudget=null, Request $request, ObjectManager $manager){

    $session = $request->getSession();
    
    // Creation de variable de session pour les parametres des requêtes
    // Année budgetaire
    if($request->request->get('annees')!==null && $request->request->get('annees') <> $session->get('anneeselect') ){
     
        $session->set('anneeselect',$request->request->get('annees') );
       }
      $anneebudgetselect= $session->get('anneeselect');
    
        // Service
        if( $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE') ){
            $session->set('servicesselect', $this->getUser()->getServices()->getId() );
            $service= $session->get('servicesselect');
        }else{
        // Service
        if( $previsionbudget->getService()->getId() <> $session->get('servicesselect') ){
            $session->set('servicesselect',$previsionbudget->getService()->getId());
        }
        $service= $session->get('servicesselect');
        }
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
    $comptesRecettes=array();
    $comptesDepenses=array();
    $comptesRecettesparservice=array();
    $resultatRecettesparserviceGraphic=array();
    $resultatDepenseparserviceGraphic=array();
    $comptesDepenseparserviceGraphic=array();
    $comptesDepenseparservice=array();

    $em = $this->getDoctrine()->getManager();
    if( $this->isGranted('ROLE_COMPTABILITE') or $this->isGranted('ROLE_AB') or $this->isGranted('ROLE_ADMIN') or $this->isGranted('ROLE_RECTOR')  or $this->isGranted('ROLE_SG')  ){
        if($previsionbudget->getLignebudgetprevision()->getCategorieLigne()=="Recette"){
         $comptesRecettes= $em->createQuery(" SELECT DISTINCT r as recette, sum(r.montantrecette) as entree,
                     date_format(r.createAt, '%M %Y') as createAt
                       FROM  App\Entity\Recette r
                       JOIN r.lignebudgetrecette p
                       JOIN  p.lignebudgetprevision l
                       WHERE p.anneebudgetprevision=:anneebudgetselect
                       AND p.service=:sonService
                       AND p.id=:cettePrevision
                       AND r.createAt >=:debut  
                       AND r.createAt <=:fin 
                       GROUP BY createAt ORDER BY r.createAt ASC");
    $comptesRecettes->setParameters(array('sonService'=>$service, 'cettePrevision'=>$previsionbudget->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
    $comptesRecettesparservice = $comptesRecettes->getResult();
    
    $comptesRecettesparserviceGraphic = $em->createQuery(
        "SELECT 
            SUM(r.montantrecette) as  montantrecette, 
            date_format(r.createAt, '%M %Y') as createAt
        FROM  
        App\Entity\Recette r
        JOIN r.lignebudgetrecette p
        JOIN  p.lignebudgetprevision l
        WHERE p.anneebudgetprevision=:anneebudgetselect
        AND p.service=:sonService
        AND p.id=:cettePrevision
        AND r.createAt >=:debut  
        AND r.createAt <=:fin 
        GROUP BY createAt ORDER BY r.createAt  ASC");    
        
        $comptesRecettesparserviceGraphic->setParameters(array('sonService'=>$service, 'cettePrevision'=>$previsionbudget->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
    $resultatRecettesparserviceGraphic = $comptesRecettesparserviceGraphic->execute();
}elseif($previsionbudget->getLignebudgetprevision()->getCategorieLigne()=="Depense"){
    $comptesDepense= $em->createQuery("SELECT DISTINCT d as mesdep, sum(d.montantdetail) as sommedepense,
     date_format(d.createAt, '%M %Y') as createAt
    FROM   App\Entity\Detaildepense d 
    JOIN d.lignebudgetdepense p 
    JOIN  p.lignebudgetprevision l
    WHERE p.anneebudgetprevision=:anneebudgetselect 
    AND p.service=:sonService
    AND p.id=:cettePrevision
    AND d.createAt >=:debut 
    AND d.createAt <=:fin 
    GROUP BY createAt ORDER BY d.createAt  ASC");    
    $comptesDepense->setParameters(array('sonService'=>$service,  'cettePrevision'=>$previsionbudget->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
    $comptesDepenseparservice = $comptesDepense->getResult();
    
    $comptesDepenseparserviceGraphic = $em->createQuery(
        "SELECT sum(d.montantdetail) as sommedepense,
        date_format(d.createAt, '%M %Y') as createAt
       FROM   App\Entity\Detaildepense d 
       JOIN d.lignebudgetdepense p 
       JOIN  p.lignebudgetprevision l
       WHERE p.anneebudgetprevision=:anneebudgetselect 
       AND p.service=:sonService
       AND p.id=:cettePrevision
       AND d.createAt >=:debut 
       AND d.createAt <=:fin 
       GROUP BY createAt ORDER BY d.createAt  ASC");    
       $comptesDepenseparserviceGraphic->setParameters(array('sonService'=>$service,  'cettePrevision'=>$previsionbudget->getId(), 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
    $resultatDepenseparserviceGraphic = $comptesDepenseparserviceGraphic->execute();
}
    
}

 return $this->render('sgb/analyse/analyseCompteParServiceDetail.html.twig',[
        'comptesRecettesparservice'=>$comptesRecettesparservice,
        'resultatRecettesparserviceGraphic'=>$resultatRecettesparserviceGraphic,
        'resultatDepenseparserviceGraphic'=>$resultatDepenseparserviceGraphic,
        'comptesDepenseparservice'=> $comptesDepenseparservice
       
        
]);

}



function dateDifference($datedebut, $datefin)
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
    
     $annees = $em->getRepository(Anneebudgetaire::class)->findAll();
     $services = $em->getRepository(Service::class)->findAll();
     $axes = $em->getRepository(Axeanalytique::class)->findAll();
     //$twig->addExtension(new Twig_Extensions_Extension_Date());
     return $this->render('sgb/analyse/selectAnalyse.html.twig',[
                     'annees'=>$annees,
                     'services'=> $services,
                     'axes'=> $axes,
                     'error'=>$error
     ]);
 }
 
    /**
     * @Route("/sgb/caisse/decaisser/{id}/delete/", name="delete_caisser")
     */
    public function deleteCaisser(Detaildepense $detaildepense, Request $request, ObjectManager $manager){
        if(!$detaildepense){ 
          exit;
       } 
      $em = $this->getDoctrine()->getManager();
      try{
           if($detaildepense->getCaisseCentrale()!==null){
            $caisseCentrale=$em->getRepository(CaisseCentrale::class)->findOneBy(['depense'=>$detaildepense->getId()]);
            $manager->remove($caisseCentrale);
            $manager->flush();
            }
                $manager->remove($detaildepense);
                $manager->flush(); 
                return $this->redirectToRoute('servireOp');  
            }catch(\Exception $e){
            return $this->redirectToRoute('servireOp');  
            }
    }

   /**
 * @Route("/sgb/caisse/selectdecaissercentrale", name="selectdecaissercentrale")
 */
public function fillDecaisserYears(Request $request){
    
    $em = $this->getDoctrine()->getManager();
    $annees = $em->getRepository(Anneebudgetaire::class)->findAll();
    $services = $em->getRepository(Service::class)->findAll();
    return $this->render('sgb/caisse/selectdecaissercentrale.html.twig',[
                    'annees'=>$annees,
                    'services'=> $services
    ]);
}


}


    