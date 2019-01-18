<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PlantresorerieRepository")
 */
class Plantresorerie
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Previsionbudget")
     * @ORM\JoinColumn(nullable=false)
     */
    private $lignebudget;

    /**
     * @ORM\Column(type="float")
     */
    private $besoin;

    /**
     * @ORM\Column(type="float", nullable=true)
     */
    private $realisation;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $Observation;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Service")
     * @ORM\JoinColumn(nullable=false)
     */
    private $faculte;

    /**
     * @ORM\Column(type="datetime")
     */
    private $dateDebut;

    /**
     * @ORM\Column(type="datetime")
     */
    private $dateFin;

    /**
     * @ORM\Column(type="boolean")
     */
    private $valider;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLignebudget(): ?Previsionbudget
    {
        return $this->lignebudget;
    }

    public function setLignebudget(?Previsionbudget $lignebudget): self
    {
        $this->lignebudget = $lignebudget;

        return $this;
    }

    public function getBesoin(): ?float
    {
        return $this->besoin;
    }

    public function setBesoin(float $besoin): self
    {
        $this->besoin = $besoin;

        return $this;
    }

    public function getRealisation(): ?float
    {
        return $this->realisation;
    }

    public function setRealisation(?float $realisation): self
    {
        $this->realisation = $realisation;

        return $this;
    }

    public function getObservation(): ?string
    {
        return $this->Observation;
    }

    public function setObservation(?string $Observation): self
    {
        $this->Observation = $Observation;

        return $this;
    }

    public function getFaculte(): ?Service
    {
        return $this->faculte;
    }

    public function setFaculte(?Service $faculte): self
    {
        $this->faculte = $faculte;

        return $this;
    }

    public function getDateDebut(): ?\DateTimeInterface
    {
        return $this->dateDebut;
    }

    public function setDateDebut(\DateTimeInterface $dateDebut): self
    {
        $this->dateDebut = $dateDebut;

        return $this;
    }

    public function getDateFin(): ?\DateTimeInterface
    {
        return $this->dateFin;
    }

    public function setDateFin(\DateTimeInterface $dateFin): self
    {
        $this->dateFin = $dateFin;

        return $this;
    }

    public function getValider(): ?bool
    {
        return $this->valider;
    }

    public function setValider(bool $valider): self
    {
        $this->valider = $valider;

        return $this;
    }
}
