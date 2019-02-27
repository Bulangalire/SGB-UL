<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190218174834 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE compte_journaux (id INT AUTO_INCREMENT NOT NULL, code VARCHAR(255) NOT NULL, intitule VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE recette ADD code_journaux_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE recette ADD CONSTRAINT FK_49BB6390FA88C9C3 FOREIGN KEY (code_journaux_id) REFERENCES compte_journaux (id)');
        $this->addSql('CREATE INDEX IDX_49BB6390FA88C9C3 ON recette (code_journaux_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE recette DROP FOREIGN KEY FK_49BB6390FA88C9C3');
        $this->addSql('DROP TABLE compte_journaux');
        $this->addSql('DROP INDEX IDX_49BB6390FA88C9C3 ON recette');
        $this->addSql('ALTER TABLE recette DROP code_journaux_id');
    }
}
