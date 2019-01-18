<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190117130030 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE plantresorerie (id INT AUTO_INCREMENT NOT NULL, lignebudget_id INT NOT NULL, faculte_id INT NOT NULL, besoin DOUBLE PRECISION NOT NULL, realisation DOUBLE PRECISION DEFAULT NULL, observation VARCHAR(255) DEFAULT NULL, date_debut DATETIME NOT NULL, date_fin DATETIME NOT NULL, INDEX IDX_D26E6EB047F1F2EE (lignebudget_id), INDEX IDX_D26E6EB072C3434F (faculte_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE plantresorerie ADD CONSTRAINT FK_D26E6EB047F1F2EE FOREIGN KEY (lignebudget_id) REFERENCES previsionbudget (id)');
        $this->addSql('ALTER TABLE plantresorerie ADD CONSTRAINT FK_D26E6EB072C3434F FOREIGN KEY (faculte_id) REFERENCES service (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE plantresorerie');
    }
}
