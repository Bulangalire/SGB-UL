<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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
     * @ORM\ManyToOne(targetEntity="App\Entity\Previsionbudget")
     */
    private $lignebudgetrecette;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Personne")
     */
    private $utilisateur;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $description;

    public function __construct()
    {
        $this->lignebudgetrecette = new ArrayCollection();
        $this->utilisateur = new ArrayCollection();
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

    /**
     * @return Collection|Previsionbudget[]
     */
    public function getLignebudgetrecette(): Collection
    {
        return $this->lignebudgetrecette;
    }

    public function addLignebudgetrecette(Previsionbudget $lignebudgetrecette): self
    {
        if (!$this->lignebudgetrecette->contains($lignebudgetrecette)) {
            $this->lignebudgetrecette[] = $lignebudgetrecette;
        }

        return $this;
    }

    public function removeLignebudgetrecette(Previsionbudget $lignebudgetrecette): self
    {
        if ($this->lignebudgetrecette->contains($lignebudgetrecette)) {
            $this->lignebudgetrecette->removeElement($lignebudgetrecette);
        }

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

    /**
     * @return Collection|Personne[]
     */
    public function getUtilisateur(): Collection
    {
        return $this->utilisateur;
    }

    public function addUtilisateur(Personne $utilisateur): self
    {
        if (!$this->utilisateur->contains($utilisateur)) {
            $this->utilisateur[] = $utilisateur;
        }

        return $this;
    }

    public function removeUtilisateur(Personne $utilisateur): self
    {
        if ($this->utilisateur->contains($utilisateur)) {
            $this->utilisateur->removeElement($utilisateur);
        }

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
}
