<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SGBRoleRepository")
 */
class SGBRole
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
    private $nomrole;

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
}
