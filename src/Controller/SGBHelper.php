<?php

namespace App\Controller;


use App\Entity\LigneBudgetaire;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class SGBHelper implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        // Tells the dispatcher that you want to listen on the form.pre_set_data
        // event and that the preSetData method should be called.
        return array(FormEvents::PRE_SET_DATA => 'preSetData');
    }

    public function preSetData(FormEvent $event)
    {
        $lignebudgetaire = $event->getData();
        $form = $event->getForm();

        if (!$lignebudgetaire || null === $lignebudgetaire->getId()) {

            $form->add('lignebudgetprevision', EntityType::class, array(
                'class'  => LigneBudgetaire::class,
                'placeholder'=>'Choisissez une ligne',
                'query_builder'=>function(EntityRepository $er){
                    return $er->createQueryBuilder('u')
                                ->where('u.categorieLigne=:thisCat')
                                ->setParameter('thisCat',$form->getDate()->getCategorieLine());
                },
                'choice_label'=>'intituleLigne'
            ));
        }
    }
}