<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ConfigSgbRepository")
 */
class ConfigSgb
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="boolean", nullable=true)
     */
    private $isCentraleCaisse;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIsCentraleCaisse(): ?bool
    {
        return $this->isCentraleCaisse;
    }

    public function setIsCentraleCaisse(?bool $isCentraleCaisse): self
    {
        $this->isCentraleCaisse = $isCentraleCaisse;

        return $this;
    }
}
