<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190125081808 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE plantresorerie DROP FOREIGN KEY FK_D26E6EB072C3434F');
        $this->addSql('DROP INDEX IDX_D26E6EB072C3434F ON plantresorerie');
        $this->addSql('ALTER TABLE plantresorerie DROP faculte_id, CHANGE valider valider TINYINT(1) DEFAULT NULL');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE plantresorerie ADD faculte_id INT NOT NULL, CHANGE valider valider TINYINT(1) NOT NULL');
        $this->addSql('ALTER TABLE plantresorerie ADD CONSTRAINT FK_D26E6EB072C3434F FOREIGN KEY (faculte_id) REFERENCES service (id)');
        $this->addSql('CREATE INDEX IDX_D26E6EB072C3434F ON plantresorerie (faculte_id)');
    }
}
