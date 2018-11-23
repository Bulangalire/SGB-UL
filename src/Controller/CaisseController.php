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



class CaisseController extends AbstractController{

    /**
     * @Route("/sgb/caisse/lesOP", name="servireOp")
     */
    public function getOpPaye(Session $session, Depense $unedepense = null, Request $request, ObjectManager $manager){
        if($this->getUser()===null) {              
            return $this->redirectToRoute('user_login');
           }
           $em = $this->getDoctrine()->getManager();
           $queryOPDejePaye = $em->createQuery('SELECT dop as lesdetails, sum(dop.montantdetail) as dejaPayer, p, d 
           FROM  App\Entity\Detaildepense dop 
           JOIN dop.depenseId d 
           JOIN dop.lignebudgetdepense p
           WHERE p.anneebudgetprevision=:anneebudgetselect 
           GROUP BY d.id 
           HAVING sum(dop.montantdetail) < d.montantdepense ');
          $queryOPDejePaye->setParameters(array('anneebudgetselect'=> 1));
          $queryListOpDejaPaye = $queryOPDejePaye->getResult();
          dump($queryListOpDejaPaye);
          // $queryRecette = $em->createQuery('SELECT r as mesrecettes, sum(r.montantrecette) as montantrecette, p FROM  App\Entity\Recette r JOIN r.lignebudgetrecette p  WHERE p.service=:userservice AND p.anneebudgetprevision=:anneebudgetselect AND r.createAt BETWEEN :debut AND :fin group by p.lignebudgetprevision');
          // $queryRecette->setParameters(array('userservice' =>$service, 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
          // $queryRecetteGlobale = $queryRecette->getResult();
          return $this->render('sgb/caisse/lesOp.html.twig',['queryListOpDejaPaye' => $queryListOpDejaPaye]);
        }
    
        
    /**
     * @Route("/sgb/caisse/decaisser", name="add_decaisser")
     * @Route("/sgb/caisse/decaisser/{id}", name="edit_decaisser")
     */
    public function getOpDecaisser($id=null, Session $session, Detaildepense $detaildepense = null, Request $request, ObjectManager $manager){
        if($this->getUser()===null) {              
            return $this->redirectToRoute('user_login');
           }
           if(!$detaildepense){
            $detaildepense= new Detaildepense();
           }
           $frmDecaisser = $this->createFormBuilder($detaildepense)
                              
                                        ->add('lignebudgetdepense', EntityType::class, array(
                                            'class'  => LigneBudgetaire::class,
                                            'placeholder'=>'Choisissez une ligne de depense',
                                            'query_builder'=>function(EntityRepository $er){
                                                return $er->createQueryBuilder('u')
                                                            ->where('u.categorieLigne=:thisCat')
                                                            ->setParameter('thisCat', 'Depense');
                                            },
                                            'choice_label'=>'intituleLigne'))
                                            ->add('lignebudgetsource', EntityType::class, array(
                                                'class'  => LigneBudgetaire::class,
                                                'placeholder'=>'Choisissez une ligne de Recette',
                                                'query_builder'=>function(EntityRepository $er){
                                                    return $er->createQueryBuilder('u')
                                                                ->where('u.categorieLigne=:thisCat')
                                                                ->setParameter('thisCat', 'Recette');
                                                },
                                                'choice_label'=>'intituleLigne'))
                                        
                                ->add('montantdetail')
                                ->add('descriptiondetaildepense')
                                ->getForm();
                                $frmDecaisser->handleRequest($request);
                                if( $frmDecaisser->isSubmitted() &&  $frmDecaisser->isValid()){
                                    $detaildepense->setDepenseId($id);



                                    $manager->persist($detaildepense);
                                    $manager->flush(); 
                                    return $this->redirectToRoute('add_decaisser');    
                                }         
                                $em = $this->getDoctrine()->getManager();
                                $queryOPDejePaye = $em->createQuery('SELECT dop as lesdetails, sum(dop.montantdetail) as dejaPayer, p, d 
                                FROM  App\Entity\Detaildepense dop 
                                JOIN dop.depenseId d 
                                JOIN dop.lignebudgetdepense p
                                WHERE p.anneebudgetprevision=:anneebudgetselect 
                                AND  d.id=:depense
                                HAVING sum(dop.montantdetail) < d.montantdepense ');
                               $queryOPDejePaye->setParameters(array('anneebudgetselect'=> 1, 'depense'=> 5));
                               $queryListOpDejaPaye = $queryOPDejePaye->getResult();
                               dump($queryListOpDejaPaye);
                               // $queryRecette = $em->createQuery('SELECT r as mesrecettes, sum(r.montantrecette) as montantrecette, p FROM  App\Entity\Recette r JOIN r.lignebudgetrecette p  WHERE p.service=:userservice AND p.anneebudgetprevision=:anneebudgetselect AND r.createAt BETWEEN :debut AND :fin group by p.lignebudgetprevision');
                               // $queryRecette->setParameters(array('userservice' =>$service, 'anneebudgetselect'=> $anneebudgetselect, 'debut'=> $datedebut, 'fin'=> $datefin));
                               // $queryRecetteGlobale = $queryRecette->getResult();
          return $this->render('sgb/caisse/decaisser.html.twig',[
            'frmDecaisser'=> $frmDecaisser->createView(),
            'editMode'=> $detaildepense->getId()!==null
          ]);
        }
    


}


    