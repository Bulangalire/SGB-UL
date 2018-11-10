<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PrevisionbudgetRepository")
 * @UniqueEntity(
 * fields={"anneebudgetprevision", "service", "lignebudgetprevision"},
 * message="Cette ligne a été déjà  prevue dans ce service pour l'année budgetaire selectionée !!!"
 */
class Previsionbudget
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="float")
     */
    private $montantprevision;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Anneebudgetaire", inversedBy="lesprevisions")
     * @ORM\JoinColumn(nullable=false)
     */
    private $anneebudgetprevision;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Service")
     * @ORM\JoinColumn(nullable=false)
     */
    private $service;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\LigneBudgetaire")
     * @ORM\JoinColumn(nullable=false)
     */
    private $lignebudgetprevision;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $iscentraliser;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SousRubrique")
     */
    private $sousrubrique;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMontantprevision(): ?float
    {
        return $this->montantprevision;
    }

    public function setMontantprevision(float $montantprevision): self
    {
        $this->montantprevision = $montantprevision;

        return $this;
    }

    public function getAnneebudgetprevision(): ?Anneebudgetaire
    {
        return $this->anneebudgetprevision;
    }

    public function setAnneebudgetprevision(?Anneebudgetaire $anneebudgetprevision): self
    {
        $this->anneebudgetprevision = $anneebudgetprevision;

        return $this;
    }

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): self
    {
        $this->service = $service;

        return $this;
    }

    public function getLignebudgetprevision(): ?LigneBudgetaire
    {
        return $this->lignebudgetprevision;
    }

    public function setLignebudgetprevision(?LigneBudgetaire $lignebudgetprevision): self
    {
        $this->lignebudgetprevision = $lignebudgetprevision;

        return $this;
    }

    public function getIscentraliser(): ?bool
    {
        return $this->iscentraliser;
    }

    public function setIscentraliser(?bool $iscentraliser): self
    {
        $this->iscentraliser = $iscentraliser;

        return $this;
    }

    public function getSousrubrique(): ?SousRubrique
    {
        return $this->sousrubrique;
    }

    public function setSousrubrique(?SousRubrique $sousrubrique): self
    {
        $this->sousrubrique = $sousrubrique;

        return $this;
    }
}
