<?php

namespace App\Entity;
 
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass="App\Repository\LigneBudgetaireRepository")
 */
class LigneBudgetaire
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer") 
     */
    private $id;

    /** 
     * @ORM\Column(type="string", length=255)
     * @Assert\Length(min=5, max=255, minMessage="Intitule trop court") 
     */
    private $intituleLigne;

 

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $categorieLigne;

       /**
     * @ORM\Column(type="text", nullable=true)
     */
    private $description;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $compteLigne;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIntituleLigne(): ?string
    {
        return $this->intituleLigne;
    }

    public function setIntituleLigne(string $intituleLigne): self
    {
        $this->intituleLigne = $intituleLigne;

        return $this;
    }

 

    public function getCategorieLigne(): ?string
    {
        return $this->categorieLigne;
    }

    public function setCategorieLigne(string $categorieLigne): self
    {
        $this->categorieLigne = $categorieLigne;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getCompteLigne(): ?string
    {
        return $this->compteLigne;
    }

    public function setCompteLigne(string $compteLigne): self
    {
        $this->compteLigne = $compteLigne;

        return $this;
    }
}
