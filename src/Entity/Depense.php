<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DepenseRepository")
 */
class Depense
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
    private $libele;

    /**
     * @ORM\Column(type="float")
     */
    private $montantdepense;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createAt;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Personne")
     * @ORM\JoinColumn(nullable=false)
     */
    private $utilisateurdepense;

     public function getId(): ?int
    {
        return $this->id;
    }

    public function getLibele(): ?string
    {
        return $this->libele;
    }

    public function setLibele(string $libele): self
    {
        $this->libele = $libele;

        return $this;
    }

    public function getMontantdepense(): ?float
    {
        return $this->montantdepense;
    }

    public function setMontantdepense(float $montantdepense): self
    {
        $this->montantdepense = $montantdepense;

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
    
    public function getUtilisateurdepense(): ?Personne
    {
        return $this->utilisateurdepense;
    }

    public function setUtilisateurdepense(?Personne $utilisateurdepense): self
    {
        $this->utilisateurdepense = $utilisateurdepense;

        return $this;
    }
   
}
