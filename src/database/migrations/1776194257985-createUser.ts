import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1776194257985 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if the enum type exists before trying to create it
    await queryRunner.query(
      `DO $$ BEGIN
            IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'users_role_enum') THEN
                CREATE TYPE "users_role_enum" AS ENUM('user', 'barber', 'admin');
            END IF;
        END $$;`,
    );

    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'firstName',
            type: 'varchar',
          },
          {
            name: 'lastName',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'phoneNumber',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'dateOfBirth',
            type: 'varchar',
          },
          {
            name: 'url',
            type: 'varchar',
          },
          {
            name: 'role',
            type: 'enum',
            enumName: 'users_role_enum',
            default: "'user'",
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleteAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
    // Use IF EXISTS to prevent errors during rollback
    await queryRunner.query(`DROP TYPE IF EXISTS "users_role_enum"`);
  }
}
