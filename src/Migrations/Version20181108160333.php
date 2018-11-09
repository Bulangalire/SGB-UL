<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181108160333 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE recette_personne');
        $this->addSql('ALTER TABLE recette ADD utilisateur_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE recette ADD CONSTRAINT FK_49BB6390FB88E14F FOREIGN KEY (utilisateur_id) REFERENCES personne (id)');
        $this->addSql('CREATE INDEX IDX_49BB6390FB88E14F ON recette (utilisateur_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE recette_personne (recette_id INT NOT NULL, personne_id INT NOT NULL, INDEX IDX_BFDA291789312FE9 (recette_id), INDEX IDX_BFDA2917A21BD112 (personne_id), PRIMARY KEY(recette_id, personne_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE recette_personne ADD CONSTRAINT FK_BFDA291789312FE9 FOREIGN KEY (recette_id) REFERENCES recette (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE recette_personne ADD CONSTRAINT FK_BFDA2917A21BD112 FOREIGN KEY (personne_id) REFERENCES personne (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE recette DROP FOREIGN KEY FK_49BB6390FB88E14F');
        $this->addSql('DROP INDEX IDX_49BB6390FB88E14F ON recette');
        $this->addSql('ALTER TABLE recette DROP utilisateur_id');
    }
}
