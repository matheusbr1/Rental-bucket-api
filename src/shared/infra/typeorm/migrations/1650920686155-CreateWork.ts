import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateWork1650920686155 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'works',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'start_date',
                        type: 'timestamp',
                        default: 'now()'
                    },
                    {
                        name: 'end_date',
                        type: 'timestamp'
                    },
                    {
                        name: 'is_done',
                        type: 'boolean',
                        default: 'false',
                    },
                    {
                        name: 'quantity',
                        type: 'numeric'
                    },
                    {
                        name: 'customer_id',
                        type: 'uuid'
                    },
                    {
                        name: 'address_id',
                        type: 'uuid'
                    }, 
                    {
                        name: 'truck_id',
                        type: 'uuid'
                    },
                    {
                        name: 'driver_id',
                        type: 'uuid'
                    },
                    {
                        name: 'work_type_id',
                        type: 'uuid'
                    },
                    {
                        name: 'equipment_id',
                        type: 'uuid'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                        name: 'FKCustomerWork', // Nome da chave estrangeira
                        referencedTableName: 'customers', // Tabela origem
                        referencedColumnNames: ['id'], // Nome do campo na tabela origem
                        columnNames: ['customer_id'], // Nome do campo na tabela destino
                        onDelete: 'SET NULL', // Se a categoria (tabela origem) for removida o campo ficará nulo
                        onUpdate: 'SET NULL',
                    },
                    {
                        name: 'FKAddressWork', // Nome da chave estrangeira
                        referencedTableName: 'adresses', // Tabela origem
                        referencedColumnNames: ['id'], // Nome do campo na tabela origem
                        columnNames: ['address_id'], // Nome do campo na tabela destino
                        onDelete: 'SET NULL', // Se a categoria (tabela origem) for removida o campo ficará nulo
                        onUpdate: 'SET NULL',
                    },
                    {
                        name: 'FKTrucksWork', // Nome da chave estrangeira
                        referencedTableName: 'trucks', // Tabela origem
                        referencedColumnNames: ['id'], // Nome do campo na tabela origem
                        columnNames: ['truck_id'], // Nome do campo na tabela destino
                        onDelete: 'SET NULL', // Se a categoria (tabela origem) for removida o campo ficará nulo
                        onUpdate: 'SET NULL',
                    },
                    {
                        name: 'FKDriversWork', // Nome da chave estrangeira
                        referencedTableName: 'drivers', // Tabela origem
                        referencedColumnNames: ['id'], // Nome do campo na tabela origem
                        columnNames: ['driver_id'], // Nome do campo na tabela destino
                        onDelete: 'SET NULL', // Se a categoria (tabela origem) for removida o campo ficará nulo
                        onUpdate: 'SET NULL',
                    },
                    {
                        name: 'FKWorkTypeWork', // Nome da chave estrangeira
                        referencedTableName: 'work_types', // Tabela origem
                        referencedColumnNames: ['id'], // Nome do campo na tabela origem
                        columnNames: ['work_type_id'], // Nome do campo na tabela destino
                        onDelete: 'SET NULL', // Se a categoria (tabela origem) for removida o campo ficará nulo
                        onUpdate: 'SET NULL',
                    },
                    {
                        name: 'FKTruckTypeEquipmentsWork', // Nome da chave estrangeira
                        referencedTableName: 'truck_type_equipments', // Tabela origem
                        referencedColumnNames: ['id'], // Nome do campo na tabela origem
                        columnNames: ['equipment_id'], // Nome do campo na tabela destino
                        onDelete: 'SET NULL', // Se a categoria (tabela origem) for removida o campo ficará nulo
                        onUpdate: 'SET NULL',
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('works')
    }
}
