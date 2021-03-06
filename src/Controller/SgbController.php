<?php

namespace App\Controller;

use App\Entity\Nuts;
use App\Entity\Depense;
use App\Entity\Recette;
use App\Entity\Service;
use App\Entity\Personne;
use App\Entity\SousRubrique;
use App\Controller\SGBHelper;
use App\Entity\Detaildepense;
use App\Entity\Anneebudgetaire;
use App\Entity\LigneBudgetaire;
use App\Entity\Previsionbudget;
use App\Entity\Plantresorerie;
use App\Entity\CaisseCentrale;
use App\Entity\CompteJournaux;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Twig\AppVariable;
use App\Repository\DepenseRepository;
use App\Repository\RecetteRepository;
use App\Repository\ServiceRepository;
use Symfony\Component\Form\FormEvent;
use App\Repository\PersonneRepository;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\AbstractType;
use App\Repository\LigneBudgetaireRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Form\Extension\Core\Type\IntType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\DateType;
use Mukadi\Chart\Utils\RandomColorFactory;
use Mukadi\Chart\Chart;
use Dompdf\Dompdf;
use Dompdf\Options;

class SgbController extends AbstractController
{
    /**
     * @Route("/sgb", name="sgb")
     */
    public function index(LigneBudgetaireRepository $repository)
    {
        //Remplacer par l'injection de dependence en parametre
        //$repository = $this->getDoctrine()->getRepository(LigneBudgetaire::class);
        // Trouver une Ligne portant cette Intitule
        //$ligneBgt = $repository->findOneByIntituleLigne("Salaire Agent n°3");
        
        // Trouver une Ligne numero 9
        //$ligneBgt = $repository->find(9);
        
        // Trouver toutes les lignes portant cette Intitule
        //$ligneBgt = $repository->findByIntituleLigne("Salaire Agent n°3");
        
        // Trouver toutes les lignes 
        $ligneBgts = $repository->findAll();
        
        return $this->render('sgb/index.html.twig', [
            'controller_name' => 'SgbController', 'lignebudgets'=> $ligneBgts
        ]);
    }

     /**
     * @Route("/sgb/lignebudgetaireoverview", name="lb_overview")
     */
    public function lignebudgetaireoverview(LigneBudgetaireRepository $repository, Request $request)
    {
        if($this->getUser()===null) {              
            return $this->redirectToRoute('user_login');
           }
        //Remplacer par l'injection de dependence en parametre
        //$repository = $this->getDoctrine()->getRepository(LigneBudgetaire::class);
        // Trouver une Ligne portant cette Intitule
        //$ligneBgt = $repository->findOneByIntituleLigne("Salaire Agent n°3");
        
        // Trouver une Ligne numero 9
        //$ligneBgt = $repository->find(9);
        
        // Trouver toutes les lignes portant cette Intitule
       // $ligneRecette = $repository->findByCategorieLigne("Recette");
        //$ligneDepense = $repository->findByCategorieLigne("Depense");
     
        $ligneRecette=$this->getDoctrine()->getRepository("\App\Entity\LigneBudgetaire")->findByCategorieLigne("Recette");
        $ligneDepense=$this->getDoctrine()->getRepository("\App\Entity\LigneBudgetaire")->findByCategorieLigne("Depense");
        // Trouver toutes les lignes
        $ligneBgts = $repository->findAll();
           return $this->render('sgb/LigneBudgetaire/lignebudgetaireoverview.html.twig', [
            'controller_name' => 'SgbController', 'lignebudgets'=> $ligneBgts, 
            'ligneDepense'=>count($ligneDepense),
            'ligneRecette'=>count($ligneRecette)
        ]);
    }


    /**
     * @Route("sgb/LigneBudgetaire/importligne", name="sgb_excelimport")
     */
    public function importligne(Request $request){
       
           $formimportligne= $this->createFormBuilder( null)
                    ->add('attachment', FileType::class)
                    ->getForm();
       
                    $formimportligne->handleRequest($request);
                    if( $formimportligne->isSubmitted() &&  $formimportligne->isValid()){
                        $file = $formimportligne['attachment']->getData();
                        //$file=$_FILES['importfile']['tmp_name'];
                            $handle = fopen($file, "r");
                            $i=0;
                                while(($fileop = fgetcsv($handle,1000, ";")) !== false){
                                    $em = $this->getDoctrine()->getManager();
                                   
                                    $LigneBudgetaire = new LigneBudgetaire();
                                    $LigneBudgetaire->setIntituleLigne($fileop[1]);
                                    $LigneBudgetaire->setCompteLigne($fileop[2], IntType::class);
                                    $LigneBudgetaire->setCategorieLigne($fileop[3]);
                                    $LigneBudgetaire->setDescription($fileop[4]);
                                    $verif = $em->getRepository("\App\Entity\LigneBudgetaire")->findOneBy(array('intituleLigne'=>$fileop[1],'compteLigne'=>$fileop[2] ));
                                    if($verif){
                                        echo 'la ligne déjà existante';
                                        $i=$i+1;
                                    }else{
                                        $em = $this->getDoctrine()->getManager();
                                        $em->persist($LigneBudgetaire);
                                        $em->flush();
                                        } 
                               }
                                $request->getSession()->getFlashBag()->add('success', 'Liste enregistrée.');
                        //return $this->redirectToRoute('lb_overview');    
                        return $this->redirect($this->generateUrl('lb_overview', [
                            'sum'=>$i
                        ]));
                    }
                return $this->render('sgb/LigneBudgetaire/importligne.html.twig', [
            'formimport'=> $formimportligne->createView()]); 
        }


    /**
     * @Route("/", name="home")
     */
    public function home(){
        return $this->render('sgb/home.html.twig', ['title'=>"Bienvenu à SGB, Système de Gestion de Budgetaire", 'age'=>30]);
    }


    /**
     * @Route("/sgb/LigneBudgetaire/{id}/delete", name="sgb_delete")
     */
    public function delete(LigneBudgetaire $uneLigne = null, Request $request, ObjectManager $manager){
       
        if(!$uneLigne){
       exit;
    }
                        try{
                        $manager->remove($uneLigne);
                        $manager->flush(); 
                        return $this->redirectToRoute('lb_overview');    
                        }catch(\Exception  $e){
                            return $this->redirectToRoute('lb_overview');    
                        }
                  
    }
    /**
     * @Route("/sgb/LigneBudgetaire/new", name="sgb_create")
     * @Route("/sgb/LigneBudgetaire/{id}/edit", name="sgb_edit")
     */
    public function form(LigneBudgetaire $uneLigne = null, Request $request, ObjectManager $manager){
        if($this->getUser()===null) {              
            return $this->redirectToRoute('user_login');
           }
        if(!$uneLigne){
        $uneLigne= new LigneBudgetaire();
    }
        $form= $this->createFormBuilder( $uneLigne)
                    ->add('intituleLigne')
                    ->add('CompteLigne')
                    ->add('CategorieLigne', ChoiceType::class, array(
                        'choices'  => array(
                            'Recette' => 'Recette',
                            'Depense' => 'Depense',
                        )))
                    ->add('description')
                    ->getForm();
       
                    $form->handleRequest($request);
                    if( $form->isSubmitted() &&  $form->isValid()){
                        $manager->persist($uneLigne);
                        $manager->flush(); 
                        return $this->redirectToRoute('sgb_show', ['id' => $uneLigne->getId()]);    
                    }         
        return $this->render('sgb/LigneBudgetaire/create.html.twig', [
            'formLigne'=> $form->createView(),
            'editMode'=> $uneLigne->getId()!==null
        ]);
            
    }
    /**
     * @Route("/sgb/LigneBudgetaire/{id}", name="sgb_show")
     */
    public function show(LigneBudgetaire $uneLigne )// anciens params :LigneBudgetaireRepository $repository, $id
    {    //Remplacer par l'injection de dependence en parametre
        //$repository=$this->getDoctrine()->getRepository(LigneBudgetaire::class);
        
         //Remplacer par l'injection de dependence en prennant le id de la route
        //$uneLigne =$repository->find($id);
        return $this->render('sgb/LigneBudgetaire/show.html.twig',[
            'uneLigne'=>$uneLigne
        ]);
    }
    /**
     *      service de l'université
     *  
     */

    /**
     * @Route("/sgb/service/new/{errordelete}", name="errordeleteservice")
     * @Route("/sgb/service/new", name="service_create")
     * @Route("/sgb/service/{id}/edit", name="service_edit")
     * 
     */
    public function formservice(ServiceRepository $serviceRepository, Service $unservice = null, Request $request, ObjectManager $manager){
        if($this->getUser()===null) {              
            return $this->redirectToRoute('user_login');
           }
        if(!$unservice){
        $unservice= new Service();
    }
    $em = $this->getDoctrine()->getManager();
        $frmservice= $this->createFormBuilder( $unservice)
                    ->add('designation')
                    ->add('emailservice')
                    ->add('description')
                    ->getForm();
       
                    $frmservice->handleRequest($request);
                    if( $frmservice->isSubmitted() &&  $frmservice->isValid()){
                        if($em->getRepository("\App\Entity\Service")->findOneBy(array('designation'=>$unservice->getDesignation(), 'emailservice'=>$unservice->getEmailservice(), 'description'=>$unservice->getDescription())) && $unservice->getId()==null){
                           echo '<h2 style="color:red;"> le service existe déjà </h2>';
                        }else{
                            $manager->persist($unservice);
                            $manager->flush(); 
                            //return $this->redirectToRoute('sgb_show', ['id' => $uneLigne->getId()]);
                        }
                    } 
                    $lesServices = $serviceRepository->findAll();        
            return $this->render('sgb/service/service.html.twig', [
            'formService'=> $frmservice->createView(),
           'editMode'=> $unservice->getId()!==null,
            'lesServices'=>$lesServices
        ]);
     }


     /**
     * @Route("/sgb/service/{id}/delete", name="service_delete")
     */
    public function deleteservice(Service $service = null, Request $request, ObjectManager $manager){
     if(!$service){ 
       exit;
    } 
                    try{
                        $manager->remove($service);
                        $manager->flush(); 
                        return $this->redirectToRoute('service_create');  
                    }catch(\Exception $e){
                        return $this->redirectToRoute('service_create');  
                    }
}

     /**
     *      Personne de l'université
     *  
     */

    /**
     * @Route("/sgb/personne/new", name="personne_create")
     * @Route("/sgb/personne/{id}/edit", name="personne_edit")
     * @Route("/sgb/personne/{id}/filtrer", name="personne_by_service")
     */
    public function formpersonne(UserPasswordEncoderInterface $encoder, Service $service =null, PersonneRepository $personneRepository, Personne $unePersonne = null, Request $request, ObjectManager $manager){
        if($this->getUser()===null) {              
            return $this->redirectToRoute('user_login');
           }
        if(!$unePersonne){
        $unePersonne= new Personne();
    }
   
    $em = $this->getDoctrine()->getManager();
    $service=$em->getRepository("\App\Entity\Service");
        $frmpersonne= $this->createFormBuilder( $unePersonne)
                    ->add('nom')
                    ->add('postnom')
                    ->add('prenom')
                    ->add('username')
                    ->add('password',PasswordType::class)
                    ->add('services', EntityType::class, array(
                        'class'  => Service::class,
                        'choice_label' => 'designation'
                            ))
                     ->add('signature')
                    ->getForm();
                   
                    $frmpersonne->handleRequest($request);
                    if( $frmpersonne->isSubmitted() &&  $frmpersonne->isValid()){
                        if($em->getRepository("\App\Entity\Personne")->findOneBy(array('nom'=>$unePersonne->getNom(), 'postnom'=>$unePersonne->getPostnom(), 'prenom'=>$unePersonne->getPrenom(), 'services'=>$unePersonne->getServices()->getDesignation())) && $unePersonne->getId()==null){
                           echo '<h2 style="color:red;"> la Personne existe déjà </h2>';
                        }else{

                            $hash = $encoder->encodePassword($unePersonne, $unePersonne->getPassword());
                            $unePersonne->setPassword($hash);

                            $manager->persist($unePersonne);
                            $manager->flush(); 
                            //return $this->redirectToRoute('sgb_show', ['id' => $uneLigne->getId()]);
                        }
                    } 
                    
                    if($unePersonne->getId()==null ||  $service==null){
                        $lesPersonnes = $personneRepository->findAll();  
                    }else{
                        $lesPersonnes = $personneRepository->findByServices($unePersonne->getServices()->getId()); 
                    }
                          
            return $this->render('sgb/personne/personne.html.twig', [
            'formPersonne'=> $frmpersonne->createView(),
           'editMode'=> $unePersonne->getId()!==null,
            'lesPersonnes'=>$lesPersonnes
        ]);
     }


     /**
     * @Route("/sgb/personne/personne/{id}", name="personne_delete")
     */
    public function deletePersonne(Personne $personne = null, Request $request, ObjectManager $manager){
       
        if(!$personne){
       exit;
    }     
    try{
        $manager->remove($personne);
        $manager->flush(); 
        return $this->redirectToRoute('personne_create');  
    }catch(\Exception $e){
        return $this->redirectToRoute('personne_create');
    }
 }


   /**
     * @Route("/sgb/depense/depense", name="depenseEffectuer")
     */
    public function formDepense(Depense $unedepense = null, Request $request){
        if($this->getUser()===null) {              
            return $this->redirectToRoute('user_login');
           }
        if(!$unedepense){
            $unedepense= new Depense();
        }
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
   
    $userServ = $this->getUser()->getServices();
    $user=$this->getUser();
        $frmDepense= $this->createFormBuilder( $unedepense)
                    ->add('libele')
                    ->add('montantdepense')
                    ->add('utilisateurdepense', EntityType::class, array(
                        'class'  => Personne::class,
                        'query_builder'=>function(EntityRepository $er){
                            // Service
                         if( $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE') ){
                            return $er->createQueryBuilder('u')
                                        ->where('u.services=:id')
                                        ->setParameter('id',$this->getUser()->getServices());
                          } else{
                                        return $er->createQueryBuilder('u');
                                    }
                                        
                                        
                        },
                        'choice_label'=>'nom'
                    ))
                    ->getForm();
       
                    $frmDepense->handleRequest($request);

                    $em = $this->getDoctrine()->getManager();
             
                    if($service=='*'){
                        $queryDepense= $em->createQuery('SELECT d as mesdep, round(sum(d.montantdetail),2) as sommedepense 
                    FROM   App\Entity\Detaildepense d 
                    LEFT JOIN d.lignebudgetdepense p 
                    WHERE p.anneebudgetprevision=:anneebudgetselect 
                    AND d.createAt BETWEEN :debut 
                    AND :fin 
                    GROUP BY d.lignebudgetdepense
                    ORDER BY p.service, d.createAt  DESC');
                       $queryDepense->setParameters(array('anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
                    }else{
                        $queryDepense= $em->createQuery('SELECT d as mesdep, round(sum(d.montantdetail),2) as sommedepense 
                    FROM   App\Entity\Detaildepense d 
                    LEFT JOIN d.lignebudgetdepense p 
                    WHERE p.service=:userservice
                    AND p.anneebudgetprevision=:anneebudgetselect 
                    AND d.createAt BETWEEN :debut 
                    AND :fin 
                    GROUP BY d.lignebudgetdepense
                    ORDER BY d.createAt DESC');

                    $queryDepense->setParameters(array('userservice' => $service, 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
                   

                    }
                    
                    $queryDepenseGlobale = $queryDepense->getResult();

                

                    $queryRecette = $em->createQuery('SELECT rr as mesrecettes, round(sum(rr.montantrecette),2) as montantrecette, pp FROM  App\Entity\Recette rr JOIN rr.lignebudgetrecette pp  WHERE rr.utilisateur =:user AND pp.service=:userservice group by pp.id');
                    $queryRecette->setParameters(array('user'=> $user, 'userservice' => $userServ));
                    $queryRecetteGlobale = $queryRecette->getResult();
            
                    
                           
            return $this->render('sgb/depense/depense.html.twig',['frmDepense' =>  $frmDepense->createView(),
            'queryRecetteGlobale'=>$queryRecetteGlobale,
            'queryDepenseGlobale'=>$queryDepenseGlobale,
            ]);
     }


    /**
     * @Route("/sgb/prevision/new", name="sgb_prevision")
     * @Route("/sgb/prevision/{id}/edit", name="prevision_edit")
     */
    public function prevision(Recette $recette=null, Session $session, Request $request, Previsionbudget $prevision=null,  ObjectManager $manager){
        
        if($this->getUser()===null) {              
            return $this->redirectToRoute('user_login');
           }
      if(!$prevision){
        $prevision = new Previsionbudget();
     }
    $em = $this->getDoctrine()->getManager();
    //Creation de variable de session pour les parametres des requêtes
    // Année budgetaire
    if($request->request->get('annees')!==null && $request->request->get('annees') <> $session->get('anneeselect') ){
        $session->set('anneeselect',$request->request->get('annees') );
    }
    $anneebudgetselect =  $session->get('anneeselect');

     // Catégorie
    if($request->request->get('categorie')!==null && $request->request->get('categorie') <> $session->get('categorieselect') ){
        $session->set('categorieselect',$request->request->get('categorie') );
       }
    $categorie= $session->get('categorieselect');
        // Service if user for service then use is service only
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

    //$userServ = $this->getUser()->getServices()->getDesignation();
    $user=$this->getUser();
    
        $formPrevision = $this->createFormBuilder($prevision)
        ->add('sousrubrique', EntityType::class, array(
                    'class'  => Sousrubrique::class,
                    'choice_label' => 'nom',
                    'label'=>'Sous Rubrique'
        ))
       ->add('anneebudgetprevision', EntityType::class, array(
            'class'  => Anneebudgetaire::class,
            'data' => $em->getRepository(Anneebudgetaire::class)->find($anneebudgetselect),
            'choice_label' => 'anneebudget',
            'label'=>'Année budgetaire',
            'attr'=>['readyonly'=>
                true]

        ))
    
       ->add('iscentraliser', ChoiceType::class,[
            'choices'=>array(
                'Centraliser'=>true,
                'Decentraliser'=>false,
                ),
            'expanded'=> false,
            'label'=> 'Centraliser ou Decentraliser',
        ])
        ->add('isValideted', ChoiceType::class,[
            'choices'=>array(
                ""=>false,
                'Valider'=>true,
                'Non valider'=>false,
            ),
            'label'=> 'Déjà valider',
        ])
        ->add('montantprevision', NumberType::class, array(
            'label'=> 'Montant',
        )

        )

        ->add('service', EntityType::class, array(
            'class'  => Service::class,
            'data' =>  $em->getRepository(Service::class)->find($service),
            'choice_label' => 'designation',
        ))
       
       ->add('lignebudgetprevision', EntityType::class, array(
                'class'  => LigneBudgetaire::class,
                'placeholder'=>'Choisissez une ligne',
                'query_builder'=>function(EntityRepository $er) use ( $categorie){
                    return $er->createQueryBuilder('u')
                                ->where('u.categorieLigne=:thisCat')
                                ->setParameter('thisCat', $categorie)
                                ->orderBy('u.intituleLigne', 'ASC');
                },
                'label'=>'Ligne budgetaire prevision',
                'choice_label'=>'intituleLigne'))
  
       ->getForm();
      
     $formPrevision->handleRequest($request);
                   // $formPrevision;

                   if($service==="*"){
                   $queryLigneRecetteParService= $em->createQuery(
                    '
                     SELECT
                            r.nom,
                            s.designation,
                            l.intituleLigne,
                            l.categorieLigne,
                            a.anneebudget,
                            p.id,
                            p.montantprevision,
                            p.isValideted
                    FROM
                       
                            App\Entity\Previsionbudget p
                            LEFT JOIN App\Entity\SousRubrique r WITH p.sousrubrique = r.id
                            LEFT JOIN  App\Entity\Service s WITH p.service = s.id
                            LEFT JOIN  App\Entity\LigneBudgetaire l WITH p.lignebudgetprevision = l.id
                            LEFT JOIN  App\Entity\Anneebudgetaire a WITH p.anneebudgetprevision = a.id
                    WHERE
                            l.categorieLigne= :catLigne AND p.anneebudgetprevision = :anneeprev
                    ORDER BY s.designation ASC
                  
                    '
                     )
                     ->setParameter('catLigne', $categorie )
                     ->setParameter('anneeprev', $anneebudgetselect);
                     $resultatLigneParService = $queryLigneRecetteParService->execute(); 

                     $queryLigneRecetteParServiceGraphic= $em->createQuery(
                        '
                         SELECT
                                l.intituleLigne,
                                SUM( p.montantprevision) as montantprevision
                         FROM
                           
                                App\Entity\Previsionbudget p
                                LEFT JOIN  App\Entity\Service s WITH p.service = s.id
                                LEFT JOIN  App\Entity\LigneBudgetaire l WITH p.lignebudgetprevision = l.id
                                LEFT JOIN  App\Entity\Anneebudgetaire a WITH p.anneebudgetprevision = a.id
                        WHERE
                                l.categorieLigne= :catLigne AND p.anneebudgetprevision = :anneeprev
                        Group BY l.id 
                      
                        '
                         )
                         ->setParameter('catLigne', $categorie )
                         ->setParameter('anneeprev', $anneebudgetselect);
                         $resultatLigneParServiceGraphic = $queryLigneRecetteParServiceGraphic->execute(); 
                     
                    }else{
                            $queryLigneRecetteParService= $em->createQuery(
                            '
                            SELECT
                                    r.nom,
                                    s.designation,
                                    l.intituleLigne,
                                    l.categorieLigne,
                                    a.anneebudget,
                                    p.id,
                                    p.montantprevision,
                                    p.isValideted
                            FROM
           
                                    App\Entity\Previsionbudget p
                                    LEFT JOIN App\Entity\SousRubrique r WITH p.sousrubrique = r.id
                                    LEFT JOIN  App\Entity\Service s WITH p.service = s.id
                                    LEFT JOIN  App\Entity\LigneBudgetaire l WITH p.lignebudgetprevision = l.id
                                    LEFT JOIN  App\Entity\Anneebudgetaire a WITH p.anneebudgetprevision = a.id
                            WHERE
                                    p.service= :serviceuser AND l.categorieLigne= :catLigne AND p.anneebudgetprevision = :anneeprev
                            '
                             )->setParameter('serviceuser',  $service )
                             ->setParameter('catLigne', $categorie )
                             ->setParameter('anneeprev', $anneebudgetselect);
                             $resultatLigneParService = $queryLigneRecetteParService->execute(); 
                             $resultatLigneParServiceGraphic =$resultatLigneParService ;
                    }

                    if( $formPrevision->isSubmitted() &&  $formPrevision->isValid()){
                        if($prevision->getService()==null && $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE')){
                            $prevision->setService($user->getServices());
                         }
                         if($prevision->getIsValideted()==null && $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE')){
                            $prevision->setIsValideted(false);
                        
                        }

                        if($this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE')){
                            if($em->getRepository("\App\Entity\Previsionbudget")->findOneBy(
                                array('service'=>$prevision->getService(), 
                                'anneebudgetprevision'=>$prevision->getAnneebudgetprevision(), 
                                'lignebudgetprevision'=>$prevision->getLignebudgetprevision()) 
                                ) && $prevision->getId()==null){
                                    echo '<h5 style="color:red;"> la prevision existe déjà </h5>';
                            }else{
                                $manager->persist($prevision);
                                $recettePrevision = $em->createQuery('
                                SELECT r
                                FROM  App\Entity\Recette r 
                                WHERE r.lignebudgetrecette=:ligne');
                                $recettePrevision->setParameters(array('ligne'=>$prevision->getId()));
                                $recettePrev = $recettePrevision->getResult();
                                $manager->flush();
                                return $this->redirectToRoute('sgb_prevision'); 
                            }
                        }else{
                                if($em->getRepository("\App\Entity\Previsionbudget")->findOneBy(
                                    array('service'=>$prevision->getService(), 
                                    'anneebudgetprevision'=>$prevision->getAnneebudgetprevision(), 
                                    'lignebudgetprevision'=>$prevision->getLignebudgetprevision(), 
                                    'isValideted'=>$prevision->getIsValideted()) 
                                    ) && $prevision->getId()==null){
                                    echo '<h5 style="color:red;"> la prevision existe déjà </h5>';
                                }else{
                                    $manager->persist($prevision);
                                    $manager->flush();

                                 
                                    if($prevision->getLignebudgetprevision()->getCategorieLigne()=="Recette"){

                                        if(!$em->getRepository(Recette::class)->findByLignebudgetrecette($prevision)){
                                            if(!$recette){
                                                $recette = new Recette();
                                            }
                                            $recette->setMontantrecette(0);
                                            $recette->setCreateAt(new \DateTime());
                                            $recette->setUtilisateur($this->getUser());
                                            $recette->setLignebudgetrecette($prevision);
                                            $manager->persist($recette);
                                            $manager->flush();
                                        }        
                                    
                                        }
                                    return $this->redirectToRoute('sgb_prevision'); 
                                }
                        }
                    }
                   
        return $this->render('sgb/prevision/prevision.html.twig', [
                         'formPrevision'=>$formPrevision->createView(),
                         'previsionsGraphic'=>$resultatLigneParServiceGraphic,
                         'previsions'=>$resultatLigneParService,
                       ]);
       
    }

/**
     * @Route("/sgb/prevision/prevision/{id}/delete", name="delete_prevision")
     */
    public function deleteprevision(Previsionbudget $prevision = null, Request $request, ObjectManager $manager){
        if(!$prevision){ 
          exit;
       } 
                       try{
                           $manager->remove($prevision);
                           $manager->flush(); 
                           return $this->redirectToRoute('sgb_prevision');  
                       }catch(\Exception $e){
                           return $this->redirectToRoute('sgb_prevision');  
                       }
   }
    

    /**
     * @Route("/sgb/recette/recette", name="recette_create")
     *  @Route("/sgb/recette/recette/{id}/edit", name="recette_edit")
     */
    public function recette( RecetteRepository $recetterepository, Recette $recette=null, Request $request, ObjectManager $manager){
       
        if($this->getUser()===null) {              
            return $this->redirectToRoute('user_login');
           }
           
            if(!$recette){
                $recette= new Recette(); 
            }
            $em = $this->getDoctrine()->getManager();
            $idServiceOfUser=$this->getUser()->getServices()->getId();
            $idUser=$this->getUser();
           
       
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

            $formRecette= $this->createFormBuilder($recette)
                            ->add('libelle')
                            ->add('montantrecette', NumberType::class, [
                                'label'=>'Montant'
                            ])                           
                            ->add('description')
                            ->add('createAt', DateType::class, array(
                                'widget' => 'single_text',
                                // this is actually the default format for single_text
                                'format' => 'yyyy-MM-dd',
                                'label'=>'Date'
                            )
                            )

                                ->add('codeJournaux', EntityType::class, array(
                                   
                                    'class'  => CompteJournaux::class,
                                    'placeholder' => 'Choix journal',
                                    'required' => false,
                                    'empty_data' => null,
                                    'choice_label' => 'intitule',
                                    'label'=>'code Journaux' 
                        
                                ))

                            ->add('utilisateur', EntityType::class, array(
                                'class'  => Personne::class,
                                'query_builder'=>function(EntityRepository $er){
                                    return $er->createQueryBuilder('u')
                                                ->where('u.id=:id')
                                                ->setParameter('id',$this->getUser()->getId());
                                },
                                'choice_label'=>'nom'
                                
                                ))
                                ->add('lignebudgetrecette', EntityType::class, array(
                                    'class'=>Previsionbudget::class,
                                    'query_builder'=>function(EntityRepository $er)use ($anneebudgetselect, $service) {
                                        
                                        if( $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE') ){
                               
                                                    return $er->createQueryBuilder('p') 
                                                    ->select("p, l")
                                                    ->join("p.lignebudgetprevision", 'l')
                                                    ->join("p.anneebudgetprevision", 'a')
                                                    ->where("p.iscentraliser=false AND p.service=:userservice AND l.categorieLigne = :larecette AND a.id = :annnebudget")
                                                    ->setParameter('userservice',$service)
                                                    ->setParameter('larecette','Recette')
                                                    ->setParameter('annnebudget', $anneebudgetselect);
                                            }else{
                                                if($service=='*'){
                                                    return $er->createQueryBuilder('p') 
                                                                ->select("p, l")
                                                                ->join("p.lignebudgetprevision", 'l')
                                                                ->join("p.anneebudgetprevision", 'a')
                                                                ->where("l.categorieLigne = :larecette AND a.id = :annnebudget")
                                                                ->orderBy('p.service')
                                                                ->setParameter('larecette','Recette')
                                                                ->setParameter('annnebudget', $anneebudgetselect);
                                                            }else{
                                                                return $er->createQueryBuilder('p') 
                                                                ->select("p, l")
                                                                ->join("p.lignebudgetprevision", 'l')
                                                                ->join("p.anneebudgetprevision", 'a')
                                                                ->where("p.service=:userservice AND l.categorieLigne = :larecette AND a.id = :annnebudget")
                                                                ->orderBy('p.service')
                                                                ->setParameter('userservice',$service)
                                                                ->setParameter('larecette','Recette')
                                                                ->setParameter('annnebudget', $anneebudgetselect);
                                                            }

                                            }
                                                },
                                                    'choice_label'=> function( Previsionbudget $previsionbudget) {
                                                        return   $previsionbudget->getLignebudgetprevision()->getIntituleLigne()."/(". $previsionbudget->getService()->getDesignation() .")";
                        
                                                     
                                                }
                                                    ,
                                                    'label'=>'Ligne budgetaire recette'
                                                    )) 
                                                    ->add('sauvegarder', SubmitType::class,[
                                                        'label'=>'Sauvegarder'
                                                    ])  
                                                    ->getForm();
                             
                            $formRecette->handleRequest($request);
                            if($service=='*'){   
                                $queryRecette = $em->createQuery('SELECT r as mesrecettes, sum(r.montantrecette) as montantrecette, p FROM  App\Entity\Recette r JOIN r.lignebudgetrecette p  WHERE  r.montantrecette > 0 AND  p.anneebudgetprevision=:anneebudgetselect AND r.createAt BETWEEN :debut AND :fin group by p.id order by p.service');
                                $queryRecette->setParameters(array('anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
                        
                            }else{
                                $queryRecette = $em->createQuery('SELECT r as mesrecettes, sum(r.montantrecette) as montantrecette, p FROM  App\Entity\Recette r JOIN r.lignebudgetrecette p  WHERE r.montantrecette > 0 AND p.service=:userservice AND p.anneebudgetprevision=:anneebudgetselect AND r.createAt BETWEEN :debut AND :fin group by p.id');
                                $queryRecette->setParameters(array('userservice' =>$service, 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
                        
                            }
                        $queryRecetteGlobale = $queryRecette->getResult();
                        
                            if( $formRecette->isSubmitted() &&  $formRecette->isValid()){
                               
                                if($em->getRepository("\App\Entity\Recette")->findOneBy(
                                    array('lignebudgetrecette'=>$recette->getLignebudgetrecette(), 
                                    'montantrecette'=>$recette->getMontantrecette(),
                                    'createAt'=>$recette->getCreateAt(),
                                    'libelle'=>$recette->getLibelle(),
                                    'description'=>$recette->getDescription()
                                ) 
                                    )&& $recette->getId()==null){
                                        echo '<h2 style="color:red;"> la recette existe déjà </h2>';
                                    }else{


                                        $manager->persist($recette);
                                        $manager->flush();
                                        if($recette->getCodeJournaux()!==null){
                                            $caisseCentrale = new CaisseCentrale();
                                            $caisseCentrale->setDateEntree($recette->getCreateAt());
                                            $caisseCentrale->setMontantEntre($recette->getMontantrecette());
                                            $caisseCentrale->setRecette($recette);
                                            $manager->persist($caisseCentrale);
                                            $manager->flush();
                                        }
                                        return $this->redirectToRoute('recette_create');
        
                                    }
                            }
                            $serviceuser=$this->getUser()->getServices()->getId();

                            $isReadOnly = $em->createQuery('SELECT ca.isReadonly  as readOnlyUser 
                                                    FROM  App\Entity\ConfigSgb ca') ;
                                     $resultatIsReadOnly  =     $isReadOnly->getResult(); 
        return $this->render('sgb/recette/recette.html.twig',[
            
            'formRecette'=>$formRecette->createView(), 'planDeTresoreries'=> $queryRecetteGlobale , 'resultatIsReadOnly'=> $resultatIsReadOnly
        ]);
    }
/**
 * @Route("/sgb/recette/detailRecette/{id}/new", name="detail_recette")
 * @Route("/sgb/recette/detailRecette/{id}/edit", name="edit_recette")
 */
public function detailRecette(Recette $recette=null, Request $request, ObjectManager $manager, CaisseCentrale $caisseCentrale=null){

    $em = $this->getDoctrine()->getManager();
    $session = $request->getSession();
    if($recette){
        $caisseCentrale=$em->getRepository(CaisseCentrale::class)->findOneBy(['recette' => $recette]);
    }

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

   
    $formDetailRecette= $this->createFormBuilder($recette)
    ->add('libelle')
    ->add('montantrecette', NumberType::class, [
        'label'=>'Montant'
    ] )                           
    ->add('description')
    ->add('createAt', DateType::class, array(
        'widget' => 'single_text',
        // this is actually the default format for single_text
        'format' => 'yyyy-MM-dd',
        'label'=>'Date'
    ))
    ->add('utilisateur', EntityType::class, array(
        'class'  => Personne::class,
        'query_builder'=>function(EntityRepository $er){
            return $er->createQueryBuilder('u')
                        ->where('u.id=:id')
                        ->setParameter('id',$this->getUser()->getId());
        },
        'choice_label'=>'nom'
        
        ))
        ->add('codeJournaux', EntityType::class, array(
            'class'  => CompteJournaux::class,
            'placeholder' => 'Choix journal',
            'required' => false,
            'empty_data' => null,
            'choice_label' => 'intitule',
            'label'=>'code Journaux' 

        ))
        ->add('lignebudgetrecette', EntityType::class, array(
            'class'=>Previsionbudget::class,
            'query_builder'=>function(EntityRepository $er)use ($anneebudgetselect, $service) {
            if( $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE') ){
                            
                return $er->createQueryBuilder('p') 
                ->select("p, l")
                ->join("p.lignebudgetprevision", 'l')
                ->join("p.anneebudgetprevision", 'a')
                ->where("p.iscentraliser=false AND p.service=:userservice AND l.categorieLigne = :larecette AND a.id = :annnebudget")
                ->setParameter('userservice',$service)
                ->setParameter('larecette','Recette')
                ->setParameter('annnebudget', $anneebudgetselect);
            }else{
                if($service==="*"){   
                return $er->createQueryBuilder('p') 
                            ->select("p, l")
                            ->join("p.lignebudgetprevision", 'l')
                            ->join("p.anneebudgetprevision", 'a')
                            ->where("l.categorieLigne = :larecette AND a.id = :annnebudget")
                            ->setParameter('larecette','Recette')
                            ->setParameter('annnebudget', $anneebudgetselect);
                }else{
                    return $er->createQueryBuilder('p') 
                    ->select("p, l")
                    ->join("p.lignebudgetprevision", 'l')
                    ->join("p.anneebudgetprevision", 'a')
                    ->where("p.service=:userservice AND l.categorieLigne = :larecette AND a.id = :annnebudget")
                    ->setParameter('userservice',$service)
                    ->setParameter('larecette','Recette')
                    ->setParameter('annnebudget', $anneebudgetselect);
                }
            }
                        },
                            'choice_label'=>'lignebudgetprevision.intituleLigne',
                            'label'=>'Recette',
                            )) 
                            ->add('sauvegarder', SubmitType::class,[
                                'label'=>'Sauvegarder'
                            ])  
                            ->getForm();
                            $formDetailRecette->handleRequest($request);
                            if( $formDetailRecette->isSubmitted() &&  $formDetailRecette->isValid()){
                            if($em->getRepository("\App\Entity\Recette")->findOneBy(
                                array('lignebudgetrecette'=>$recette->getLignebudgetrecette(), 
                                    'montantrecette'=>$recette->getMontantrecette(),
                                    'createAt'=>$recette->getCreateAt(),
                                    'libelle'=>$recette->getLibelle(),
                                    'description'=>$recette->getDescription()
                                ) 
                              
                                )){
                                    echo '<h2 style="color:red;"> la recette existe déjà </h2>';
                                }else{
                                    $manager->persist($recette);
                                    $manager->flush();

                                    if($recette->getCodeJournaux()!==null){

                                       if($em->getRepository(CaisseCentrale::class)->findByRecette($recette)==null){
                                        $caisseCentrale = new CaisseCentrale();
                                        }
                                      
                                        $caisseCentrale->setDateEntree($recette->getCreateAt());
                                        $caisseCentrale->setMontantEntre($recette->getMontantrecette());
                                        $caisseCentrale->setRecette($recette);
                                        $manager->persist($caisseCentrale);
                                        $manager->flush();
                                    }
                                    return $this->redirectToRoute('detail_recette', array('id'=>$recette->getId() ));
    
                                }
                            }
    $queryDetailRecetteGraphic = $em->createQuery(
        "
        SELECT 
            r.id,
            r.libelle, 
            SUM(r.montantrecette) as  montantrecette, 
            date_format(r.createAt, '%M %Y') as createAt,
            u.nom,
            l.intituleLigne
        FROM  
            App\Entity\Recette r
            LEFT JOIN  App\Entity\Personne u WITH r.utilisateur = u.id 
            LEFT JOIN App\Entity\Previsionbudget p WITH r.lignebudgetrecette = p.id 
            LEFT JOIN  App\Entity\LigneBudgetaire l WITH p.lignebudgetprevision = l.id
            WHERE r.createAt >=:debut  AND r.createAt <=:fin
            AND p.anneebudgetprevision=:anneebudgetselect AND r.lignebudgetrecette=:idPrevision GROUP BY createAt HAVING SUM(r.montantrecette) > 0  ORDER BY r.createAt ASC");
    $queryDetailRecetteGraphic->setParameters(array('anneebudgetselect'=> $anneebudgetselect, 'idPrevision'=>$recette->getLignebudgetrecette(), 'debut'=> $datedebut, 'fin'=> $datefin ));
    $resultatDetailRecetteGraphic = $queryDetailRecetteGraphic->execute();
    $queryDetailRecette = $em->createQuery(
        '
        SELECT 
            r.id,
            r.libelle, 
            r.montantrecette, 
            r.createAt,
            r.description,
            u.nom,
            l.intituleLigne
        FROM  
            App\Entity\Recette r
            LEFT JOIN  App\Entity\Personne u WITH r.utilisateur = u.id 
            LEFT JOIN App\Entity\Previsionbudget p WITH r.lignebudgetrecette = p.id 
            LEFT JOIN  App\Entity\LigneBudgetaire l WITH p.lignebudgetprevision = l.id
            WHERE r.createAt >=:debut  AND r.createAt <=:fin
            AND p.anneebudgetprevision=:anneebudgetselect AND r.lignebudgetrecette=:idPrevision');
    $queryDetailRecette->setParameters(array('anneebudgetselect'=> $anneebudgetselect, 'idPrevision'=>$recette->getLignebudgetrecette(), 'debut'=> $datedebut, 'fin'=> $datefin ));
    $resultatDetailRecette = $queryDetailRecette->execute();
    $isReadOnly = $em->createQuery('SELECT ca.isReadonly  as readOnlyUser 
    FROM  App\Entity\ConfigSgb ca') ;
$resultatIsReadOnly  =     $isReadOnly->getResult(); 
    return $this->render('sgb/recette/detailRecette.html.twig',[
        'formDetailRecette'=>$formDetailRecette->createView(), 'resultatDetailRecetteGraphic'=> $resultatDetailRecetteGraphic, 'resultatDetailRecette'=> $resultatDetailRecette, 'resultatIsReadOnly'=>$resultatIsReadOnly
    ]);
}


    /**
     * @Route("/sgb/recette/detailRecette/{id}/delete", name="delete_recette")
     */
    public function deleteRecette(Recette $recette=null, Request $request, ObjectManager $manager, CaisseCentrale $caisseCentrale=null){
        if(!$recette){ 
          exit;
       } 
       try{
            $em = $this->getDoctrine()->getManager();
            if($recette->getCodeJournaux()!==null){
                $caisseCentrale=$em->getRepository(CaisseCentrale::class)->findOneBy(['recette' => $recette]);
                $manager->remove($caisseCentrale);
                $manager->flush();
            }
                      
                           $manager->remove($recette);
                           $manager->flush(); 
                           return $this->redirectToRoute('recette_create');  
                       }catch(\Exception $e){
                           return $this->redirectToRoute('recette_create');  
                       }
   }
    


/**
 * @Route("/sgb/depense/planTresorerie", name="planTresorerie")
 * @Route("/sgb/depense/planTresorerie/{id}/edit", name="planTresorerie_edit")
 * @Route("/sgb/depense/planTresorerie/{error}/error", name="electparamPlanError")
 */
public function planTresorerie($error=null, Plantresorerie $plantresorerie=null, Request $request, ObjectManager $manager){
    if($this->getUser()===null) {              
        return $this->redirectToRoute('user_login');
       }
      
        if($error){
            $error="Les jours depensent une semaine";
        }
        if(!$plantresorerie){
            $plantresorerie= new Plantresorerie();
        }
    
     
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

    if($this->dateSemaine($datedebut ,  $datefin )){
        return $this->redirectToRoute('selectparamPlantresoError', array(
            'error'=>'error'
        ));
    }

    
    $em = $this->getDoctrine()->getManager();
    $formPlanTresorerie= $this->createFormBuilder( $plantresorerie)
    ->add('lignebudget', EntityType::class, array(
        'class'  => Previsionbudget::class,
        'placeholder'=>'Choisissez une ligne budgétaire',
        'query_builder'=>function(EntityRepository $er)use ($service, $anneebudgetselect){
            if( $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE')  ){
            return $er->createQueryBuilder('p')
                        ->join('p.lignebudgetprevision', 'l')
                        ->where('p.service=:ceService')
                        ->andWhere('p.iscentraliser=false')
                        ->andWhere('p.isValideted=true')
                        ->andWhere('p.anneebudgetprevision=:annee')
                        ->setParameter('ceService', $service)
                        ->setParameter('annee', $anneebudgetselect);
                    }else{
                        return $er->createQueryBuilder('p')
                        ->join('p.lignebudgetprevision', 'l')
                        ->where('p.service=:ceService')
                        ->andWhere('p.iscentraliser=false')
                        ->andWhere('p.isValideted=true')
                        ->andWhere('p.anneebudgetprevision=:annee')
                        ->setParameter('ceService', $service)
                        ->setParameter('annee', $anneebudgetselect);
                    }
                },
        'choice_label'=>function( Previsionbudget $previsionbudget) {
            
                return $previsionbudget->getLignebudgetprevision()->getIntituleLigne(). "  (".$previsionbudget->getLignebudgetprevision()->getCategorieLigne().")";
            },
        'label'=>'Compte',
    ))
    ->add('observation')
    
    ->add('besoin', NumberType::class, [
        'label'=>'Besoin'
    ] )
    ->add('realisation', NumberType::class, [
        'label'=>'Realisation',
        'required' => false
    ] ) 
    ->add('dateDebut', DateType::class, array(
        'widget' => 'single_text',
        // this is actually the default format for single_text
        'format' => 'yyyy-MM-dd',
        'label'=>'Date debut semaine'
    ))
    ->add('dateFin', DateType::class, array(
        'widget' => 'single_text',
        // this is actually the default format for single_text
        'format' => 'yyyy-MM-dd',
        'label'=>'Date fin semaine'
       
    ))
    ->add('valider', ChoiceType::class,[
        'choices'=>array(
            ""=>false,
            'Valider'=>true,
            'Non valider'=>false,
        ),
        'label'=> 'Déjà valider',
    ])
    ->getForm();  
 
    if($plantresorerie->getId()!==null && ($this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE'))){
        $session->set('valideEtat',$em->getRepository(Plantresorerie::class)->find($plantresorerie)->getValider());
    }
        $formPlanTresorerie->handleRequest($request);
    if( $formPlanTresorerie->isSubmitted() &&  $formPlanTresorerie->isValid()){
      
        if($em->getRepository("\App\Entity\Plantresorerie")->findOneBy(
            array('lignebudget'=>$plantresorerie->getLignebudget(), 
                    'dateDebut'=>$plantresorerie->getDatedebut(), 
            )       )&& $plantresorerie->getId()==null){
                echo '<h5 style="color:red;"> ce plan de tresorerie existe déjà </h5>';
            
            }else{
                if($this->dateSemaine($plantresorerie->getDatedebut()->format('Y-m-d H:i:s'),  
                                        $plantresorerie->getDatefin()->format('Y-m-d H:i:s')
                                    )){
                                    return $this->redirectToRoute('electparamPlanError', array(
                        'error'=>'error'
                    ));
                }
                if($plantresorerie->getId()!==null && $this->isGranted('ROLE_COMPTE_FAC') or $this->isGranted('ROLE_CHEF_SERVICE') && $em->getRepository(Plantresorerie::class)->find($plantresorerie)->getValider() !== $plantresorerie->getValider()   ){
                    $plantresorerie->setValider( $session->get('valideEtat'));
                }

                   $manager->persist($plantresorerie);
                   $manager->flush(); 
                  
                   return $this->redirectToRoute('planTresorerie');
        }
     }
        
    


    if($service=='*'){
        $queryPlanTresorRecette = $em->createQuery('SELECT
         pt.id,
         l.intituleLigne, 
         s.designation,
         pt.besoin,
         pt.realisation,
         pt.Observation,
        l.compteLigne
        FROM  App\Entity\plantresorerie pt
        JOIN pt.lignebudget p
        JOIN p.lignebudgetprevision l
        WHERE p.anneebudgetprevision=:anneebudgetselect 
        AND l.categorieLigne=:categorie
        AND pt.dateDebut >=:debut  
        AND pt.dateFin <=:fin ORDER BY s.designation ASC');
        $queryPlanTresorRecette->setParameters(array('categorie'=>'Recette', 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
       
        $queryPlanTresorDepense= $em->createQuery('SELECT
        pt.id,
        l.intituleLigne, 
        s.designation,
        pt.besoin,
        pt.realisation,
        pt.Observation,
        l.compteLigne
       FROM  App\Entity\plantresorerie pt
       JOIN pt.lignebudget p
       JOIN p.lignebudgetprevision l
       WHERE p.anneebudgetprevision=:anneebudgetselect 
       AND l.categorieLigne=:categorie
       AND pt.dateDebut >=:debut  
       AND pt.dateFin <=:fin ORDER BY s.designation ASC');
        $queryPlanTresorDepense->setParameters(array('categorie'=>'Depense', 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
}else{
        $queryPlanTresorRecette = $em->createQuery('SELECT
            pt.id,
            l.intituleLigne, 
            s.designation,
            pt.besoin,
            pt.realisation,
            pt.Observation,
            l.compteLigne,
            pt.valider
        FROM  App\Entity\plantresorerie pt
        JOIN pt.lignebudget p
        JOIN p.service s 
        JOIN p.lignebudgetprevision l
        WHERE p.anneebudgetprevision=:anneebudgetselect 
        AND p.service=:userservice
        AND l.categorieLigne=:categorie
        AND pt.dateDebut >=:debut  
        AND pt.dateFin <=:fin');
        $queryPlanTresorRecette->setParameters(array('categorie'=>'Recette', 'userservice' =>$service, 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));

        $queryPlanTresorDepense= $em->createQuery('SELECT
        pt.id,
        l.intituleLigne, 
        s.designation,
        pt.besoin,
        pt.realisation,
        pt.Observation,
        l.compteLigne,
        pt.valider
        FROM  App\Entity\plantresorerie pt
        JOIN pt.lignebudget p
        JOIN p.service s 
        JOIN p.lignebudgetprevision l
        WHERE p.anneebudgetprevision=:anneebudgetselect 
        AND p.service=:userservice
        AND l.categorieLigne=:categorie
        AND pt.dateDebut >=:debut  
        AND pt.dateFin <=:fin ORDER BY s.designation ASC');
        $queryPlanTresorDepense->setParameters(array('categorie'=>'Depense', 'userservice' =>$service,'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
        }
    
        $planTresorRecette = $queryPlanTresorRecette->getResult();
        $planTresorDepense = $queryPlanTresorDepense->getResult();
      

            
    return $this->render('sgb/depense/planTresorerie.html.twig',[
        'formPlanTresorerie'=>$formPlanTresorerie->createView(),
        'error'=>$error,
        'planTresorRecette'=>$planTresorRecette,
        'planTresorDepense'=>$planTresorDepense

        
]);
}

 /**
  * @Route("/sgb/depense/planTresorerie/print", name="print_plantresor")
  */
public function pdfPrinter( Request $request){

    // Configure Dompdf according to your needs
    $pdfOptions = new Options();
    $pdfOptions->set('defaultFont', 'Arial');
    
    // Instantiate Dompdf with our options
    $dompdf = new Dompdf($pdfOptions);
    
    // Retrieve the HTML generated in our twig file
    $html = $this->renderView('sgb/depense/planTresorerie.html.twig', [
        'title' => "Welcome to our PDF Test"
    ]);
    
    // Load HTML to Dompdf
    $dompdf->loadHtml($html);
    
    // (Optional) Setup the paper size and orientation 'portrait' or 'portrait'
    $dompdf->setPaper('A4', 'portrait');

    // Render the HTML as PDF
    $dompdf->render();

    // Output the generated PDF to Browser (force download)
    $dompdf->stream("planTresorerie.pdf", [
        "Attachment" => false
    ]);
    
}

    /**
     * @Route("/sgb/depense/planTresorerie/{id}/delete", name="delete_plantresor")
     */
    public function deletePlanTresor(PlanTresorerie $planTresorerie = null, Request $request, ObjectManager $manager){
        if(!$planTresorerie){ 
          exit;
       } 
                       try{
                           $manager->remove($planTresorerie);
                           $manager->flush(); 
                           return $this->redirectToRoute('planTresorerie');  
                       }catch(\Exception $e){
                           return $this->redirectToRoute('planTresorerie');  
                       }
   }
    

function dateSemaine($datedebut, $datefin)
{
    $datetime1 = date_create($datedebut);
    $datetime2 = date_create($datefin);
    $interval = $datetime2->diff($datetime1);
    return $interval->days>6? true : false;
}

/**
 * @Route("/sgb/depense/selectparamPlantresorerie", name="selectparamPlantresorerie")
 * @Route("/sgb/depense/selectparamPlantresorerie/{error}", name="selectparamPlantresoError")
 */
public function setParamPlantresorerie($error=null){
    if($error){
        $error="Les nombres des jours depensent une semaine";
     }
    
    $em = $this->getDoctrine()->getManager();
    $annees = $em->getRepository(Anneebudgetaire::class)->findAll();
    $services = $em->getRepository(Service::class)->findAll();
    return $this->render('sgb/depense/selectparamPlantresorerie.html.twig',
    [
        'annees'=>$annees,
        'services'=> $services,
        'error'=>$error
    ]);
}


/**
 * @Route("/sgb/recette/selectparameters", name="selectparameters")
 */
public function fillYears(Request $request){
    
    //$session = new Session();
   
    $em = $this->getDoctrine()->getManager();
    $annees = $em->getRepository(Anneebudgetaire::class)->findAll();
    $services = $em->getRepository(Service::class)->findAll();
    return $this->render('sgb/recette/selectparameters.html.twig',[
                    'annees'=>$annees,
                    'services'=> $services
    ]);
}


/**
 * @Route("/sgb/depense/selectdepense", name="selectdepense")
 */
public function fillforDepenseYears(Request $request){
    
    $em = $this->getDoctrine()->getManager();
    $annees = $em->getRepository(Anneebudgetaire::class)->findAll();
    $services = $em->getRepository(Service::class)->findAll();
    return $this->render('sgb/depense/selectdepense.html.twig',[
                    'annees'=>$annees,
                    'services'=> $services
    ]);
}

/**
 * @Route("/sgb/depense/selectparametersdepense", name="selectparametersdepense")
 */
public function fillYearsDepense(Request $request){
    
   // $session = new Session();
   
    $em = $this->getDoctrine()->getManager();
    $annees = $em->getRepository(Anneebudgetaire::class)->findAll();
    $services = $em->getRepository(Service::class)->findAll();
    return $this->render('sgb/depense/selectparametersdepense.html.twig',[
                    'annees'=>$annees,
                    'services'=> $services
    ]);
}

/**
 * @Route("/sgb/prevision/selectparprev", name="selectparPrev")
 */
public function fillYearsPrev(){

   // $session = new Session();

    $em = $this->getDoctrine()->getManager();
    $annees = $em->getRepository(Anneebudgetaire::class)->findAll();
    $services = $em->getRepository(Service::class)->findAll();
    return $this->render('sgb/prevision/selectparaprev.html.twig',[
                    'annees'=>$annees,
                    'services'=> $services
    ]);
}

 
    /**
     * @Route("/resources/images/delete.png", name="delete_button")
     */
    public function setDelete_button(){

        return $this->render('/resources/images/delete.png');
    }
    /**
     * @Route("/resources/images/edit.png", name="edit_button")
     */
    public function setEdit_button(){

        return $this->render('/resources/images/edit.png');
    }
/**
     * @Route("/resources/images/personnes.png", name="personne_button")
     */
    public function setPersonne_button(){

        return $this->render('/resources/images/delete.png');
    }

    /**
     * @Route("/resources/images/add.jpg", name="add_button")
     */
    public function setAjout_button(){

        return $this->render('/resources/images/add.jpg');
    }
/**
     * @Route("/resources/images/detail.png", name="detail_button")
     */
    public function detail_button(){

        return $this->render('/resources/images/detail.png');
    }


     
   
}

