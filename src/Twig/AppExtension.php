<?php 
namespace App\Twig;

use App\Entity\Nuts;
use Twig\TwigFunction;
use Twig\Extension\AbstractExtension;

class AppExtension extends AbstractExtension
{
    public function getFunctions()
    {
        return array(
            new TwigFunction('converssion', array($this, 'converter')),
            new TwigFunction('frmNum', array($this, 'formatterNum'))
        );
    }

    public function converter($valeur, $symbole): string{

        $obj = new Nuts(floatval($valeur), $symbole);
        $enLettres = $obj->convert("fr-FR");
       // $nb  = $obj->getFormated(" ", ",");
    
        return $enLettres;
    }
    public function formatterNum($valeur): float{

        $obj = new Nuts(floatval($valeur),"USD");
        $enLettres = $obj->convert("fr-FR");
        $nb  = $obj->getFormated(" ", ",");
    
        return $nb;
    }
    
}