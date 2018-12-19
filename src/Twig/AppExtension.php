<?php 
namespace App\Twig;

use App\Entity\Nuts;
use Twig\TwigFunction;
use Doctrine\ORM\EntityManager;
use Twig\Extension\AbstractExtension;
use Symfony\Bridge\Doctrine\RegistryInterface;

class AppExtension extends AbstractExtension
{
    protected $doctrine;

    
    public function __construct(RegistryInterface $doctrine)
    {
        $this->doctrine = $doctrine;
       
    }
    public function getFunctions()
    {
        return array(
            new TwigFunction('converssion', array($this, 'converter')),  
            new TwigFunction('IsLeapYear', array($this, 'IsLeapYear')),
            new TwigFunction('is_authorized', array($this, 'is_authorized')),
            new TwigFunction('chart', array($this, 'chartFilter')),
            new TwigFunction('chartData', array($this, 'chartFilterData')),
        );
    }


    public function is_authorized( $user, $function) 
    {
      $em = $this->doctrine->getManager();
       $UserRoles= array();
       $UserRoles=$user->getRoles();
       $isExits=false;
       $lesFonctionsAttribuees=array();
       foreach( $UserRoles as $role){
            $SGBRole = $em->getRepository("\App\Entity\SGBRole")->findByNomrole($role);
            $SGBFunctionDuRoles=$em->getRepository("\App\Entity\SGBFunctionsRole")->findByRole($SGBRole);

           foreach( $SGBFunctionDuRoles as $uneFunction){
                 $lesFonctionsAttribuees[]  = $uneFunction->getFunction()->getNomfonction();
                 if($uneFunction->getFunction()->getNomfonction()===$function){
                  $isExits = true;
                break 2;
            }
            }
            //for($i=0; $i<count($SGBRole); $i++){
             //$SGBRole[0]->sGBFunctionsRoles();
           // break;
       // }
       }

       return  $isExits;
    }


    public function converter($valeur, $symbole): string{

        $obj = new Nuts(floatval($valeur), $symbole);
        $enLettres = $obj->convert("fr-FR");
       // $nb  = $obj->getFormated(" ", ",");
    
        return $enLettres;
    }

    
    public function IsLeapYear($Year) {
        return ((($Year & 3) == 0) && (($Year % 100 != 0) || ($Year % 400 == 0)));
       }



 

    public function chartFilter($items, $key)
    {
       // if($items[0]=0)
        $output = [];
        foreach ($items as $item) {
            if(array_key_exists($key, $item)) {
                $output[] = $item[$key];
            }   
        }    
        return json_encode($output);
    }
    public function chartFilterData($items, $key)
    {
        $output = [];
        foreach ($items as $item) {
            if(array_key_exists($key, $item)) {
                $output[] = $item[$key];
            }   
        }    
        return json_encode($output);
    }
       
    
}