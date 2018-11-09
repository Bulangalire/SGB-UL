<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181108154955 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE detaildepense ADD depense_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE detaildepense ADD CONSTRAINT FK_DFFC694F936D0CFA FOREIGN KEY (depense_id_id) REFERENCES depense (id)');
        $this->addSql('CREATE INDEX IDX_DFFC694F936D0CFA ON detaildepense (depense_id_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE detaildepense DROP FOREIGN KEY FK_DFFC694F936D0CFA');
        $this->addSql('DROP INDEX IDX_DFFC694F936D0CFA ON detaildepense');
        $this->addSql('ALTER TABLE detaildepense DROP depense_id_id');
    }
}
