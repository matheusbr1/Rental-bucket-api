import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTrucks1650825959710 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'trucks',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true
                    },
                    {
                        name: 'brand_id',
                        type: 'varchar'
                    },
                    {
                        name: 'model_id',
                        type: 'varchar'
                    },
                    {
                        name: 'plate',
                        type: 'varchar',
                    },
                    {
                        name: 'renavam',
                        type: 'varchar'
                    },
                    {
                        name: 'manufacture_year',
                        type: 'numeric'
                    },
                    {
                        name: 'model_year',
                        type: 'numeric'
                    },
                    {
                        name: 'truck_type_id',
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
                        name: 'FKTruckTypesTruck', // Nome da chave estrangeira
                        referencedTableName: 'truck_types', // Tabela origem
                        referencedColumnNames: ['id'], // Nome do campo na tabela origem
                        columnNames: ['truck_type_id'], // Nome do campo na tabela destino
                        onDelete: 'SET NULL', // Se a categoria (tabela origem) for removida o campo ficará nulo
                        onUpdate: 'SET NULL',
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('trucks')
    }
}
