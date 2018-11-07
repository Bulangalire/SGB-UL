<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\LigneBudgetaire;
use App\Entity\Service;
use App\Entity\Personne;
use App\Repository\ServiceRepository;
use App\Repository\PersonneRepository;
use App\Repository\LigneBudgetaireRepository;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\TextareaType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\IntType;

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
        //Remplacer par l'injection de dependence en parametre
        //$repository = $this->getDoctrine()->getRepository(LigneBudgetaire::class);
        // Trouver une Ligne portant cette Intitule
        //$ligneBgt = $repository->findOneByIntituleLigne("Salaire Agent n°3");
        
        // Trouver une Ligne numero 9
        //$ligneBgt = $repository->find(9);
        
        // Trouver toutes les lignes portant cette Intitule
       // $ligneRecette = $repository->findByCategorieLigne("Recette");
        //$ligneDepense = $repository->findByCategorieLigne("Depense");
       dump($request);
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
    dump($request);
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
         
                        $manager->remove($uneLigne);
                        $manager->flush(); 
                        return $this->redirectToRoute('lb_overview');    
                  
    }



    /**
     * @Route("/sgb/LigneBudgetaire/new", name="sgb_create")
     * @Route("/sgb/LigneBudgetaire/{id}/edit", name="sgb_edit")
     */
    public function form(LigneBudgetaire $uneLigne = null, Request $request, ObjectManager $manager){
       
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
            //dump($request);
            // Simplifions ça avec formBuilder de symfony
            /*  if($request->request->count()>0){
                $uneLigne= new LigneBudgetaire();
                $uneLigne->setIntituleLigne($request->request->get('intitule'))
                        ->setCompteLigne($request->request->get('Compte'))
                        ->setCategorieLigne($request->request->get('Categorie'));
                
                        $manager->persist($uneLigne);
                        $manager->flush();
                        return $this->redirectToRoute('sgb_show', ['id'=> $uneLigne->getId()]);  
                    }  */
                       

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
                        if($em->getRepository("\App\Entity\Service")->findOneBy(array('designation'=>$unservice->getDesignation(), 'emailservice'=>$unservice->getEmailservice(), 'description'=>$unservice->getDescription())) && $unservice->getId()!==null){
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
    public function formpersonne($id=null, PersonneRepository $personneRepository,ServiceRepository $serviceeRepository, Personne $unePersonne = null, Request $request, ObjectManager $manager){
       
        if(!$unePersonne){
        $unePersonne= new Personne();
    }
    $em = $this->getDoctrine()->getManager();
        $frmpersonne= $this->createFormBuilder( $unePersonne)
                    ->add('nom')
                    ->add('postnom')
                    ->add('prenom')
                    ->add('login')
                    ->add('password')
                    ->add('signature')
                    ->add('services', ChoiceType::class, array(
                        'choices'  => array($serviceeRepository->findAll())
                        )) 
                    ->getForm();
                   
                    $frmpersonne->handleRequest($request);
                    if( $frmpersonne->isSubmitted() &&  $frmpersonne->isValid()){
                        if($em->getRepository("\App\Entity\Personne")->findOneBy(array('nom'=>$unePersonne->getNom(), 'postnom'=>$unePersonne->getPostnom(), 'prenom'=>$unePersonne->getPrenom(), 'services'=>$unePersonne->getServices()->getDesignation())) && $unePersonne->getId()!==null){
                           echo '<h2 style="color:red;"> la Personne existe déjà </h2>';
                        }else{
                            $manager->persist($unePersonne);
                            $manager->flush(); 
                            //return $this->redirectToRoute('sgb_show', ['id' => $uneLigne->getId()]);
                        }
                    } 
                    if($unePersonne->getId()==null){
                        $lesPersonnes = $personneRepository->findAll();  
                    }else{
                        if($id!=null){
                        $lesPersonnes = $personneRepository->findByServices($serviceeRepository->findById($id)); 
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
     * @Route("/bootstrap.css", name="boots")
     */
    public function bootstrap(){

        return $this->render('bootstrap.css');
    }
   
}
