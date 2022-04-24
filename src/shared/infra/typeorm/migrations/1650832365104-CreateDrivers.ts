import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateDrivers1650832365104 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'drivers',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    }, 
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'CPF',
                        type: 'numeric',
                    },
                    {
                        name: 'RG',
                        type: 'varchar'
                    },
                    {
                        name: 'CNH',
                        type: 'numeric'
                    },
                    {
                        name: 'birthday',
                        type: 'timestamp'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('drivers')
    }
}
