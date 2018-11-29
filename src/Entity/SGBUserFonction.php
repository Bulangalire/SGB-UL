<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SGBUserFonctionRepository")
 */
class SGBUserFonction
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

}
