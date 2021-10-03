import { MigrationInterface, QueryRunner, Table } from "typeorm";

import { v4 as uuid } from 'uuid';

export const SettingsSeed = [
    { id: uuid() },
    { enable_password: true },
    { password: process.env.PASSWORD_ENABLE_TO_PENDING_TASK },
    { created_at: `${new Date()}` },
];

export class CreateSettings1620655460064 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'settings',
            columns: [
                { name: 'id', type: 'uuid', isPrimary: true },
                { name: 'enable_password', type: 'boolean', default: true },
                { name: 'password', type: 'varchar' },
                { name: 'created_at', type: 'timestamp', default: 'now()' },
                { name: 'updated_at', type: 'timestamp', default: 'now() '}
            ]
        }));

        await queryRunner.query(
            `INSERT INTO SETTINGS (id, password) VALUES ('${uuid()}', '${process.env.PASSWORD_ENABLE_TO_PENDING_TASK}')`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('settings');
    }

}
