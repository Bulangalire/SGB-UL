<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190219074601 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE detaildepense ADD caisse_centrale_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE detaildepense ADD CONSTRAINT FK_DFFC694F951529E3 FOREIGN KEY (caisse_centrale_id) REFERENCES compte_journaux (id)');
        $this->addSql('CREATE INDEX IDX_DFFC694F951529E3 ON detaildepense (caisse_centrale_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE detaildepense DROP FOREIGN KEY FK_DFFC694F951529E3');
        $this->addSql('DROP INDEX IDX_DFFC694F951529E3 ON detaildepense');
        $this->addSql('ALTER TABLE detaildepense DROP caisse_centrale_id');
    }
}
