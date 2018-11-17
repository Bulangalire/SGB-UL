<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\RecetteRepository")
 */
class Recette
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $libelle;

    /**
     * @ORM\Column(type="float")
     */
    private $montantrecette;



    /**
     * @ORM\Column(type="datetime")
     */
    private $createAt;

 

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $description;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Personne")
     * @ORM\JoinColumn(nullable=false)
     */
    private $utilisateur;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Previsionbudget", inversedBy="recettes")
     * @ORM\JoinColumn(nullable=false)
     */
    private $lignebudgetrecette;


    public function __construct(){
        $this->createAt= new \Datetime();
    }

   
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLibelle(): ?string
    {
        return $this->libelle;
    }

    public function setLibelle(?string $libelle): self
    {
        $this->libelle = $libelle;

        return $this;
    }

    public function getMontantrecette(): ?float
    {
        return $this->montantrecette;
    }

    public function setMontantrecette(float $montantrecette): self
    {
        $this->montantrecette = $montantrecette;

        return $this;
    }

    
    public function getCreateAt(): ?\DateTimeInterface
    {
        return $this->createAt;
    }

    public function setCreateAt(\DateTimeInterface $createAt): self
    {
        $this->createAt = $createAt;

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

    public function getUtilisateur(): ?Personne
    {
        return $this->utilisateur;
    }

    public function setUtilisateur(?Personne $utilisateur): self
    {
        $this->utilisateur = $utilisateur;

        return $this;
    }

    public function getLignebudgetrecette(): ?Previsionbudget
    {
        return $this->lignebudgetrecette;
    }

    public function setLignebudgetrecette(?Previsionbudget $lignebudgetrecette): self
    {
        $this->lignebudgetrecette = $lignebudgetrecette;

        return $this;
    }

   
   
}
