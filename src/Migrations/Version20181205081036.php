<?php declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20181205081036 extends AbstractMigration
{
    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE sgbfunctions_role ADD role_id INT DEFAULT NULL, ADD function_id INT DEFAULT NULL, ADD description VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE sgbfunctions_role ADD CONSTRAINT FK_97A8445CD60322AC FOREIGN KEY (role_id) REFERENCES sgbrole (id)');
        $this->addSql('ALTER TABLE sgbfunctions_role ADD CONSTRAINT FK_97A8445C67048801 FOREIGN KEY (function_id) REFERENCES sgbfunction (id)');
        $this->addSql('CREATE INDEX IDX_97A8445CD60322AC ON sgbfunctions_role (role_id)');
        $this->addSql('CREATE INDEX IDX_97A8445C67048801 ON sgbfunctions_role (function_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE sgbfunctions_role DROP FOREIGN KEY FK_97A8445CD60322AC');
        $this->addSql('ALTER TABLE sgbfunctions_role DROP FOREIGN KEY FK_97A8445C67048801');
        $this->addSql('DROP INDEX IDX_97A8445CD60322AC ON sgbfunctions_role');
        $this->addSql('DROP INDEX IDX_97A8445C67048801 ON sgbfunctions_role');
        $this->addSql('ALTER TABLE sgbfunctions_role DROP role_id, DROP function_id, DROP description');
    }
}
