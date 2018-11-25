<?php

namespace App\Entity;

use App\Entity\Personne;
use App\Entity\Previsionbudget;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass="App\Repository\DepenseRepository")
 * @UniqueEntity(
 * fields={"numOp"},
 * message="Ce numéro est déjà Utiliser !"
 * )
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
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\Length(min=2, minMessage="Votre libelé doit être comprehenssive.")
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

    /**
     * @ORM\Column(type="datetime")
     */
    private $dateEmission;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $visaCompotable;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $modePaiement;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $numOp;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Service")
     */
    private $service;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Previsionbudget")
     */
    private $ligneBudgetaire;

     /**
     * @ORM\OneToMany(targetEntity="App\Entity\Detaildepense", mappedBy="depenseId")
     */
    private $detaildepenses;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $autoriserChefService;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $autoriserSG;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $autoriserAB;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $autoriserRecteur;
 
      public function __construct(){
        $this->createAt= new \Datetime();
        $this->etatbesoins = new ArrayCollection();
        $this->detaildepenses = new ArrayCollection();
      
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

    public function getDateEmission(): ?\DateTimeInterface
    {
        return $this->dateEmission;
    }

    public function setDateEmission(\DateTimeInterface $dateEmission): self
    {
        $this->dateEmission = $dateEmission;

        return $this;
    }

    public function getVisaCompotable(): ?string
    {
        return $this->visaCompotable;
    }

    public function setVisaCompotable(?string $visaCompotable): self
    {
        $this->visaCompotable = $visaCompotable;

        return $this;
    }

    public function getModePaiement(): ?string
    {
        return $this->modePaiement;
    }

    public function setModePaiement(?string $modePaiement): self
    {
        $this->modePaiement = $modePaiement;

        return $this;
    }

    public function getNumOp(): ?string
    {
        return $this->numOp;
    }

    public function setNumOp(?string $numOp): self
    {
        $this->numOp = $numOp;

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

    public function getLigneBudgetaire(): ?Previsionbudget
    {
        return $this->ligneBudgetaire;
    }

    public function setLigneBudgetaire(?Previsionbudget $ligneBudgetaire): self
    {
        $this->ligneBudgetaire = $ligneBudgetaire;

        return $this;
    }



   
    public function getDetaildepenses() : ?float
    {
        $totalDepense=0;
        foreach($this->detaildepenses as $detaildepense)
        $totalDepense += $detaildepense->getMontantdetail();
        return $totalDepense;
    }

    public function getSoldeDepense(): ? float
    {
        return $this->getMontantdepense()- $this->getDetaildepenses();
    }

    public function getAutoriserChefService(): ?bool
    {
        return $this->autoriserChefService;
    }

    public function setAutoriserChefService(?bool $autoriserChefService): self
    {
        $this->autoriserChefService = $autoriserChefService;

        return $this;
    }

    public function getAutoriserSG(): ?bool
    {
        return $this->autoriserSG;
    }

    public function setAutoriserSG(?bool $autoriserSG): self
    {
        $this->autoriserSG = $autoriserSG;

        return $this;
    }

    public function getAutoriserAB(): ?bool
    {
        return $this->autoriserAB;
    }

    public function setAutoriserAB(?bool $autoriserAB): self
    {
        $this->autoriserAB = $autoriserAB;

        return $this;
    }

    public function getAutoriserRecteur(): ?bool
    {
        return $this->autoriserRecteur;
    }

    public function setAutoriserRecteur(?bool $autoriserRecteur): self
    {
        $this->autoriserRecteur = $autoriserRecteur;

        return $this;
    }





   
}
