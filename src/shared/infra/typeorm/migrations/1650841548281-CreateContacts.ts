import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateContacts1650841548281 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'contacts',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'contact',
                        type: 'varchar'
                    },
                    {
                        name: 'contact_type',
                        type: 'varchar'
                    },
                    {
                        name: 'driver_id',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'customer_id',
                        type: 'uuid',
                        isNullable: true
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKDriverContact', // Nome da chave estrangeira
                        referencedTableName: 'drivers', // Tabela origem
                        referencedColumnNames: ['id'], // Nome do campo na tabela origem
                        columnNames: ['driver_id'], // Nome do campo na tabela destino
                        onDelete: 'CASCADE', // Se a categoria (tabela origem) for removida o campo ficará nulo
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKCustomerContact', // Nome da chave estrangeira
                        referencedTableName: 'customers', // Tabela origem
                        referencedColumnNames: ['id'], // Nome do campo na tabela origem
                        columnNames: ['customer_id'], // Nome do campo na tabela destino
                        onDelete: 'CASCADE', // Se a categoria (tabela origem) for removida o campo ficará nulo
                        onUpdate: 'CASCADE',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('contacts')
    }
}
