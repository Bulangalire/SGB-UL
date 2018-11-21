<?php

namespace App\Entity;

use App\Entity\Personne;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

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

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Service", inversedBy="depenses")
     * @ORM\JoinColumn(nullable=true)
     */
    private $service;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Etatbesoin", mappedBy="depense", orphanRemoval=true)
     */
    private $etatbesoins;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $beneficiaire;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $chefDepartement;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $secGeneralConcerne;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $abOuDelegue;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $recteurOuDelegue;
    
    public function __construct(){
        $this->createAt= new \Datetime();
        $this->etatbesoins = new ArrayCollection();
    }

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

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): self
    {
        $this->service = $service;

        return $this;
    }

    /**
     * @return Collection|Etatbesoin[]
     */
    public function getEtatbesoins(): Collection
    {
        return $this->etatbesoins;
    }

    public function addEtatbesoin(Etatbesoin $etatbesoin): self
    {
        if (!$this->etatbesoins->contains($etatbesoin)) {
            $this->etatbesoins[] = $etatbesoin;
            $etatbesoin->setDepense($this);
        }

        return $this;
    }

    public function removeEtatbesoin(Etatbesoin $etatbesoin): self
    {
        if ($this->etatbesoins->contains($etatbesoin)) {
            $this->etatbesoins->removeElement($etatbesoin);
            // set the owning side to null (unless already changed)
            if ($etatbesoin->getDepense() === $this) {
                $etatbesoin->setDepense(null);
            }
        }

        return $this;
    }

    public function getBeneficiaire(): ?string
    {
        return $this->beneficiaire;
    }

    public function setBeneficiaire(?string $beneficiaire): self
    {
        $this->beneficiaire = $beneficiaire;

        return $this;
    }

    public function getChefDepartement(): ?string
    {
        return $this->chefDepartement;
    }

    public function setChefDepartement(?string $chefDepartement): self
    {
        $this->chefDepartement = $chefDepartement;

        return $this;
    }

    public function getSecGeneralConcerne(): ?string
    {
        return $this->secGeneralConcerne;
    }

    public function setSecGeneralConcerne(?string $secGeneralConcerne): self
    {
        $this->secGeneralConcerne = $secGeneralConcerne;

        return $this;
    }

    public function getAbOuDelegue(): ?string
    {
        return $this->abOuDelegue;
    }

    public function setAbOuDelegue(?string $abOuDelegue): self
    {
        $this->abOuDelegue = $abOuDelegue;

        return $this;
    }

    public function getRecteurOuDelegue(): ?string
    {
        return $this->recteurOuDelegue;
    }

    public function setRecteurOuDelegue(?string $recteurOuDelegue): self
    {
        $this->recteurOuDelegue = $recteurOuDelegue;

        return $this;
    }
   
}
