<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CompteJournauxRepository")
 */
class CompteJournaux
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $code;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $intitule;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Recette", mappedBy="codeJournaux")
     */
    private $recettes;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Detaildepense", mappedBy="caisseCentrale")
     */
    private $depenses;


    public function __construct()
    {
        $this->recettes = new ArrayCollection();
        $this->depenses = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;

        return $this;
    }

    public function getIntitule(): ?string
    {
        return $this->intitule;
    }

    public function setIntitule(string $intitule): self
    {
        $this->intitule = $intitule;

        return $this;
    }

   

    public function getRecettes():?float
    {
        $totalRecette=0;
        foreach($this->recettes as $uneRecette)
        $totalRecette+= $uneRecette->getMontantrecette();
        return $totalRecette;
    }

    public function getDepenses():?float
    {
        $totalDepense=0;
       //if(is_array($this->depenses)){
         foreach($this->depenses as $uneDepense)
          $totalDepense += $uneDepense->getMontantdetail();
            return $totalDepense;
       //}else{
       //   return  $totalDepense=0;
       // }
       
    }
   
    public function getLeSolde()
    {
        return $this->getRecettes() - $this->getDepenses();
    }

}
