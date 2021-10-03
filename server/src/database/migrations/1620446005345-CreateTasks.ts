import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTasks1620446005345 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'tasks',
                columns: [
                    { name: 'id', type: 'uuid', isPrimary: true },
                    { name: 'description', type: 'varchar' },
                    { name: 'name', type: 'varchar' },
                    { name: 'email', type: 'varchar' },
                    { name: 'done', type: 'boolean', default: false },
                    { name: 'alter_done', type: 'int', default: 0 },
                    { name: 'created_at', type: 'timestamp', default: 'now()' },
                    { name: 'updated_at', type: 'timestamp', default: 'now() '}
                ]
            }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tasks');
    }

}


