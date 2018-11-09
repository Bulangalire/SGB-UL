<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181108160621 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE recette_previsionbudget');
        $this->addSql('ALTER TABLE recette ADD lignebudgetrecette_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE recette ADD CONSTRAINT FK_49BB639063FBA0AB FOREIGN KEY (lignebudgetrecette_id) REFERENCES previsionbudget (id)');
        $this->addSql('CREATE INDEX IDX_49BB639063FBA0AB ON recette (lignebudgetrecette_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE recette_previsionbudget (recette_id INT NOT NULL, previsionbudget_id INT NOT NULL, INDEX IDX_1DB781B089312FE9 (recette_id), INDEX IDX_1DB781B035AB89EF (previsionbudget_id), PRIMARY KEY(recette_id, previsionbudget_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE recette_previsionbudget ADD CONSTRAINT FK_1DB781B035AB89EF FOREIGN KEY (previsionbudget_id) REFERENCES previsionbudget (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE recette_previsionbudget ADD CONSTRAINT FK_1DB781B089312FE9 FOREIGN KEY (recette_id) REFERENCES recette (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE recette DROP FOREIGN KEY FK_49BB639063FBA0AB');
        $this->addSql('DROP INDEX IDX_49BB639063FBA0AB ON recette');
        $this->addSql('ALTER TABLE recette DROP lignebudgetrecette_id');
    }
}
