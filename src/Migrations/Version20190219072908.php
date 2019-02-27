<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190219072908 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE caisse_centrale (id INT AUTO_INCREMENT NOT NULL, depense_id INT DEFAULT NULL, recette_id INT DEFAULT NULL, date_entree DATETIME DEFAULT NULL, date_sortie DATETIME DEFAULT NULL, montant_sortie DOUBLE PRECISION DEFAULT NULL, montant_entre DOUBLE PRECISION DEFAULT NULL, UNIQUE INDEX UNIQ_77E020B241D81563 (depense_id), UNIQUE INDEX UNIQ_77E020B289312FE9 (recette_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE caisse_centrale ADD CONSTRAINT FK_77E020B241D81563 FOREIGN KEY (depense_id) REFERENCES detaildepense (id)');
        $this->addSql('ALTER TABLE caisse_centrale ADD CONSTRAINT FK_77E020B289312FE9 FOREIGN KEY (recette_id) REFERENCES recette (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE caisse_centrale');
    }
}
