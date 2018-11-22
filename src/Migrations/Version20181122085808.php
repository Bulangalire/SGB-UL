<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181122085808 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE depense DROP FOREIGN KEY FK_34059757ED5CA9E6');
        $this->addSql('DROP INDEX IDX_34059757ED5CA9E6 ON depense');
        $this->addSql('ALTER TABLE depense ADD beneficiaire VARCHAR(255) DEFAULT NULL, ADD chef_departement VARCHAR(255) DEFAULT NULL, ADD sec_general_concerne VARCHAR(255) DEFAULT NULL, ADD ab_ou_delegue VARCHAR(255) DEFAULT NULL, ADD recteur_ou_delegue VARCHAR(255) DEFAULT NULL, ADD date_emission DATETIME NOT NULL, ADD visa_compotable VARCHAR(255) DEFAULT NULL, DROP service_id');
        $this->addSql('ALTER TABLE detaildepense DROP FOREIGN KEY FK_DFFC694F936D0CFA');
        $this->addSql('DROP INDEX IDX_DFFC694F936D0CFA ON detaildepense');
        $this->addSql('ALTER TABLE detaildepense DROP depense_id_id');
        $this->addSql('ALTER TABLE detaildepense ADD depense_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE detaildepense ADD CONSTRAINT FK_DFFC694F936D0CFA FOREIGN KEY (depense_id_id) REFERENCES depense (id)');
        $this->addSql('CREATE INDEX IDX_DFFC694F936D0CFA ON detaildepense (depense_id_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE detaildepense ADD depense_id_id INT NOT NULL');
        $this->addSql('ALTER TABLE detaildepense ADD CONSTRAINT FK_DFFC694F936D0CFA FOREIGN KEY (depense_id_id) REFERENCES depense (id)');
        $this->addSql('CREATE INDEX IDX_DFFC694F936D0CFA ON detaildepense (depense_id_id)');
    }
}
