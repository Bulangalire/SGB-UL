<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181123121310 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE depense ADD service_id INT DEFAULT NULL, ADD ligne_budgetaire_id INT DEFAULT NULL, DROP service, DROP ligne_budgetaire');
        $this->addSql('ALTER TABLE depense ADD CONSTRAINT FK_34059757ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id)');
        $this->addSql('ALTER TABLE depense ADD CONSTRAINT FK_340597572F59CE5F FOREIGN KEY (ligne_budgetaire_id) REFERENCES previsionbudget (id)');
        $this->addSql('CREATE INDEX IDX_34059757ED5CA9E6 ON depense (service_id)');
        $this->addSql('CREATE INDEX IDX_340597572F59CE5F ON depense (ligne_budgetaire_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE depense DROP FOREIGN KEY FK_34059757ED5CA9E6');
        $this->addSql('ALTER TABLE depense DROP FOREIGN KEY FK_340597572F59CE5F');
        $this->addSql('DROP INDEX IDX_34059757ED5CA9E6 ON depense');
        $this->addSql('DROP INDEX IDX_340597572F59CE5F ON depense');
        $this->addSql('ALTER TABLE depense ADD service INT NOT NULL, ADD ligne_budgetaire INT NOT NULL, DROP service_id, DROP ligne_budgetaire_id');
    }
}
