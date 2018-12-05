<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SGBFunctionsRoleRepository")
 */
class SGBFunctionsRole
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SGBRole", inversedBy="sGBFunctionsRoles")
     */
    private $role;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SGBFunction")
     */
    private $function;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $description;

   
    public function getId(): ?int
    {
        return $this->id;
    }

   
    public function getRole(): ?int
    {
        return $this->role;
    }

    

    public function getFunction(): ?SGBFunction
    {
        return $this->function;
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
