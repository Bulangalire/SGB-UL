<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181205073832 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE sgbfunctions_role (id INT AUTO_INCREMENT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sgbfunctions_role_sgbrole (sgbfunctions_role_id INT NOT NULL, sgbrole_id INT NOT NULL, INDEX IDX_902E656C4FFFB3A8 (sgbfunctions_role_id), INDEX IDX_902E656C1F57E094 (sgbrole_id), PRIMARY KEY(sgbfunctions_role_id, sgbrole_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sgbfunctions_role_sgbfunction (sgbfunctions_role_id INT NOT NULL, sgbfunction_id INT NOT NULL, INDEX IDX_F74350AD4FFFB3A8 (sgbfunctions_role_id), INDEX IDX_F74350ADFCDFF825 (sgbfunction_id), PRIMARY KEY(sgbfunctions_role_id, sgbfunction_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE sgbfunctions_role_sgbrole ADD CONSTRAINT FK_902E656C4FFFB3A8 FOREIGN KEY (sgbfunctions_role_id) REFERENCES sgbfunctions_role (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE sgbfunctions_role_sgbrole ADD CONSTRAINT FK_902E656C1F57E094 FOREIGN KEY (sgbrole_id) REFERENCES sgbrole (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE sgbfunctions_role_sgbfunction ADD CONSTRAINT FK_F74350AD4FFFB3A8 FOREIGN KEY (sgbfunctions_role_id) REFERENCES sgbfunctions_role (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE sgbfunctions_role_sgbfunction ADD CONSTRAINT FK_F74350ADFCDFF825 FOREIGN KEY (sgbfunction_id) REFERENCES sgbfunction (id) ON DELETE CASCADE');
        $this->addSql('DROP TABLE sgbroledelafonction');
        $this->addSql('DROP TABLE userrole');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE sgbfunctions_role_sgbrole DROP FOREIGN KEY FK_902E656C4FFFB3A8');
        $this->addSql('ALTER TABLE sgbfunctions_role_sgbfunction DROP FOREIGN KEY FK_F74350AD4FFFB3A8');
        $this->addSql('CREATE TABLE sgbroledelafonction (id INT AUTO_INCREMENT NOT NULL, fonction_id INT NOT NULL, role_id INT NOT NULL, INDEX IDX_BD1E9A8057889920 (fonction_id), INDEX IDX_BD1E9A80D60322AC (role_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE userrole (id INT AUTO_INCREMENT NOT NULL, utilisateur_id INT NOT NULL, role_id INT NOT NULL, INDEX IDX_F114F21BFB88E14F (utilisateur_id), INDEX IDX_F114F21BD60322AC (role_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE sgbroledelafonction ADD CONSTRAINT FK_BD1E9A8057889920 FOREIGN KEY (fonction_id) REFERENCES sgbfunction (id)');
        $this->addSql('ALTER TABLE sgbroledelafonction ADD CONSTRAINT FK_BD1E9A80D60322AC FOREIGN KEY (role_id) REFERENCES sgbrole (id)');
        $this->addSql('ALTER TABLE userrole ADD CONSTRAINT FK_F114F21BD60322AC FOREIGN KEY (role_id) REFERENCES sgbrole (id)');
        $this->addSql('ALTER TABLE userrole ADD CONSTRAINT FK_F114F21BFB88E14F FOREIGN KEY (utilisateur_id) REFERENCES personne (id)');
        $this->addSql('DROP TABLE sgbfunctions_role');
        $this->addSql('DROP TABLE sgbfunctions_role_sgbrole');
        $this->addSql('DROP TABLE sgbfunctions_role_sgbfunction');
    }
}
