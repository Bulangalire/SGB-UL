<?php

namespace App\Controller;

use App\Entity\Depense;
use App\Entity\Service;
use App\Entity\Personne;
use App\Entity\Etatbesoin;
use App\Entity\Detaildepense;
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
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class DepenseController extends AbstractController{

/**
 * @Route("/sgb/depense/addOp", name="depense_Op")
 * @Route("/sgb/depense/addOp/{id}/edit", name="op_edit")
 */
public function frmOp(Session $session, Depense $unedepense = null, Request $request, ObjectManager $manager){
    if($this->getUser()===null) {              
        return $this->redirectToRoute('user_login');
    }
    if(!$unedepense){
        $unedepense= new Depense();
    }
    
    // Service
   if( $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE') ){
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
    $frmDepense= $this->createFormBuilder( $unedepense)
            
            ->add('id', HiddenType::class
                ,['mapped'=> false])
            ->add('libele')
            ->add('createAt', DateType::class, array(
                'widget' => 'single_text',
                // this is actually the default format for single_text
                'format' => 'yyyy-MM-dd',
                'label'=>'Date '
            ))
            ->add('montantdepense', NumberType::class, array(
                'label'=>'Montant'
            ))
            ->add('utilisateurdepense', EntityType::class, array(
                'class'  => Personne::class,
               
                'query_builder'=>function(EntityRepository $er)use ( $unedepense) {
                    if($this->isGranted('ROLE_COMPTABILITE') or $this->isGranted('ROLE_COMPTE_FAC')){
                            return $er->createQueryBuilder('p')
                            ->select("p")
                            ->where("p.id=:user")
                            ->setParameter('user',  $unedepense->getUtilisateurdepense()!== $this->getUser()? 
                            $unedepense->getUtilisateurdepense(): $unedepense == null? $this->getUser():$this->getUser()
                             );
                    }elseif($this->isGranted('ROLE_RECTOR') or $this->isGranted('ROLE_SG') or $this->isGranted('ROLE_AB') or $this->isGranted('ROLE_CHEF_SERVICE')){
                        return $er->createQueryBuilder('p')
                        ->select("p")
                        ->where("p.id=:userdepense")
                        ->setParameter('userdepense', $unedepense->getUtilisateurdepense());
                    }
                },               
               
                'choice_label'=>'nom',
                'label'=>'Comptable'
            ))
            ->add('numOp')
            ->add('dateEmission', DateType::class, array(
                'widget' => 'single_text',
                // this is actually the default format for single_text
                'format' => 'yyyy-MM-dd',
                'label'=>'Date emission'
            ))
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
               
                'label'=>'Autorisation du Chef de Service',
             
            ])
            ->add('autoriserSG', CheckboxType::class, [
               
                'label'=>'Autorisation du SG',
               
            ])
            ->add('autoriserAB', CheckboxType::class, [
               
                'label'=>'Autorisation de l\'AB',
                 
            ])
            ->add('autoriserRecteur', CheckboxType::class, [
               
                'label'=>'Autorisation du Recteur',
               
            ])
            ->add('isCentralyzed', CheckboxType::class, [
               
                'label'=>'Centraliser',
                
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
                'query_builder'=>function(EntityRepository $er)use ( $service, $em) {
                    if($this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE')){
                            return $er->createQueryBuilder('s')
                            ->select("s")
                            ->where("s.id=:userservice")
                            ->setParameter('userservice',  $this->getUser()->getServices());
                    }elseif($this->isGranted('ROLE_COMPTABILITE') or $this->isGranted('ROLE_RECTOR') or $this->isGranted('ROLE_SG') or $this->isGranted('ROLE_AB')){
                        return $er->createQueryBuilder('s')
                        ->select("s")
                        ->where("s.id=:userservice")
                        ->setParameter('userservice',  $service);
                    }
                },               
                 'choice_label' => 'designation',
                
            ))

            ->getForm();
            
           $frmDepense->handleRequest($request);
           $em = $this->getDoctrine()->getManager();
           if( $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE') ){
            $queryOpNonSigne = $em->createQuery("SELECT d as listOp  FROM 
                App\Entity\Depense d
                WHERE d.autoriserChefService=false
                AND d.service=:ceService
                ");
                
                
           }elseif($this->isGranted('ROLE_RECTOR')) {
            $queryOpNonSigne = $em->createQuery("SELECT d as listOp  FROM 
                    App\Entity\Depense d
                    WHERE d.service=:ceService 
                    AND d.autoriserRecteur=false
                    ");
                
            }elseif($this->isGranted('ROLE_SG')) {
                $queryOpNonSigne = $em->createQuery("SELECT d as listOp  FROM 
                        App\Entity\Depense d
                        WHERE d.service=:ceService 
                        AND d.autoriserSG=false
                        ");
                    
                }elseif($this->isGranted('ROLE_AB')) {
                    $queryOpNonSigne = $em->createQuery("SELECT d as listOp  FROM 
                            App\Entity\Depense d
                            WHERE d.service=:ceService 
                            AND d.autoriserAB=false
                            ");
                        
                }else{
                    $queryOpNonSigne = $em->createQuery("SELECT d as listOp  FROM 
                            App\Entity\Depense d
                            WHERE d.service=:ceService 
                            ");
                }
            $queryOpNonSigne->setParameter('ceService', $service);
                $resutatListOpNonSigne = $queryOpNonSigne->getResult();
              
                

            if( $frmDepense->isSubmitted() && $frmDepense->isValid() ){

                if($unedepense->getService()==null && $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE')){
                    $unedepense->setService($this->getUser()->getServices());
                 }
                 if($unedepense->getUtilisateurdepense()==null){
                    $unedepense->setUtilisateurdepense($this->getUser());
                 }

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
                                return $this->redirectToRoute('depense_Op');
                            }else{
                              echo $errorMessage= '<h5 style="color:red;">Le montant de depense depasse le solde à depenser pour cette ligne. reste est de :'.$SoldeADepense .' </h5>';
                               return $this->render('sgb/depense/addOp.html.twig',['frmAddOp' =>  $frmDepense->createView(),
                               'resutatListOpNonSigne'=>$resutatListOpNonSigne]);
                            }
                        }
                }
            
               
            
         
            return $this->render('sgb/depense/addOp.html.twig',['frmAddOp' =>  $frmDepense->createView(),
            'resutatListOpNonSigne'=>$resutatListOpNonSigne,
           
            ]);
     }


     


/**
 * @Route("/sgb/depense/etatBesoin", name="etatBesoin_create")
 * @Route("/sgb/depense/etatBesoin/{id}/edit", name="etatBesoin_edit")
 * @Route("/sgb/depense/etatBesoin/{id}/filtre", name="etatBesoin_par_op")
 */
public function frmEtatBesoin(Depense $depense =null, EtatbesoinRepository $repositoryEtatbesoin, Etatbesoin $etatbesoin = null, $id=null, Request $request, ObjectManager $manager){
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
               
                ->getForm();
             
                
                $etatbesoin->setDepense( $depense);
                $em = $this->getDoctrine()->getManager();
                $frmEtatbesoin->handleRequest($request);
                $querylesEtatDeBesoins=$em->createQuery('SELECT e FROM App\Entity\Etatbesoin e WHERE e.depense=:cetteDepense');
                $querylesEtatDeBesoins->setParameters(array('cetteDepense'=> $depense->getId()));
                $lesEtatDeBesoins = $querylesEtatDeBesoins->getResult();


                if( $frmEtatbesoin->isSubmitted() &&  $frmEtatbesoin->isValid()){
                   
                        if($em->getRepository("\App\Entity\Etatbesoin")->findOneBy(
                            array('depense'=>$etatbesoin->getDepense(), 
                            'designation'=>$etatbesoin->getDesignation(), 
                            'quantite'=>$etatbesoin->getQuantite()) 
                            )&& $etatbesoin->getId()==null){
                                echo '<h5 style="color:red;"> Cet etat de besoin existe déjà </h5>';
                            }elseif((($etatbesoin->getQuantite() * $etatbesoin->getPrixunitaire()) +
                                        $etatbesoin->getDepense()->getSommeEtatbesoins())> 
                                        $etatbesoin->getDepense()->getMontantdepense()){
                                            echo '<h5 style="color:red;"> le montant de l\'etat de besoin ('. (($etatbesoin->getQuantite() * $etatbesoin->getPrixunitaire()) +
                                            $etatbesoin->getDepense()->getSommeEtatbesoins()) .'$) est superiere à celui de l\'OP('.  $etatbesoin->getDepense()->getMontantdepense() .'$) </h5>';
                              }else{
                                $manager->persist($etatbesoin);
                                $manager->flush();
                                return $this->redirectToRoute('etatBesoin_par_op',
                                ['id' => $etatbesoin->getDepense()->getId()]);
                            }
                    }
             
                return $this->render('sgb/depense/etatBesoin.html.twig',['frmEtatbesoin' =>  $frmEtatbesoin->createView(), 'id'=>$id , 'lesEtatDeBesoins'=>$lesEtatDeBesoins]);
         }


         /**
     * @Route("/sgb/depense/{id}/delete", name="etatbesoin_delete")
     */
    public function deleteEtatbesoin(Depense $depense=null, Etatbesoin $etatbesoin = null, Request $request, ObjectManager $manager){
        if(!$etatbesoin){ 
          exit;
       } 
                      try{
                           // Recuperer la depense avec de supprimer l'objet etatbesoin
                            $session = $request->getSession();
                            if($etatbesoin->getDepense() <> $session->get('depenseActuelle') ){
                                $session->set('depenseActuelle',$etatbesoin->getDepense() );
                            }
                            $depense= $session->get('depenseActuelle');
                           $manager->remove($etatbesoin);
                           $manager->flush(); 
                           return $this->redirectToRoute('etatBesoin_par_op',['id'=>$depense->getId()]);  
                      }catch(\Exception $e){
                          return $this->redirectToRoute('depense_create');  
                     }
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

            $annees = $em->getRepository(Anneebudgetaire::class)->findAll();
            $services = $em->getRepository(Service::class)->findAll();
            return $this->render('sgb/depense/opPartiellement.html.twig',[
                            'annees'=>$annees,
                            'services'=> $services
            ]);

         }

         /**
          * @Route("/sgb/depense/opRegles" , name="les_op_deja_payer")
          */
         public function opDejaPaye(Request $request, ObjectManager $manager){

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

            $em = $this->getDoctrine()->getManager();
             // Lister les op déjà paye
           $sqlOPDejaPaye = $em->createQuery('SELECT dop as lesdetails,
           sum(  dop.montantdetail) as dejaPayer, p, d 
           FROM  App\Entity\Detaildepense dop 
           JOIN dop.depenseId d 
           JOIN dop.lignebudgetdepense p
           WHERE 
             dop.createAt BETWEEN :debut AND :fin 
           GROUP BY dop.depenseId 
           HAVING (sum( CASE WHEN d.autoriserAB=true AND d.autoriserSG=true AND d.autoriserRecteur=true THEN dop.montantdetail ELSE  d.montantdepense +1 END) = d.montantdepense )
           ORDER BY p.service ');
          $sqlOPDejaPaye->setParameters(array( 'debut'=> $datedebut, 'fin'=> $datefin));
          $queryListOPDejaPaye = $sqlOPDejaPaye->getResult();

          return $this->render('sgb/depense/opRegles.html.twig',[
            'queryListOPDejaPaye'=>$queryListOPDejaPaye,
            
]);

         }
    /**
     * @Route("/sgb/depense/lesOPDepenses", name="lesOPDepenses_overview")
     * 
     */
    public function getOpPaye(Session $session, Depense $unedepense = null, Request $request, ObjectManager $manager)
    {
        if($this->getUser()===null) {              
           return $this->redirectToRoute('user_login');
        }

        // Service limité au rôle de l'utilisateur
        if( $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE') )
        {
            $session->set('servicesselectOp', $this->getUser()->getServices()->getId() );
            $service= $session->get('servicesselectOp');
        }else{
            // Service accès compltet
            if($request->request->get('services')!==null && $request->request->get('services') <> $session->get('servicesselectOp') )
            {
                $session->set('servicesselectOp',$request->request->get('services') );
            }
            $service= $session->get('servicesselectOp');
        }

        // Année budgetaire
        if($request->request->get('annees')!==null && $request->request->get('annees') <> $session->get('anneeselectOp') )
        {
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
                    WHERE 
                        p.anneebudgetprevision=:anneebudgetselect
                    AND d.isCentralyzed=false
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
          return $this->render('sgb/depense/lesOPDepenses.html.twig',[
                'queryListOpAPayeOverView' => $queryListOpAPaye,
                'queryListOpAPayeDeux'=> $queryListOpAPayeDeux,
                'queryListOPNonSigne'=> $queryListOPNonSigne 
          ]);
        }

        /**
         * @Route("/sgb/depense/etatCaisse", name="caisse_par_service")
         */
        public function etatCaisse(Service $service=null, Depense $depense=null, Detaildepense $detaildepense = null, Session $session, Request $request, ObjectManager $manager){

        
            // Service
        if( $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE') ){
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
          
            if( $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE') ){
                $sqlDetailSortieParLigne = $em->createQuery('SELECT dop as lesdetails,p
                FROM  App\Entity\Detaildepense dop 
                JOIN dop.lignebudgetsource p
                WHERE  p.anneebudgetprevision=:anneebudgetselect
                AND p.service=:service
               ');
               $sqlDetailSortieParLigne->setParameters(array('anneebudgetselect'=> $anneebudgetselect, 'service'=>$service));
             
                $sqlSoldeCompte = $em->createQuery('SELECT r as mesrecettes, 
                sum(r.montantrecette) as montantrecette, 
                p FROM  App\Entity\Recette r 
                JOIN r.lignebudgetrecette p  
                WHERE p.service=:userservice 
                AND p.anneebudgetprevision=:anneebudgetselect 
                group by p.id');
                $sqlSoldeCompte->setParameters(array('userservice' =>$service, 'anneebudgetselect'=> $anneebudgetselect));

                $queryListDetailSortieParLigne = $sqlDetailSortieParLigne->getResult();
                $querySoldeCompte = $sqlSoldeCompte->getResult();
                return $this->render('sgb/depense/etatCaisse.html.twig',[
                 
                 'queryListDetailSortieParLigne'=>$queryListDetailSortieParLigne,
                 'querySoldeCompte'=>$querySoldeCompte
               ]);
             
            }else{
            $sqlDetailSortieParLigne = $em->createQuery('SELECT dop as lesdetails,p
            FROM  App\Entity\Detaildepense dop 
            JOIN dop.lignebudgetsource p
            WHERE  p.anneebudgetprevision=:anneebudgetselect
           ');
           $sqlDetailSortieParLigne->setParameters(array('anneebudgetselect'=> $anneebudgetselect));
          
           $sqlSoldeCompte = $em->createQuery('SELECT r as mesrecettes, 
            sum(r.montantrecette) as montantrecette, 
            p FROM  App\Entity\Recette r 
            JOIN r.lignebudgetrecette p  
            WHERE p.service=:userservice 
            AND p.anneebudgetprevision=:anneebudgetselect 
            group by p.id');
            $sqlSoldeCompte->setParameters(array('userservice' =>$service, 'anneebudgetselect'=> $anneebudgetselect));
         
            $sqlSoldeCompteAutres = $em->createQuery('SELECT r as mesrecettes, 
            sum(r.montantrecette) as montantrecette, 
            p FROM  App\Entity\Recette r 
            JOIN r.lignebudgetrecette p  
            WHERE p.anneebudgetprevision=:anneebudgetselect 
            group by p.id');
            $sqlSoldeCompteAutres->setParameters(array('anneebudgetselect'=> $anneebudgetselect));

            $queryListDetailSortieParLigne = $sqlDetailSortieParLigne->getResult();
            $querySoldeCompte = $sqlSoldeCompte->getResult();
            $querySoldeCompteAutres = $sqlSoldeCompteAutres->getResult();
            return $this->render('sgb/depense/etatCaisse.html.twig',[
             
             'queryListDetailSortieParLigne'=>$queryListDetailSortieParLigne,
             'querySoldeCompte'=>$querySoldeCompte,
             'querySoldeCompteAutres' =>$querySoldeCompteAutres
           ]);
        }
         
        }
/**
 * @Route("/sgb/depense/selectparametersLesOpDepense", name="selectparametersLesOpDepense")
 */
public function fillYears(Request $request){
    
    $em = $this->getDoctrine()->getManager();
    $annees = $em->getRepository(Anneebudgetaire::class)->findAll();
    $services = $em->getRepository(Service::class)->findAll();
    return $this->render('sgb/depense/selectparametersLesOpDepense.html.twig',[
                    'annees'=>$annees,
                    'services'=> $services
    ]);
}

        }
        