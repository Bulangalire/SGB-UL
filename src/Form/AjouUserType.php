<?php

namespace App\Form;

use App\Entity\Personne;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use App\Entity\Service;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;

class AjouUserType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $service = new Service();
        $builder
            ->add('nom')
            ->add('postnom')
            ->add('prenom')
            ->add('password', PasswordType::class)
            ->add('passwordconfirm', PasswordType::class)
            ->add('username')
            ->add('signature')
            ->add('services', EntityType::class, array(
                'class'  => Service::class,
                'choice_label' => 'designation'
                    ));
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Personne::class,
        ]);
    }
}
