<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SGBFunctionRepository")
 */
class SGBFunction
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
    private $Nomfonction;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomfonction(): ?string
    {
        return $this->Nomfonction;
    }

    public function setNomfonction(string $Nomfonction): self
    {
        $this->Nomfonction = $Nomfonction;

        return $this;
    }
}
