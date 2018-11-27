<?php

namespace App\Entity;

use Serializable;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PersonneRepository")
 * @UniqueEntity(
 * fields={"username"},
 * message="Ce login est déjà Utiliser !"
 * )
 */
class Personne implements UserInterface, \Serializable
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
    private $nom;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $postnom;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $prenom;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Assert\Length(min=8, minMessage="Votre mot de passe doit etre de minimum 8 Caracteres.")
     */
    private $password;
  
    /**
     * @Assert\EqualTo(propertyPath="password", message="Veuillez saisir le même mot de passe.")
     */
    private $passwordconfirm;
   
    /**
     * @ORM\Column(type="blob", nullable=true)
     */
    private $signature;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Service", inversedBy="personnes")
     */
    private $services;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $username;

    /**
     * @var array
     *
     * @ORM\Column(type="json")
     */
    private $roles = [];

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNom(): ?string
    {
        return $this->nom;
    }

    public function setNom(string $nom): self
    {
        $this->nom = $nom;

        return $this;
    }

    public function getPostnom(): ?string
    {
        return $this->postnom;
    }

    public function setPostnom(string $postnom): self
    {
        $this->postnom = $postnom;

        return $this;
    }

    public function getPrenom(): ?string
    {
        return $this->prenom;
    }

    public function setPrenom(?string $prenom): self
    {
        $this->prenom = $prenom;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(?string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getPasswordconfirm(): ?string
    {
        return $this->passwordconfirm;
    }

    public function setPasswordconfirm(?string $passwordconfirm): self
    {
        $this->passwordconfirm = $passwordconfirm;

        return $this;
    }
   

    public function getSignature()
    {
        return $this->signature;
    }

    public function setSignature($signature): self
    {
        $this->signature = $signature;

        return $this;
    }

    public function getServices(): ?Service
    {
        return $this->services;
    }

    public function setServices(?Service $services): self
    {
        $this->services = $services;

        return $this;
    }

    /**
     * Retourne les rôles de l'user
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
 
        // Afin d'être sûr qu'un user a toujours au moins 1 rôle
        if (empty($roles)) {
            $roles[] = 'ROLE_USER';
        }
 
        return array_unique($roles);
    }
    public function setRoles(array $roles): void
    {
        $this->roles = $roles;
    }
 /*
    public function setRoles($role)
    {
        if(array_diff($role, array("ROLE_SUPER_ADMIN", "ROLE_ADMIN", "ROLE_USER", "ROLE_CAISSE", "ROLE_COMPTABILITE", "ROLE_RECTORAT", "ROLE_COMPTEFAC", "ROLE_DOYEN"))) {
            throw new \InvalidArgumentException("Bad role");
        }
        $this->roles = $role;

        return $this;
    }
    
    public function getRoles(){
        return $this->roles;
    }
*/
   
    public function eraseCredentials(){}
    public function getSalt(){}
    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(?string $username): self
    {
        $this->username = $username;

        return $this;
    }


    /**
     * {@inheritdoc}
     */
    public function serialize(): string
    {
        return serialize([$this->id, $this->username, $this->password]);
    }
 
    /**
     * {@inheritdoc}
     */
    public function unserialize($serialized): void
    {
        [$this->id, $this->username, $this->password] = unserialize($serialized, ['allowed_classes' => false]);
    }
}
