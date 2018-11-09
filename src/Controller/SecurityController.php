<?php

namespace App\Controller;

use App\Entity\Personne;

use App\Form\AjouUserType;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

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
     * @Route("/security/administration", name="admin")
     */
    public function admin()
    {
       
        $logedUser="David";
        return $this->render('security/administration.html.twig',['logedUser'=> $logedUser
        ]);
    }

    /**
     * @Route("/security/login", name="user_login")
     */
    public function login(){
        return $this->render('security/login.html.twig');

    }
    
    /**
     * @Route("/security/logout", name="user_logout")
     */
    public function logout(){    }
    
    
}
