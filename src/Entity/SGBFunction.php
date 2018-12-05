<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SGBFunctionRepository")
 */
class SGBFunction
{
    public const SERVICE = "Service";
    public const PERSONNE = "Personne";
    public const PREVESION = "Prévision";
    public const LIGNEBUDGETAIRE = "Ligne Budgétaire";
    public const RECETTE = "Recette";
    public const DEPENSES = "Dépenses";
    public const PLAN = "Plan";
    public const OP = "OP";
    public const DECAISSER = "Décaisser";
    public const RAPPORT = "Rapports";
    public const CONFIGURATION = "Configuration";
    public const DECONNEXION = "Deconnexion";
    public const CONNEXION ="Connexion";
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
