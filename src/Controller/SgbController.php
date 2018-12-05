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
    public function formpersonne(UserPasswordEncoderInterface $encoder, $id=null, PersonneRepository $personneRepository, Personne $unePersonne = null, Request $request, ObjectManager $manager){
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
                    if($unePersonne->getId()==null && $id==null){
                        $lesPersonnes = $personneRepository->findAll();  
                    }else{
                        if($id!==null){
                        $lesPersonnes = $personneRepository->findByServices($service->findById($id)); 
                        }
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
     * @Route("/sgb/depense/depense/{id}", name="deletedepense")
     * @Route("/sgb/depense/depense/new", name="depense_create")
     * @Route("/sgb/depense/depense/{id}/edit", name="depense_edit")
     */
    public function formDepense(Depense $unedepense = null, Request $request){
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
                    ->getForm();
       
                    $frmDepense->handleRequest($request);

                    $em = $this->getDoctrine()->getManager();
             
                    $queryDepense= $em->createQuery('SELECT d as mesdep, sum(d.montantdetail) as sommedepense FROM   App\Entity\Detaildepense d JOIN d.lignebudgetsource p JOIN d.depenseId dd WHERE dd.utilisateurdepense =:user AND p.service=:userservice ORDER BY d.lignebudgetsource DESC');
                    $queryDepense->setParameters(array('user'=> $user, 'userservice' => $userServ));
                    $queryDepenseGlobale = $queryDepense->getResult();
                    $queryRecette = $em->createQuery('SELECT rr as mesrecettes, sum(rr.montantrecette) as montantrecette, pp FROM  App\Entity\Recette rr JOIN rr.lignebudgetrecette pp  WHERE rr.utilisateur =:user AND pp.service=:userservice');
                    $queryRecette->setParameters(array('user'=> $user, 'userservice' => $userServ));
                    $queryRecetteGlobale = $queryRecette->getResult();
                    for($i=0; $i<count($queryDepenseGlobale); $i++){

                    $fussion[] =  $queryDepenseGlobale[$i];
                }
                    if( $frmDepense->isSubmitted() &&  $frmDepense->isValid()){
                        
                    } 
                           
            return $this->render('sgb/depense/depense.html.twig',['frmDepense' =>  $frmDepense->createView(),
            'queryRecetteGlobale'=>$queryRecetteGlobale,
            'queryDepenseGlobale'=>$queryDepenseGlobale,
            ]);
     }


    /**
     * @Route("/sgb/prevision/new", name="sgb_prevision")
     * @Route("/sgb/prevision/{id}/edit", name="prevision_edit")
     */
    public function prevision(Session $session, Request $request, PersonneRepository $personneRepository,Previsionbudget $prevision=null,  ObjectManager $manager){
        
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

     // Service
     if($request->request->get('services')!==null && $request->request->get('services') <> $session->get('servicesselect') ){
        $session->set('servicesselect',$request->request->get('services') );
       }
    $service= $session->get('servicesselect');

    $userServ = $this->getUser()->getServices()->getDesignation();
    $user=$this->getUser();
    
        $formPrevision = $this->createFormBuilder($prevision)
        ->add('sousrubrique', EntityType::class, array(
                    'class'  => Sousrubrique::class,
                    'choice_label' => 'nom',
                    'label'=>'Sous Rubrique'
        ))
       ->add('anneebudgetprevision', EntityType::class, array(
            'class'  => Anneebudgetaire::class,
            'choice_label' => 'anneebudget'
        ))
    
       ->add('iscentraliser', ChoiceType::class,[
            'choices'=>array(
                'Centraliser'=>true,
                'Decentraliser'=>false,
                ),
            'expanded'=> false,
            'label'=> 'Centraliser ou Decentraliser',
        ])
        ->add('montantprevision')

        ->add('service', EntityType::class, array(
            'class'  => Service::class,
            'data' =>  $em->getRepository(Service::class)->find($service)->getDesignation(),
            'choice_attr' => function()use($user) {
                $disabled = false;
                $disabled=$user->getServices()->getDesignation()!='NTIC';
                return $disabled ? ['disabled' => 'disabled'] : [];
            },
            'choice_label' => 'designation',
        ))
       
       ->add('lignebudgetprevision', EntityType::class, array(
                'class'  => LigneBudgetaire::class,
                'placeholder'=>'Choisissez une ligne',
                'query_builder'=>function(EntityRepository $er) use ( $categorie){
                    return $er->createQueryBuilder('u')
                                ->where('u.categorieLigne=:thisCat')
                                ->setParameter('thisCat', $categorie);
                },
                'choice_label'=>'intituleLigne'))
  
       ->getForm();
     $formPrevision->handleRequest($request);
                   // $formPrevision;
                    if( $formPrevision->isSubmitted() &&  $formPrevision->isValid()){
                        if($em->getRepository("\App\Entity\Previsionbudget")->findOneBy(
                            array('service'=>$prevision->getService(), 
                            'anneebudgetprevision'=>$prevision->getAnneebudgetprevision(), 
                            'lignebudgetprevision'=>$prevision->getLignebudgetprevision()) 
                            )&& $prevision->getId()==null){
                                echo '<h2 style="color:red;"> la prevision existe déjà </h2>';
                            }else{
                                if($prevision->getService()==null && $user->getServices() !=="NTIC" ){
                                    $prevision->setService($user->getServices());
                                 }
                              
                                $manager->persist($prevision);
                                $manager->flush();

                            }
                    }
                    $previsions = $em->getRepository(Previsionbudget::class)->findAll();
                    
                   if($this->getUser()===null) {              
                    return $this->redirectToRoute('user_login');
                   }
                   //$serviceuser=$this->getUser()->getServices()->getId();
                    $queryLigneRecetteParService= $em->createQuery(
                        '
                        SELECT
                                    r.nom,
                                    s.designation,
                                    l.intituleLigne,
                                    l.categorieLigne,
                                    a.anneebudget,
                                    p.id,
                                    p.montantprevision
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
                   
        return $this->render('sgb/prevision/prevision.html.twig', [
                         'formPrevision'=>$formPrevision->createView(),
                         'previsions'=>$resultatLigneParService,
                       ]);
       
    }

/**
     * @Route("/sgb/prevision/prevision{id}/delete", name="delete_prevision")
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

            $formRecette= $this->createFormBuilder($recette)
                            ->add('libelle')
                            ->add('montantrecette')                            
                            ->add('description')
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
                                        
                                        if($service=='*'){
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
                                                },
                                                    'choice_label'=>'lignebudgetprevision.intituleLigne',
                                                    )) 
                                                    ->add('sauvegarder', SubmitType::class,[
                                                        'label'=>'Sauvegarder'
                                                    ])  
                                                    ->getForm();
                             
                            $formRecette->handleRequest($request);
                            if($service=='*'){   
                                $queryRecette = $em->createQuery('SELECT r as mesrecettes, sum(r.montantrecette) as montantrecette, p FROM  App\Entity\Recette r JOIN r.lignebudgetrecette p  WHERE p.anneebudgetprevision=:anneebudgetselect AND r.createAt BETWEEN :debut AND :fin group by p.lignebudgetprevision order by p.service');
                                $queryRecette->setParameters(array('anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
                        
                            }else{
                                $queryRecette = $em->createQuery('SELECT r as mesrecettes, sum(r.montantrecette) as montantrecette, p FROM  App\Entity\Recette r JOIN r.lignebudgetrecette p  WHERE p.service=:userservice AND p.anneebudgetprevision=:anneebudgetselect AND r.createAt BETWEEN :debut AND :fin group by p.lignebudgetprevision');
                                $queryRecette->setParameters(array('userservice' =>$service, 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
                        
                            }
                        $queryRecetteGlobale = $queryRecette->getResult();
                        
                            if( $formRecette->isSubmitted() &&  $formRecette->isValid()){
                               
                                if($em->getRepository("\App\Entity\Recette")->findOneBy(
                                    array('lignebudgetrecette'=>$recette->getLignebudgetrecette(), 
                                    'montantrecette'=>$recette->getMontantrecette() 
                                ) 
                                    )&& $recette->getId()==null){
                                        echo '<h2 style="color:red;"> la recette existe déjà </h2>';
                                    }else{
                                       
                                        $recette->setCreateAt(new \Datetime());
                                        $manager->persist($recette);
                                        $manager->flush();
                                        return $this->redirectToRoute('recette_create');
        
                                    }
                            }
                            $serviceuser=$this->getUser()->getServices()->getId();


        return $this->render('sgb/recette/recette.html.twig',[
            
            'formRecette'=>$formRecette->createView(), 'planDeTresoreries'=> $queryRecetteGlobale 
        ]);
    }
/**
 * @Route("/sgb/recette/detailRecette/{id}/new", name="detail_recette")
 * @Route("/sgb/recette/detailRecette/{id}", name="edit_recette")
 */
public function detailRecette(Recette $recette=null, Request $request, ObjectManager $manager){

    $session = $request->getSession();
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
    $em = $this->getDoctrine()->getManager();
    $formDetailRecette= $this->createFormBuilder($recette)
    ->add('libelle')
    ->add('montantrecette')                            
    ->add('description')
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
                if($service=='*'){   
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
                        },
                            'choice_label'=>'lignebudgetprevision.intituleLigne',
                            )) 
                            ->add('sauvegarder', SubmitType::class,[
                                'label'=>'Sauvegarder'
                            ])  
                            ->getForm();
                            $formDetailRecette->handleRequest($request);
                            if( $formDetailRecette->isSubmitted() &&  $formDetailRecette->isValid()){
                            if($em->getRepository("\App\Entity\Recette")->findOneBy(
                                array('lignebudgetrecette'=>$recette->getLignebudgetrecette(), 
                                'montantrecette'=>$recette->getMontantrecette() 
                            ) 
                                )){
                                    echo '<h2 style="color:red;"> la recette existe déjà </h2>';
                                }else{
                                   
                                    $recette->setCreateAt(new \Datetime());
                                    $manager->persist($recette);
                                    $manager->flush();
                                    return $this->redirectToRoute('detail_recette', array('id'=>$recette->getId() ));
    
                                }
                            }
    $queryDetailRecette = $em->createQuery('SELECT r as mesrecettes, p FROM  App\Entity\Recette r JOIN r.lignebudgetrecette p  WHERE p.anneebudgetprevision=:anneebudgetselect AND r.lignebudgetrecette=:idPrevision');
    $queryDetailRecette->setParameters(array('anneebudgetselect'=> $anneebudgetselect, 'idPrevision'=>$recette->getLignebudgetrecette() ));
    $resultatDetailRecette = $queryDetailRecette->getResult();

    dump($resultatDetailRecette);
    return $this->render('sgb/recette/detailRecette.html.twig',[
            
        'formDetailRecette'=>$formDetailRecette->createView(), 'resultatDetailRecette'=> $resultatDetailRecette 
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

