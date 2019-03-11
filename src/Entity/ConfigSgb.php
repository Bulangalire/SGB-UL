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

    /**
     * @ORM\Column(type="boolean")
     */
    private $isReadonly;

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

    public function getIsReadonly(): ?bool
    {
        return $this->isReadonly;
    }

    public function setIsReadonly(bool $isReadonly): self
    {
        $this->isReadonly = $isReadonly;

        return $this;
    }
}
