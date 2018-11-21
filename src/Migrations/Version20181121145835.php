<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181121145835 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE etatbesoin (id INT AUTO_INCREMENT NOT NULL, depense_id INT NOT NULL, designation VARCHAR(255) NOT NULL, quantite DOUBLE PRECISION NOT NULL, prixunitaire DOUBLE PRECISION NOT NULL, prixtotal DOUBLE PRECISION NOT NULL, INDEX IDX_4DB7283441D81563 (depense_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE etatbesoin ADD CONSTRAINT FK_4DB7283441D81563 FOREIGN KEY (depense_id) REFERENCES depense (id)');
        $this->addSql('ALTER TABLE depense ADD service_id INT NOT NULL');
        $this->addSql('ALTER TABLE depense ADD CONSTRAINT FK_34059757ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id)');
        $this->addSql('CREATE INDEX IDX_34059757ED5CA9E6 ON depense (service_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE etatbesoin');
        $this->addSql('ALTER TABLE depense DROP FOREIGN KEY FK_34059757ED5CA9E6');
        $this->addSql('DROP INDEX IDX_34059757ED5CA9E6 ON depense');
        $this->addSql('ALTER TABLE depense DROP service_id');
    }
}
