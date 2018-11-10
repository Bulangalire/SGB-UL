<?php

namespace App\Controller;

use App\Entity\Personne;
use App\Entity\Rubrique;
use App\Entity\SousRubrique;

use App\Form\AjouUserType;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;

class SecurityController extends AbstractController
{

    /**
     * @Route("/security/utilisateur", name="useradd")
     */
    public function inscription(Request $request, ObjectManager $manager,
    UserPasswordEncoderInterface $encoder )
    {
        $personne = new Personne();
        $formUser = $this->createForm(AjouUserType::class, $personne);
        $formUser->handleRequest($request);
        if( $formUser->isSubmitted() &&  $formUser->isValid()){
            $hash = $encoder->encodePassword($personne, $personne->getPassword());
            $personne->setPassword($hash);
         $manager->persist($personne);
         $manager->flush();
         return $this->redirectToRoute('user_login');
        }
        return $this->render('security/utilisateur.html.twig',['formUser'=> $formUser->createView()
        ]);
    }

   
    /**
     * @Route("/security/login", name="user_login")
     */
    public function login(){
        return $this->render('security/login.html.twig');

    }
    
   
    
    /**
     * @Route("/security/administration", name="admin_formimportrubrique")
     */
    public function importRubrique(Request $request){
        $formrubrique = $this->createFormBuilder(null)
                 ->add('radio', ChoiceType::class,[
                          'choices'=>array(
                            'Rubrique'=>'Rubrique',
                            'SousRubrique'=>'SousRubrique',
                            'LigneBudgetaire' =>'LigneBudgetaire',
                          'Personne'=>'Personne'),
                          'expanded'=> false,
                          'label'=> 'Importer des rubriques depuis Excel',
                 ])
                 ->add('Format_CVS', FileType::class)
                 ->getForm();
    
                 $formrubrique->handleRequest($request);
                 if( $formrubrique->isSubmitted() &&  $formrubrique->isValid()){

                     $file = $formrubrique['Format_CVS']->getData();
                     //$file=$_FILES['importfile']['tmp_name'];
                         $handle = fopen($file, "r");
                         $i=0;
                             while(($fileop = fgetcsv($handle,1000, ";")) !== false){
                                 $em = $this->getDoctrine()->getManager();
                                
                                if(!$formrubrique['radio']->getData()==null && $formrubrique['radio']->getData()=='Rubrique'){
                                 $rubrique = new Rubrique();
                                 $rubrique->setNom($fileop[1]);
                                
                                 $verif = $em->getRepository("\App\Entity\Rubrique")->findOneBy(array('nom'=>$fileop[1]));
                                 if($verif){
                                     echo 'la rubrique déjà existante';
                                    
                                 }else{
                                     $em = $this->getDoctrine()->getManager();
                                     $em->persist($rubrique);
                                     $em->flush();
                                     } 
                                  }elseif(!$formrubrique['radio']->getData()==null && $formrubrique['radio']->getData()=='SousRubrique'){

                                    $sousRubrique = new SousRubrique();
                                    $sousRubrique->setNom($fileop[0]);
                                    $sousRubrique->setRubrique($em->getRepository("\App\Entity\Rubrique")->find($fileop[1]));
                                   
                                    $verif = $em->getRepository("\App\Entity\SousRubrique")->findOneBy(array('nom'=>$fileop[0], 'rubrique'=>$fileop[1] ));
                                    if($verif){
                                        echo 'la sous rubrique déjà existante';
                                       
                                    }else{
                                        $em = $this->getDoctrine()->getManager();
                                        $em->persist($sousRubrique);
                                        $em->flush();
                                        } 
                                     }elseif(!$formrubrique['radio']->getData()==null && $formrubrique['radio']->getData()=='SousRubrique'){
   
                                     
                                  }
                            }
                             $request->getSession()->getFlashBag()->add('success', 'Liste enregistrée.');
                             return $this->redirect($this->generateUrl('admin_formimportrubrique'));
                 }
             return $this->render('security/administration.html.twig', [
         'formrubrique' => $formrubrique->createView()]); 
    }
     /**
     * @Route("/security/logout", name="user_logout")
     */
    public function logout(){    }
}
