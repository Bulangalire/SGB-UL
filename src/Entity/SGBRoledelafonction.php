<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SGBRoledelafonctionRepository")
 */
class SGBRoledelafonction
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SGBFunction")
     * @ORM\JoinColumn(nullable=false)
     */
    private $fonction;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SGBRole")
     * @ORM\JoinColumn(nullable=false)
     */
    private $role;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFonction(): ?SGBFunction
    {
        return $this->fonction;
    }

    public function setFonction(?SGBFunction $fonction): self
    {
        $this->fonction = $fonction;

        return $this;
    }

    public function getRole(): ?SGBRole
    {
        return $this->role;
    }

    public function setRole(?SGBRole $role): self
    {
        $this->role = $role;

        return $this;
    }
}
