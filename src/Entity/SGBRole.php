<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SGBRoleRepository")
 */
class SGBRole
{


    public const ROLE_ADMIN = "ROLE_ADMIN";
    public const ROLE_RECTOR = "ROLE_RECTOR";
    public const ROLE_SG = "ROLE_SG";
    public const ROLE_AB = "ROLE_AB";
    public const ROLE_COMPTABILITE = "ROLE_COMPTABILITE";
    public const ROLE_CAISSE = "ROLE_CAISSE";
    public const ROLE_CHEF_SERVICE = "ROLE_CHEF_SERVICE";
    public const ROLE_COMPTE_FAC = "ROLE_COMPTE_FAC";
    
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nomrole;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SGBFunctionsRole", mappedBy="role")
     */
    private $sGBFunctionsRoles;

    public function __construct()
    {
        $this->sGBFunctionsRoles = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomrole(): ?string
    {
        return $this->nomrole;
    }

    public function setNomrole(string $nomrole): self
    {
        $this->nomrole = $nomrole;

        return $this;
    }

    /**
     * @return Collection|SGBFunctionsRole[]
     */
    public function getSGBFunctionsRoles(): Collection
    {
        return $this->sGBFunctionsRoles;
    }

    public function addSGBFunctionsRole(SGBFunctionsRole $sGBFunctionsRole): self
    {
        if (!$this->sGBFunctionsRoles->contains($sGBFunctionsRole)) {
            $this->sGBFunctionsRoles[] = $sGBFunctionsRole;
            $sGBFunctionsRole->addRole($this);
        }

        return $this;
    }

    public function removeSGBFunctionsRole(SGBFunctionsRole $sGBFunctionsRole): self
    {
        if ($this->sGBFunctionsRoles->contains($sGBFunctionsRole)) {
            $this->sGBFunctionsRoles->removeElement($sGBFunctionsRole);
            $sGBFunctionsRole->removeRole($this);
        }

        return $this;
    }
}
