<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\UserroleRepository")
 */
class Userrole
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Personne")
     * @ORM\JoinColumn(nullable=false)
     */
    private $utilisateur;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SGBRole")
     * @ORM\JoinColumn(nullable=false)
     */
    private $role;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUtilisateur(): ?Personne
    {
        return $this->utilisateur;
    }

    public function setUtilisateur(?Personne $utilisateur): self
    {
        $this->utilisateur = $utilisateur;

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
