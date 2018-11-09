<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181109094909 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE sgbfunction (id INT AUTO_INCREMENT NOT NULL, nomfonction VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sgbrole (id INT AUTO_INCREMENT NOT NULL, nomrole VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sgbroledelafonction (id INT AUTO_INCREMENT NOT NULL, fonction_id INT NOT NULL, role_id INT NOT NULL, INDEX IDX_BD1E9A8057889920 (fonction_id), INDEX IDX_BD1E9A80D60322AC (role_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE userrole (id INT AUTO_INCREMENT NOT NULL, utilisateur_id INT NOT NULL, role_id INT NOT NULL, INDEX IDX_F114F21BFB88E14F (utilisateur_id), INDEX IDX_F114F21BD60322AC (role_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE sgbroledelafonction ADD CONSTRAINT FK_BD1E9A8057889920 FOREIGN KEY (fonction_id) REFERENCES sgbfunction (id)');
        $this->addSql('ALTER TABLE sgbroledelafonction ADD CONSTRAINT FK_BD1E9A80D60322AC FOREIGN KEY (role_id) REFERENCES sgbrole (id)');
        $this->addSql('ALTER TABLE userrole ADD CONSTRAINT FK_F114F21BFB88E14F FOREIGN KEY (utilisateur_id) REFERENCES personne (id)');
        $this->addSql('ALTER TABLE userrole ADD CONSTRAINT FK_F114F21BD60322AC FOREIGN KEY (role_id) REFERENCES sgbrole (id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE sgbroledelafonction DROP FOREIGN KEY FK_BD1E9A8057889920');
        $this->addSql('ALTER TABLE sgbroledelafonction DROP FOREIGN KEY FK_BD1E9A80D60322AC');
        $this->addSql('ALTER TABLE userrole DROP FOREIGN KEY FK_F114F21BD60322AC');
        $this->addSql('DROP TABLE sgbfunction');
        $this->addSql('DROP TABLE sgbrole');
        $this->addSql('DROP TABLE sgbroledelafonction');
        $this->addSql('DROP TABLE userrole');
    }
}
