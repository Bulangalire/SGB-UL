<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CaisseCentraleRepository")
 */
class CaisseCentrale
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $dateEntree;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $dateSortie;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $montantSortie;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $montantEntre;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Detaildepense", cascade={"persist", "remove"})
     */
    private $depense;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Recette", cascade={"persist", "remove"})
     */
    private $recette;

  

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateEntree(): ?\DateTimeInterface
    {
        return $this->dateEntree;
    }

    public function setDateEntree(?\DateTimeInterface $dateEntree): self
    {
        $this->dateEntree = $dateEntree;

        return $this;
    }

    public function getDateSortie(): ?\DateTimeInterface
    {
        return $this->dateSortie;
    }

    public function setDateSortie(?\DateTimeInterface $dateSortie): self
    {
        $this->dateSortie = $dateSortie;

        return $this;
    }

    public function getMontantSortie(): ?float
    {
        return $this->montantSortie;
    }

    public function setMontantSortie(?float $montantSortie): self
    {
        $this->montantSortie = $montantSortie;

        return $this;
    }

    public function getMontantEntre(): ?float
    {
        return $this->montantEntre;
    }

    public function setMontantEntre(?float $montantEntre): self
    {
        $this->montantEntre = $montantEntre;

        return $this;
    }

    public function getDepense(): ?Detaildepense
    {
        return $this->depense;
    }

    public function setDepense(?Detaildepense $depense): self
    {
        $this->depense = $depense;

        return $this;
    }

    public function getRecette(): ?Recette
    {
        return $this->recette;
    }

    

    public function setRecette(?Recette $recette): self
    {
        $this->recette = $recette;

        return $this;
    }
}
