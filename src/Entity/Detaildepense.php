<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DetaildepenseRepository")
 */
class Detaildepense
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
    private $montantdetail;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $modepayement;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $descriptiondetaildepense;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Previsionbudget" , inversedBy="depenseUtiliseesEnDepenses")
     * @ORM\JoinColumn(nullable=false)
     */
    private $lignebudgetdepense;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Previsionbudget" , inversedBy="recettesUtiliseesEnDepenses")
     */
    private $lignebudgetsource;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Depense", inversedBy="detaildepenses")
     * @ORM\JoinColumn(nullable=false)
     */
    private $depenseId;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $createAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\CompteJournaux" , inversedBy="depenses")
     */
    private $caisseCentrale;

     public function getId(): ?int
    {
        return $this->id;
    }

    public function getMontantdetail(): ?float
    {
        return $this->montantdetail;
    }

    public function setMontantdetail(float $montantdetail): self
    {
        $this->montantdetail = $montantdetail;

        return $this;
    }

    public function getModepayement(): ?string
    {
        return $this->modepayement;
    }

    public function setModepayement(string $modepayement): self
    {
        $this->modepayement = $modepayement;

        return $this;
    }

    public function getDescriptiondetaildepense(): ?string
    {
        return $this->descriptiondetaildepense;
    }

    public function setDescriptiondetaildepense(?string $descriptiondetaildepense): self
    {
        $this->descriptiondetaildepense = $descriptiondetaildepense;

        return $this;
    }

    public function getLignebudgetdepense(): ?Previsionbudget
    {
        return $this->lignebudgetdepense;
    }

    public function setLignebudgetdepense(?Previsionbudget $lignebudgetdepense): self
    {
        $this->lignebudgetdepense = $lignebudgetdepense;

        return $this;
    }

    public function getLignebudgetsource(): ?Previsionbudget
    {
        return $this->lignebudgetsource;
    }

    public function setLignebudgetsource(?Previsionbudget $lignebudgetsource): self
    {
        $this->lignebudgetsource = $lignebudgetsource;
        return $this;
    }

    public function getDepenseId(): ?Depense
    {
        return $this->depenseId;
    }

    public function setDepenseId(?Depense $depenseId): self
    {
        $this->depenseId = $depenseId;

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

    public function getCaisseCentrale(): ?CompteJournaux
    {
        return $this->caisseCentrale;
    }

    public function setCaisseCentrale(?CompteJournaux $caisseCentrale): self
    {
        $this->caisseCentrale = $caisseCentrale;

        return $this;
    }
    

    

    
}
