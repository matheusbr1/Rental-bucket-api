import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCustomers1650837084875 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'customers',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'person_type',
                        type: 'varchar',
                        length: '1',
                    },
                    {
                        name: 'CPF_CNPJ',
                        type: 'numeric',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'company_name', // Razão Social
                        type: 'varchar',
                        isNullable: true
                    },
                    {
                        name: 'fantasy_name', // Nome Fantasia
                        type: 'varchar',
                        isNullable: true
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
        await queryRunner.dropTable('customers')
    }
}
