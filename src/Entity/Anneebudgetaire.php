<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\AnneebudgetaireRepository")
 */
class Anneebudgetaire
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
    private $anneebudget;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Previsionbudget", mappedBy="anneebudgetprevision")
     */
    private $lesprevisions;

    public function __construct()
    {
        $this->lesprevisions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAnneebudget(): ?string
    {
        return $this->anneebudget;
    }

    public function setAnneebudget(string $anneebudget): self
    {
        $this->anneebudget = $anneebudget;

        return $this;
    }

    /**
     * @return Collection|Previsionbudget[]
     */
    public function getLesprevisions(): Collection
    {
        return $this->lesprevisions;
    }

    public function addLesprevision(Previsionbudget $lesprevision): self
    {
        if (!$this->lesprevisions->contains($lesprevision)) {
            $this->lesprevisions[] = $lesprevision;
            $lesprevision->setAnneebudgetprevision($this);
        }

        return $this;
    }

    public function removeLesprevision(Previsionbudget $lesprevision): self
    {
        if ($this->lesprevisions->contains($lesprevision)) {
            $this->lesprevisions->removeElement($lesprevision);
            // set the owning side to null (unless already changed)
            if ($lesprevision->getAnneebudgetprevision() === $this) {
                $lesprevision->setAnneebudgetprevision(null);
            }
        }

        return $this;
    }
}
