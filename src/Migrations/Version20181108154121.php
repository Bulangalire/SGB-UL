<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181108154121 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE anneebudgetaire (id INT AUTO_INCREMENT NOT NULL, anneebudget VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE depense (id INT AUTO_INCREMENT NOT NULL, utilisateurdepense_id INT NOT NULL, libele VARCHAR(255) NOT NULL, montantdepense DOUBLE PRECISION NOT NULL, create_at DATETIME NOT NULL, INDEX IDX_340597576CEA4152 (utilisateurdepense_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE detaildepense (id INT AUTO_INCREMENT NOT NULL, lignebudgetdepense_id INT NOT NULL, lignebudgetsource_id INT NOT NULL, montantdetail DOUBLE PRECISION NOT NULL, modepayement VARCHAR(255) NOT NULL, descriptiondetaildepense VARCHAR(255) DEFAULT NULL, INDEX IDX_DFFC694FAB129A21 (lignebudgetdepense_id), INDEX IDX_DFFC694F8AF467E5 (lignebudgetsource_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE previsionbudget (id INT AUTO_INCREMENT NOT NULL, anneebudgetprevision_id INT NOT NULL, service_id INT NOT NULL, lignebudgetprevision_id INT NOT NULL, montantprevision DOUBLE PRECISION NOT NULL, iscentraliser TINYINT(1) DEFAULT NULL, INDEX IDX_D4709154E0BFF4B5 (anneebudgetprevision_id), INDEX IDX_D4709154ED5CA9E6 (service_id), INDEX IDX_D470915496AAD304 (lignebudgetprevision_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE recette (id INT AUTO_INCREMENT NOT NULL, libelle VARCHAR(255) DEFAULT NULL, montantrecette DOUBLE PRECISION NOT NULL, create_at DATETIME NOT NULL, description VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE recette_previsionbudget (recette_id INT NOT NULL, previsionbudget_id INT NOT NULL, INDEX IDX_1DB781B089312FE9 (recette_id), INDEX IDX_1DB781B035AB89EF (previsionbudget_id), PRIMARY KEY(recette_id, previsionbudget_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE recette_personne (recette_id INT NOT NULL, personne_id INT NOT NULL, INDEX IDX_BFDA291789312FE9 (recette_id), INDEX IDX_BFDA2917A21BD112 (personne_id), PRIMARY KEY(recette_id, personne_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE depense ADD CONSTRAINT FK_340597576CEA4152 FOREIGN KEY (utilisateurdepense_id) REFERENCES personne (id)');
        $this->addSql('ALTER TABLE detaildepense ADD CONSTRAINT FK_DFFC694FAB129A21 FOREIGN KEY (lignebudgetdepense_id) REFERENCES previsionbudget (id)');
        $this->addSql('ALTER TABLE detaildepense ADD CONSTRAINT FK_DFFC694F8AF467E5 FOREIGN KEY (lignebudgetsource_id) REFERENCES previsionbudget (id)');
        $this->addSql('ALTER TABLE previsionbudget ADD CONSTRAINT FK_D4709154E0BFF4B5 FOREIGN KEY (anneebudgetprevision_id) REFERENCES anneebudgetaire (id)');
        $this->addSql('ALTER TABLE previsionbudget ADD CONSTRAINT FK_D4709154ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id)');
        $this->addSql('ALTER TABLE previsionbudget ADD CONSTRAINT FK_D470915496AAD304 FOREIGN KEY (lignebudgetprevision_id) REFERENCES ligne_budgetaire (id)');
        $this->addSql('ALTER TABLE recette_previsionbudget ADD CONSTRAINT FK_1DB781B089312FE9 FOREIGN KEY (recette_id) REFERENCES recette (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE recette_previsionbudget ADD CONSTRAINT FK_1DB781B035AB89EF FOREIGN KEY (previsionbudget_id) REFERENCES previsionbudget (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE recette_personne ADD CONSTRAINT FK_BFDA291789312FE9 FOREIGN KEY (recette_id) REFERENCES recette (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE recette_personne ADD CONSTRAINT FK_BFDA2917A21BD112 FOREIGN KEY (personne_id) REFERENCES personne (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE previsionbudget DROP FOREIGN KEY FK_D4709154E0BFF4B5');
        $this->addSql('ALTER TABLE detaildepense DROP FOREIGN KEY FK_DFFC694FAB129A21');
        $this->addSql('ALTER TABLE detaildepense DROP FOREIGN KEY FK_DFFC694F8AF467E5');
        $this->addSql('ALTER TABLE recette_previsionbudget DROP FOREIGN KEY FK_1DB781B035AB89EF');
        $this->addSql('ALTER TABLE recette_previsionbudget DROP FOREIGN KEY FK_1DB781B089312FE9');
        $this->addSql('ALTER TABLE recette_personne DROP FOREIGN KEY FK_BFDA291789312FE9');
        $this->addSql('DROP TABLE anneebudgetaire');
        $this->addSql('DROP TABLE depense');
        $this->addSql('DROP TABLE detaildepense');
        $this->addSql('DROP TABLE previsionbudget');
        $this->addSql('DROP TABLE recette');
        $this->addSql('DROP TABLE recette_previsionbudget');
        $this->addSql('DROP TABLE recette_personne');
    }
}
