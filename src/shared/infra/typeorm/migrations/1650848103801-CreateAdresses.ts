import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAdresses1650848103801 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'adresses',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    }, 
                    {
                        name: 'CEP',
                        type: 'varchar'
                    },
                    {
                        name: 'street',
                        type: 'varchar'
                    },
                    {
                        name: 'number',
                        type: 'numeric'
                    },
                    {
                        name: 'neighborhood',
                        type: 'varchar'
                    },
                    {
                        name: 'state',
                        type: 'varchar',
                        length: '2'
                    },
                    {
                        name: 'city',
                        type: 'varchar'
                    },
                    {
                        name: 'complement',
                        type: 'varchar',
                        isNullable: true
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
                        name: 'FKDriverAddress', // Nome da chave estrangeira
                        referencedTableName: 'drivers', // Tabela origem
                        referencedColumnNames: ['id'], // Nome do campo na tabela origem
                        columnNames: ['driver_id'], // Nome do campo na tabela destino
                        onDelete: 'CASCADE', // Se a categoria (tabela origem) for removida o campo ficará nulo
                        onUpdate: 'CASCADE',
                    },
                    {
                        name: 'FKCustomerAddress', // Nome da chave estrangeira
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
        await queryRunner.dropTable('adresses')
    }
}
